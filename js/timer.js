// Tummy Time Timer Data
const tummyTimeData = {
    jan: {
        easy: [':20', ':40', '0:01:00', '0:01:20', '0:01:40', '0:02:00', '0:02:20', '0:02:40', '0:03:00', '0:03:20', '0:03:40', '0:04:00', '0:04:20', '0:04:40', '0:05:00', '0:05:20', '0:05:40', '0:06:00', '0:06:20', '0:06:40', '0:07:00', '0:07:20', '0:07:40', '0:08:00', '0:08:20', '0:08:40', '0:09:00', '0:09:20', '0:09:40', '0:10:00'],
        hard: ['0:01:00', '0:02:00', '0:03:00', '0:04:00', '0:05:00', '0:06:00', '0:07:00', '0:08:00', '0:09:00', '0:10:00', '0:11:00', '0:12:00', '0:13:00', '0:14:00', '0:15:00', '0:16:00', '0:17:00', '0:18:00', '0:19:00', '0:20:00', '0:21:00', '0:22:00', '0:23:00', '0:24:00', '0:25:00', '0:26:00', '0:27:00', '0:28:00', '0:29:00', '0:30:00'],
        total: '2hr 34m'
    },
    feb: {
        easy: ['0:10:40', '0:11:20', '0:12:00', '0:12:40', '0:13:20', '0:14:00', '0:14:40', '0:15:20', '0:16:00', '0:16:40', '0:17:20', '0:18:00', '0:18:40', '0:19:20', '0:20:00', '0:20:40', '0:21:20', '0:22:00', '0:22:40', '0:23:20', '0:24:00', '0:24:40', '0:25:20', '0:26:00', '0:26:40', '0:27:20', '0:28:00', '0:28:40', '0:29:20', '0:30:00'],
        hard: ['10:40', '11:20', '12', '12:40', '13:20', '14', '14:40', '15:20', '16', '16:40', '17:20', '18', '18:40', '19:20', '20', '20:40', '21:20', '22', '22:40', '23:20', '24', '24:40', '25:20', '26', '26:40', '27:20', '28', '28:40', '29:20', '30'],
        total: '7hr 45m'
    },
    mar: {
        easy: ['0:31:00', '0:32:00', '0:33:00', '0:34:00', '0:35:00', '0:36:00', '0:37:00', '0:38:00', '0:39:00', '0:40:00', '0:41:00', '0:42:00', '0:43:00', '0:44:00', '0:45:00', '0:46:00', '0:47:00', '0:48:00', '0:49:00', '0:50:00', '0:51:00', '0:52:00', '0:53:00', '0:54:00', '0:55:00', '0:56:00', '0:57:00', '0:58:00', '0:59:00', '1:00:00'],
        hard: ['31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'],
        total: '10hr 10m'
    },
    apr: {
        easy: ['0:31:30', '0:33:00', '0:34:30', '0:36:00', '0:37:30', '0:39:00', '0:40:30', '0:42:00', '0:43:30', '0:45:00', '0:46:30', '0:48:00', '0:49:30', '0:51:00', '0:52:30', '0:54:00', '0:55:30', '0:57:00', '0:58:30', '1:00:00', '1:01:30', '1:03:00', '1:04:30', '1:06:00', '1:07:30', '1:09:00', '1:10:30', '1:12:00', '1:13:30', '1:15:00'],
        hard: ['31:30', '33', '34:30', '36', '37:30', '39', '40:30', '42', '43:30', '45', '46:30', '48', '49:30', '51', '52:30', '54', '55:30', '57', '58:30', '60', '61:30', '63', '64:30', '66', '67:30', '69', '70:30', '72', '73:30', '75'],
        total: '22hr 45m'
    },
    may: {
        easy: ['1:02:10', '1:04:20', '1:06:30', '1:08:40', '1:10:50', '1:13:00', '1:15:10', '1:17:20', '1:19:30', '1:21:40', '1:23:50', '1:26:00', '1:28:10', '1:30:20', '1:32:30', '1:34:40', '1:36:50', '1:39:00', '1:41:10', '1:43:20', '1:45:30', '1:47:40', '1:49:50', '1:52:00', '1:54:10', '1:56:20', '1:58:30', '2:00:40', '2:02:50', '2:05:00'],
        hard: ['62:10', '64:20', '66:30', '68:40', '70:50', '73', '75:10', '77:20', '79:30', '81:40', '83:50', '86', '88:10', '90:20', '92:30', '94:40', '96:50', '99', '101:10', '103:20', '105:30', '107:40', '109:50', '112', '114:10', '116:20', '118:30', '120:40', '122:50', '125'],
        total: '26hr 37m 30s'
    },
    jun: {
        easy: ['1:15:50', '1:16:40', '1:17:30', '1:18:20', '1:19:10', '1:20:00', '1:20:50', '1:21:40', '1:22:30', '1:23:20', '1:24:10', '1:25:00', '1:25:50', '1:26:40', '1:27:30', '1:28:20', '1:29:10', '1:30:00', '1:30:50', '1:31:40', '1:32:30', '1:33:20', '1:34:10', '1:35:00', '1:35:50', '1:36:40', '1:37:30', '1:38:20', '1:39:10', '1:40:00'],
        hard: ['75:50', '76:40', '77:30', '78:20', '79:10', '80', '80:50', '81:40', '82:30', '83:20', '84:10', '85', '85:50', '86:40', '87:30', '88:20', '89:10', '90', '90:50', '91:40', '92:30', '93:20', '94:10', '95', '95:50', '96:40', '97:30', '98:20', '99:10', '100'],
        total: '46hr 47m 30s'
    },
    jul: {
        easy: ['2:05:50', '2:06:40', '2:07:30', '2:08:20', '2:09:10', '2:10:00', '2:10:50', '2:11:40', '2:12:30', '2:13:20', '2:14:10', '2:15:00', '2:15:50', '2:16:40', '2:17:30', '2:18:20', '2:19:10', '2:20:00', '2:20:50', '2:21:40', '2:22:30', '2:23:20', '2:24:10', '2:25:00', '2:25:50', '2:26:40', '2:27:30', '2:28:20', '2:29:10', '2:30:00'],
        hard: ['125:50', '126:40', '127:30', '128:20', '129:10', '130', '130:50', '131:40', '132:30', '133:20', '134:10', '135', '135:50', '136:40', '137:30', '138:20', '139:10', '140', '140:50', '141:40', '142:30', '143:20', '144:10', '145', '145:50', '146:40', '147:30', '148:20', '149:10', '150'],
        total: '43hr 57m 30s'
    },
    aug: {
        easy: ['1:41:40', '1:43:20', '1:45:00', '1:46:40', '1:48:20', '1:50:00', '1:51:40', '1:53:20', '1:55:00', '1:56:40', '1:58:20', '2:00:00', '2:01:40', '2:03:20', '2:05:00', '2:06:40', '2:08:20', '2:10:00', '2:11:40', '2:13:20', '2:15:00', '2:16:40', '2:18:20', '2:20:00', '2:21:40', '2:23:20', '2:25:00', '2:26:40', '2:28:20', '2:30:00'],
        hard: ['101:40', '103:20', '105', '106:40', '108:20', '110', '111:40', '113:20', '115', '116:40', '118:20', '120', '121:40', '123:20', '125', '126:40', '128:20', '130', '131:40', '133:20', '135', '136:40', '138:20', '140', '141:40', '143:20', '145', '146:40', '148:20', '150'],
        total: '68hr 57m 30s'
    },
    sep: {
        easy: ['2:31:40', '2:33:20', '2:35:00', '2:36:40', '2:38:20', '2:40:00', '2:41:40', '2:43:20', '2:45:00', '2:46:40', '2:48:20', '2:50:00', '2:51:40', '2:53:20', '2:55:00', '2:56:40', '2:58:20', '3:00:00', '3:01:40', '3:03:20', '3:05:00', '3:06:40', '3:08:20', '3:10:00', '3:11:40', '3:13:20', '3:15:00', '3:16:40', '3:18:20', '3:20:00'],
        hard: ['151:40', '153:20', '155', '156:40', '158:20', '160', '161:40', '163:20', '165', '166:40', '168:20', '170', '171:40', '173:20', '175', '176:40', '178:20', '180', '181:40', '183:20', '185', '186:40', '188:20', '190', '191:40', '193:20', '195', '196:40', '198:20', '200'],
        total: '62hr 55m'
    },
    oct: {
        easy: ['1:41:40', '1:43:20', '1:45:00', '1:46:40', '1:48:20', '1:50:00', '1:51:40', '1:53:20', '1:55:00', '1:56:40', '1:58:20', '2:00:00', '2:01:40', '2:03:20', '2:05:00', '2:06:40', '2:08:20', '2:10:00', '2:11:40', '2:13:20', '2:15:00', '2:16:40', '2:18:20', '2:20:00', '2:21:40', '2:23:20', '2:25:00', '2:26:40', '2:28:20', '2:30:00'],
        hard: ['151:40', '153:20', '155', '156:40', '158:20', '160', '161:40', '163:20', '165', '166:40', '168:20', '170', '171:40', '173:20', '175', '176:40', '178:20', '180', '181:40', '183:20', '185', '186:40', '188:20', '190', '191:40', '193:20', '195', '196:40', '198:20', '200'],
        total: '87hr 55m'
    },
    nov: {
        easy: ['3:23:20', '3:26:40', '3:30:00', '3:33:20', '3:36:40', '3:40:00', '3:43:20', '3:46:40', '3:50:00', '3:53:20', '3:56:40', '4:00:00', '4:03:20', '4:06:40', '4:10:00', '4:13:20', '4:16:40', '4:20:00', '4:23:20', '4:26:40', '4:30:00', '4:33:20', '4:36:40', '4:40:00', '4:43:20', '4:46:40', '4:50:00', '4:53:20', '4:56:40', '5:00:00'],
        hard: ['203:20', '206:40', '210', '213:20', '216:40', '220', '223:20', '226:40', '230', '233:20', '236:40', '240', '243:20', '246:40', '250', '253:20', '256:40', '260', '263:20', '266:40', '270', '273:20', '276:40', '280', '283:20', '286:40', '290', '293:20', '296:40', '300'],
        total: '62hr 55m'
    },
    dec: {
        easy: [],
        hard: [],
        total: '125hr 50m'
    }
};

