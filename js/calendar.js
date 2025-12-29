// Calendar state
let birthDate = null;
let currentYearOfAge = 0;
let selectedDate = null;
let events = {};

// DOM elements
const birthDateInput = document.getElementById('birthDate');
const setBirthDateBtn = document.getElementById('setBirthDate');
const prevYearBtn = document.getElementById('prevYear');
const nextYearBtn = document.getElementById('nextYear');
const currentYearDisplay = document.getElementById('currentYear');
const calendarGrid = document.getElementById('calendarGrid');
const createEventBtn = document.getElementById('createEventBtn');
const eventModal = document.getElementById('eventModal');
const dayModal = document.getElementById('dayModal');
const eventForm = document.getElementById('eventForm');
const eventTitle = document.getElementById('eventTitle');
const eventDescription = document.getElementById('eventDescription');
const eventFile = document.getElementById('eventFile');
const filePreview = document.getElementById('filePreview');
const selectedDayDisplay = document.getElementById('selectedDay');
const dayContent = document.getElementById('dayContent');
const cancelBtn = document.getElementById('cancelBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadBirthDate();
    setupEventListeners();
    if (birthDate) {
        renderCalendar();
        loadEvents();
    }
});

function setupEventListeners() {
    setBirthDateBtn.addEventListener('click', setBirthDate);
    prevYearBtn.addEventListener('click', () => navigateYear(-1));
    nextYearBtn.addEventListener('click', () => navigateYear(1));
    createEventBtn.addEventListener('click', () => openEventModal());
    eventForm.addEventListener('submit', handleEventSubmit);
    cancelBtn.addEventListener('click', closeEventModal);
    eventFile.addEventListener('change', handleFilePreview);
    
    // Close modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            eventModal.style.display = 'none';
            dayModal.style.display = 'none';
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === eventModal) eventModal.style.display = 'none';
        if (e.target === dayModal) dayModal.style.display = 'none';
    });
}

function loadBirthDate() {
    const saved = localStorage.getItem('birthDate');
    if (saved) {
        birthDate = new Date(saved);
        birthDateInput.value = saved.split('T')[0];
        currentYearOfAge = calculateYearOfAge(birthDate, new Date());
    }
}

function setBirthDate() {
    const dateValue = birthDateInput.value;
    if (!dateValue) {
        alert('Please select a birth date');
        return;
    }
    birthDate = new Date(dateValue);
    localStorage.setItem('birthDate', birthDate.toISOString());
    currentYearOfAge = calculateYearOfAge(birthDate, new Date());
    renderCalendar();
    loadEvents();
}

function calculateYearOfAge(birthDate, currentDate) {
    let year = 0;
    let checkDate = new Date(birthDate);
    
    while (checkDate <= currentDate) {
        checkDate.setFullYear(checkDate.getFullYear() + 1);
        if (checkDate <= currentDate) {
            year++;
        }
    }
    
    return year;
}

function navigateYear(direction) {
    currentYearOfAge = Math.max(0, currentYearOfAge + direction);
    renderCalendar();
    loadEvents();
}

function renderCalendar() {
    if (!birthDate) {
        calendarGrid.innerHTML = '<p>Please set your birth date to view the calendar.</p>';
        return;
    }
    
    calendarGrid.innerHTML = '';
    currentYearDisplay.textContent = `Year ${currentYearOfAge}`;
    
    const yearStart = new Date(birthDate);
    yearStart.setFullYear(birthDate.getFullYear() + currentYearOfAge);
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    months.forEach((monthName, monthIndex) => {
        const monthDiv = document.createElement('div');
        monthDiv.className = 'month-container';
        
        const monthHeader = document.createElement('h3');
        monthHeader.textContent = monthName;
        monthDiv.appendChild(monthHeader);
        
        const daysGrid = document.createElement('div');
        daysGrid.className = 'days-grid';
        
        // Add weekday headers for first month only
        if (monthIndex === 0) {
            const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            weekdays.forEach(day => {
                const header = document.createElement('div');
                header.className = 'weekday-header';
                header.textContent = day;
                daysGrid.appendChild(header);
            });
        }
        
        const monthDate = new Date(yearStart.getFullYear(), monthIndex, 1);
        const daysInMonth = new Date(yearStart.getFullYear(), monthIndex + 1, 0).getDate();
        const firstDayOfWeek = monthDate.getDay();
        
        // Empty cells for days before month starts
        for (let i = 0; i < firstDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'day-cell empty';
            daysGrid.appendChild(emptyCell);
        }
        
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'day-cell';
            dayCell.textContent = day;
            
            const dateKey = formatDateKey(yearStart.getFullYear(), monthIndex, day);
            dayCell.dataset.date = dateKey;
            
            // Check if day has events
            if (events[dateKey] && events[dateKey].length > 0) {
                dayCell.classList.add('has-events');
                const eventCount = document.createElement('span');
                eventCount.className = 'event-count';
                eventCount.textContent = events[dateKey].length;
                dayCell.appendChild(eventCount);
            }
            
            dayCell.addEventListener('click', () => openDayDetails(dateKey));
            dayCell.addEventListener('dblclick', () => openEventModalForDay(dateKey));
            
            daysGrid.appendChild(dayCell);
        }
        
        monthDiv.appendChild(daysGrid);
        calendarGrid.appendChild(monthDiv);
    });
}