// Timer state
let timerInterval = null;
let startTime = null;
let elapsedTime = 0;
let currentLevel = null;
let isRunning = false;

// DOM elements
const timerDisplay = document.getElementById('timerDisplay');
const currentLevelDisplay = document.getElementById('currentLevel');
const easyBtn = document.getElementById('easyBtn');
const hardBtn = document.getElementById('hardBtn');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const saveBtn = document.getElementById('saveBtn');
const sessionInfo = document.getElementById('sessionInfo');
const sessionTime = document.getElementById('sessionTime');
const sessionLevel = document.getElementById('sessionLevel');
const todayEasy = document.getElementById('todayEasy');
const todayHard = document.getElementById('todayHard');
const todayTotal = document.getElementById('todayTotal');
const monthSelect = document.getElementById('monthSelect');
const historyBody = document.getElementById('historyBody');
const monthTotals = document.getElementById('monthTotals');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateTodayStats();
    loadMonthData();
    setCurrentMonth();
});

function setupEventListeners() {
    easyBtn.addEventListener('click', () => selectLevel('easy'));
    hardBtn.addEventListener('click', () => selectLevel('hard'));
    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);
    saveBtn.addEventListener('click', saveSession);
    monthSelect.addEventListener('change', loadMonthData);
}

function selectLevel(level) {
    if (isRunning) return;
    currentLevel = level;
    currentLevelDisplay.textContent = level === 'easy' ? 'Easy Level' : 'Hard Level';
    currentLevelDisplay.className = `timer-level ${level}-level`;
    easyBtn.classList.toggle('active', level === 'easy');
    hardBtn.classList.toggle('active', level === 'hard');
}