function formatDateKey(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function openEventModal(dateKey = null) {
    selectedDate = dateKey || getTodayDateKey();
    if (!selectedDate) {
        alert('Please set your birth date first');
        return;
    }
    
    const date = new Date(selectedDate);
    selectedDayDisplay.textContent = `Date: ${date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    })}`;
    
    eventForm.reset();
    filePreview.innerHTML = '';
    eventModal.style.display = 'block';
}

function openEventModalForDay(dateKey) {
    selectedDate = dateKey;
    openEventModal(dateKey);
}

function getTodayDateKey() {
    if (!birthDate) return null;
    const today = new Date();
    const yearStart = new Date(birthDate);
    yearStart.setFullYear(birthDate.getFullYear() + currentYearOfAge);
    
    // Use today's month and day in the current year of age
    const targetDate = new Date(yearStart.getFullYear(), today.getMonth(), today.getDate());
    
    return formatDateKey(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
}

function handleFilePreview(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    filePreview.innerHTML = '';
    
    if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.maxWidth = '200px';
        img.style.maxHeight = '200px';
        img.style.marginTop = '0.5rem';
        filePreview.appendChild(img);
    } else {
        const fileInfo = document.createElement('div');
        fileInfo.textContent = `File: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        fileInfo.style.marginTop = '0.5rem';
        filePreview.appendChild(fileInfo);
    }
}

async function handleEventSubmit(e) {
    e.preventDefault();
    
    if (!selectedDate) {
        alert('Please select a date');
        return;
    }
    
    const title = eventTitle.value.trim();
    if (!title) {
        alert('Please enter a title');
        return;
    }
    
    const description = eventDescription.value.trim();
    const file = eventFile.files[0];
    
    try {
        let fileURL = null;
        let fileName = null;
        
        // Upload file if provided
        if (file) {
            const timestamp = Date.now();
            fileName = `${timestamp}_${file.name}`;
            const storageRef = window.firebaseRef(window.firebaseStorage, `calendar/${fileName}`);
            const uploadTask = window.firebaseUploadBytesResumable(storageRef, file);
            
            await new Promise((resolve, reject) => {
                uploadTask.on('state_changed',
                    null,
                    reject,
                    async () => {
                        fileURL = await window.firebaseGetDownloadURL(uploadTask.snapshot.ref);
                        resolve();
                    }
                );
            });
        }
        
        // Save event to Firestore
        const eventData = {
            date: selectedDate,
            title: title,
            description: description,
            fileURL: fileURL,
            fileName: fileName || null,
            createdAt: new Date(),
            yearOfAge: currentYearOfAge
        };
        
        await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDb, 'calendarEvents'), eventData);
        
        // Update local events
        if (!events[selectedDate]) {
            events[selectedDate] = [];
        }
        events[selectedDate].push(eventData);
        
        closeEventModal();
        renderCalendar();
        showNotification('Event saved successfully!');
    } catch (error) {
        console.error('Error saving event:', error);
        alert(`Error saving event: ${error.message}`);
    }
}

function closeEventModal() {
    eventModal.style.display = 'none';
    eventForm.reset();
    filePreview.innerHTML = '';
    selectedDate = null;
}

async function loadEvents() {
    if (!birthDate) return;
    
    try {
        const yearStart = new Date(birthDate);
        yearStart.setFullYear(birthDate.getFullYear() + currentYearOfAge);
        const yearEnd = new Date(yearStart);
        yearEnd.setFullYear(yearStart.getFullYear() + 1);
        
        const startDateKey = formatDateKey(yearStart.getFullYear(), 0, 1);
        const endDateKey = formatDateKey(yearEnd.getFullYear(), 11, 31);
        
        const eventsRef = window.firebaseCollection(window.firebaseDb, 'calendarEvents');
        const q = window.firebaseQuery(
            eventsRef,
            window.firebaseWhere('date', '>=', startDateKey),
            window.firebaseWhere('date', '<=', endDateKey),
            window.firebaseOrderBy('date')
        );
        
        const querySnapshot = await window.firebaseGetDocs(q);
        events = {};
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const date = data.date;
            if (!events[date]) {
                events[date] = [];
            }
            events[date].push({ ...data, id: doc.id });
        });
        
        renderCalendar();
    } catch (error) {
        console.error('Error loading events:', error);
    }
}

function openDayDetails(dateKey) {
    const date = new Date(dateKey);
    document.getElementById('dayModalTitle').textContent = 
        `Day: ${date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`;
    
    dayContent.innerHTML = '';
    
    if (!events[dateKey] || events[dateKey].length === 0) {
        dayContent.innerHTML = '<p>No events for this day. Double-click to add one.</p>';
    } else {
        events[dateKey].forEach((event, index) => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'event-item';
            
            eventDiv.innerHTML = `
                <h4>${event.title}</h4>
                ${event.description ? `<p>${event.description}</p>` : ''}
                ${event.fileURL ? `
                    ${event.fileName && event.fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i) 
                        ? `<img src="${event.fileURL}" alt="${event.title}" class="event-image">`
                        : `<a href="${event.fileURL}" target="_blank" class="event-file-link">View File: ${event.fileName || 'Download'}</a>`
                    }
                ` : ''}
                <div class="event-meta">Added: ${new Date(event.createdAt?.toDate ? event.createdAt.toDate() : event.createdAt).toLocaleString()}</div>
            `;
            
            dayContent.appendChild(eventDiv);
        });
    }
    
    dayModal.style.display = 'block';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