function startTimer() {
    if (!currentLevel) {
        alert('Please select a level first');
        return;
    }
    
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 100);
        isRunning = true;
        startBtn.style.display = 'none';
        stopBtn.style.display = 'inline-block';
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.style.display = 'inline-block';
        stopBtn.style.display = 'none';
        saveBtn.style.display = 'inline-block';
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    startTime = null;
    updateDisplay();
    startBtn.style.display = 'inline-block';
    stopBtn.style.display = 'none';
    saveBtn.style.display = 'none';
    sessionInfo.style.display = 'none';
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
}

function updateDisplay() {
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    timerDisplay.textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function saveSession() {
    if (elapsedTime === 0) return;
    
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    sessionTime.textContent = timeString;
    sessionLevel.textContent = currentLevel;
    sessionInfo.style.display = 'block';
    
    // Save to localStorage
    const today = new Date().toDateString();
    const saved = JSON.parse(localStorage.getItem('tummyTimeSessions') || '{}');
    if (!saved[today]) saved[today] = { easy: 0, hard: 0 };
    saved[today][currentLevel] += totalSeconds;
    localStorage.setItem('tummyTimeSessions', JSON.stringify(saved));
    
    updateTodayStats();
    resetTimer();
}

function updateTodayStats() {
    const today = new Date().toDateString();
    const saved = JSON.parse(localStorage.getItem('tummyTimeSessions') || '{}');
    const todayData = saved[today] || { easy: 0, hard: 0 };
    
    const easySeconds = todayData.easy || 0;
    const hardSeconds = todayData.hard || 0;
    const totalSeconds = easySeconds + hardSeconds;
    
    todayEasy.textContent = formatTime(easySeconds);
    todayHard.textContent = formatTime(hardSeconds);
    todayTotal.textContent = formatTime(totalSeconds);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function setCurrentMonth() {
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const currentMonthIndex = new Date().getMonth();
    monthSelect.value = months[currentMonthIndex];
}

function loadMonthData() {
    const month = monthSelect.value;
    const monthData = tummyTimeData[month];
    
    if (!monthData) return;
    
    historyBody.innerHTML = '';
    const maxDays = Math.max(monthData.easy.length, monthData.hard.length);
    
    for (let day = 0; day < maxDays; day++) {
        const row = document.createElement('tr');
        const easyTime = monthData.easy[day] || '';
        const hardTime = monthData.hard[day] || '';
        
        // Calculate total if both times exist
        let totalTime = '';
        if (easyTime && hardTime) {
            totalTime = calculateTotal(easyTime, hardTime);
        }
        
        row.innerHTML = `
            <td>${day + 1}</td>
            <td>${formatTimeString(easyTime)}</td>
            <td>${formatTimeString(hardTime)}</td>
            <td>${formatTimeString(totalTime)}</td>
        `;
        historyBody.appendChild(row);
    }
    
    // Display month totals
    monthTotals.innerHTML = `<div class="total-display"><strong>Total for ${monthSelect.options[monthSelect.selectedIndex].text}:</strong> ${monthData.total}</div>`;
}

function formatTimeString(timeStr) {
    if (!timeStr) return '-';
    // Handle various formats: ':20', '0:01:00', '1:02:10', etc.
    return timeStr;
}

function calculateTotal(easy, hard) {
    // Simple display - in a real app, you'd parse and add the times
    return `${easy} + ${hard}`;
}

