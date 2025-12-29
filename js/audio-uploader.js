// Wait for DOM and Firebase to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Firebase to be initialized
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max wait
    
    const checkFirebase = setInterval(() => {
        attempts++;
        if (window.firebaseStorage && window.firebaseDb) {
            clearInterval(checkFirebase);
            initAudioUploader();
        } else if (attempts >= maxAttempts) {
            clearInterval(checkFirebase);
            showFirebaseError();
        }
    }, 100);
});

function showFirebaseError() {
    const uploadStatus = document.getElementById('uploadStatus');
    const galleryLoading = document.getElementById('galleryLoading');
    const galleryEmpty = document.getElementById('galleryEmpty');
    
    if (uploadStatus) {
        uploadStatus.textContent = 'Firebase not configured. Please set up Firebase in js/firebase-config.js';
        uploadStatus.className = 'upload-status error';
        uploadStatus.style.display = 'block';
    }
    
    if (galleryLoading) {
        galleryLoading.style.display = 'none';
    }
    
    if (galleryEmpty) {
        galleryEmpty.style.display = 'block';
        galleryEmpty.innerHTML = '<p>Firebase configuration required. Please see js/firebase-config.js for setup instructions.</p>';
    }
}

function initAudioUploader() {
    const audioFileInput = document.getElementById('audioFileInput');
    const uploadArea = document.getElementById('uploadArea');
    const uploadProgress = document.getElementById('uploadProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const uploadStatus = document.getElementById('uploadStatus');
    const audioGallery = document.getElementById('audioGallery');
    const galleryLoading = document.getElementById('galleryLoading');
    const galleryEmpty = document.getElementById('galleryEmpty');

    // Recording elements
    const recordButton = document.getElementById('recordButton');
    const stopButton = document.getElementById('stopButton');
    const recordingStatus = document.getElementById('recordingStatus');
    const recordingTime = document.getElementById('recordingTime');
    const recordedAudioContainer = document.getElementById('recordedAudioContainer');
    const recordedAudioPreview = document.getElementById('recordedAudioPreview');
    const saveRecordingBtn = document.getElementById('saveRecordingBtn');
    const discardRecordingBtn = document.getElementById('discardRecordingBtn');

    // Recording state
    let mediaRecorder = null;
    let audioChunks = [];
    let recordingStartTime = null;
    let recordingTimer = null;
    let recordedBlob = null;
    let recordingStream = null;
    const MAX_RECORDING_TIME = 30; // 30 seconds

    // Initialize recording functionality
    initRecording();

    // File input change handler
    audioFileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop handlers
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('audio/'));
        if (files.length > 0) {
            handleFiles(files);
        }
    });

    // Load existing audio files
    loadAudioFiles();

    function handleFileSelect(e) {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            handleFiles(files);
        }
    }

    function handleFiles(files) {
        files.forEach(file => {
            if (file.type.startsWith('audio/')) {
                uploadAudioFile(file);
            } else {
                showStatus('Please select audio files only.', 'error');
            }
        });
    }

    async function uploadAudioFile(file) {
        try {
            // Show progress
            uploadProgress.style.display = 'block';
            progressFill.style.width = '0%';
            progressText.textContent = `Uploading ${file.name}...`;

            // Create storage reference
            const timestamp = Date.now();
            const fileName = `${timestamp}_${file.name}`;
            const storageRef = window.firebaseRef(window.firebaseStorage, `audio/${fileName}`);

            // Upload file
            const uploadTask = window.firebaseUploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // Update progress
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    progressFill.style.width = `${progress}%`;
                    progressText.textContent = `Uploading ${file.name}... ${Math.round(progress)}%`;
                },
                (error) => {
                    console.error('Upload error:', error);
                    showStatus(`Error uploading ${file.name}: ${error.message}`, 'error');
                    uploadProgress.style.display = 'none';
                },
                async () => {
                    // Upload complete
                    try {
                        const downloadURL = await window.firebaseGetDownloadURL(uploadTask.snapshot.ref);
                        
                        // Save metadata to Firestore
                        await window.firebaseAddDoc(window.firebaseCollection(window.firebaseDb, 'audioFiles'), {
                            fileName: file.name,
                            storagePath: `audio/${fileName}`,
                            downloadURL: downloadURL,
                            uploadedAt: new Date(),
                            fileSize: file.size,
                            fileType: file.type
                        });

                        showStatus(`Successfully uploaded ${file.name}!`, 'success');
                        uploadProgress.style.display = 'none';
                        audioFileInput.value = ''; // Reset input
                        
                        // Reload gallery
                        loadAudioFiles();
                    } catch (error) {
                        console.error('Error saving metadata:', error);
                        showStatus(`File uploaded but metadata save failed: ${error.message}`, 'error');
                        uploadProgress.style.display = 'none';
                    }
                }
            );
        } catch (error) {
            console.error('Upload error:', error);
            showStatus(`Error: ${error.message}`, 'error');
            uploadProgress.style.display = 'none';
        }
    }

    async function loadAudioFiles() {
        try {
            galleryLoading.style.display = 'block';
            galleryEmpty.style.display = 'none';
            audioGallery.innerHTML = '';

            const audioFilesRef = window.firebaseCollection(window.firebaseDb, 'audioFiles');
            const q = window.firebaseQuery(audioFilesRef, window.firebaseOrderBy('uploadedAt', 'desc'));
            const querySnapshot = await window.firebaseGetDocs(q);

            if (querySnapshot.empty) {
                galleryLoading.style.display = 'none';
                galleryEmpty.style.display = 'block';
                return;
            }

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                createAudioCard(data);
            });

            galleryLoading.style.display = 'none';
        } catch (error) {
            console.error('Error loading audio files:', error);
            galleryLoading.style.display = 'none';
            galleryEmpty.style.display = 'block';
            galleryEmpty.innerHTML = '<p>Error loading audio files. Please check Firebase configuration.</p>';
        }
    }

    function createAudioCard(audioData) {
        const card = document.createElement('div');
        card.className = 'audio-card';
        
        const audioElement = document.createElement('audio');
        audioElement.controls = true;
        audioElement.src = audioData.downloadURL;
        audioElement.preload = 'metadata';
        
        const fileName = document.createElement('div');
        fileName.className = 'audio-filename';
        fileName.textContent = audioData.fileName || 'Audio File';
        
        const fileInfo = document.createElement('div');
        fileInfo.className = 'audio-info';
        const uploadDate = audioData.uploadedAt?.toDate ? audioData.uploadedAt.toDate() : new Date(audioData.uploadedAt);
        const { dateStr, timeStr } = formatDateTime(uploadDate);
        
        const uploadDateDiv = document.createElement('div');
        uploadDateDiv.className = 'audio-upload-date';
        uploadDateDiv.innerHTML = `<strong>Uploaded:</strong> ${dateStr}`;
        
        const uploadTimeDiv = document.createElement('div');
        uploadTimeDiv.className = 'audio-upload-time';
        uploadTimeDiv.innerHTML = `<strong>Time:</strong> ${timeStr}`;
        
        fileInfo.appendChild(uploadDateDiv);
        fileInfo.appendChild(uploadTimeDiv);
        
        card.appendChild(audioElement);
        card.appendChild(fileName);
        card.appendChild(fileInfo);
        
        audioGallery.appendChild(card);
    }

    function formatDateTime(date) {
        if (!date) {
            return { dateStr: 'Unknown date', timeStr: 'Unknown time' };
        }
        
        const dateStr = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(date);
        
        const timeStr = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).format(date);
        
        return { dateStr, timeStr };
    }

    function showStatus(message, type = 'info') {
        uploadStatus.textContent = message;
        uploadStatus.className = `upload-status ${type}`;
        uploadStatus.style.display = 'block';
        
        setTimeout(() => {
            uploadStatus.style.display = 'none';
        }, 5000);
    }

    // Recording functions
    async function initRecording() {
        recordButton.addEventListener('click', startRecording);
        stopButton.addEventListener('click', stopRecording);
        saveRecordingBtn.addEventListener('click', saveRecording);
        discardRecordingBtn.addEventListener('click', discardRecording);
    }

    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            recordingStream = stream;
            
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];
            recordedBlob = null;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                recordedBlob = new Blob(audioChunks, { type: 'audio/webm' });
                const audioURL = URL.createObjectURL(recordedBlob);
                recordedAudioPreview.src = audioURL;
                recordedAudioContainer.style.display = 'block';
                
                // Stop all tracks to release microphone
                if (recordingStream) {
                    recordingStream.getTracks().forEach(track => track.stop());
                    recordingStream = null;
                }
            };

            mediaRecorder.start();
            recordingStartTime = Date.now();
            
            // Update UI
            recordButton.style.display = 'none';
            stopButton.style.display = 'inline-flex';
            recordingStatus.style.display = 'flex';
            recordedAudioContainer.style.display = 'none';
            
            // Start timer
            startRecordingTimer();
            
            showStatus(`Recording started. Maximum ${MAX_RECORDING_TIME} seconds. Click stop when finished.`, 'info');
        } catch (error) {
            console.error('Error accessing microphone:', error);
            showStatus('Error accessing microphone. Please allow microphone access.', 'error');
        }
    }

    function stopRecording() {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            
            // Update UI
            recordButton.style.display = 'inline-flex';
            stopButton.style.display = 'none';
            recordingStatus.style.display = 'none';
            
            // Stop timer
            stopRecordingTimer();
            
            showStatus('Recording stopped. Preview your recording below.', 'success');
        }
    }

    function startRecordingTimer() {
        recordingTimer = setInterval(() => {
            if (recordingStartTime) {
                const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
                const minutes = Math.floor(elapsed / 60);
                const seconds = elapsed % 60;
                const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                recordingTime.textContent = `${timeString} / ${MAX_RECORDING_TIME}s`;
                
                // Check if time limit reached
                if (elapsed >= MAX_RECORDING_TIME) {
                    stopRecording();
                    showStatus(`Recording stopped automatically at ${MAX_RECORDING_TIME} seconds.`, 'info');
                } else if (elapsed >= MAX_RECORDING_TIME - 5) {
                    // Warning when 5 seconds remaining
                    recordingTime.style.color = '#ff6b6b';
                } else {
                    recordingTime.style.color = '';
                }
            }
        }, 100);
    }

    function stopRecordingTimer() {
        if (recordingTimer) {
            clearInterval(recordingTimer);
            recordingTimer = null;
        }
        recordingTime.textContent = '00:00 / 30s';
        recordingTime.style.color = '';
    }

    async function saveRecording() {
        if (!recordedBlob) {
            showStatus('No recording to save.', 'error');
            return;
        }

        try {
            // Create a file from the blob
            const timestamp = Date.now();
            const fileName = `recording_${timestamp}.webm`;
            const file = new File([recordedBlob], fileName, { type: 'audio/webm' });
            
            // Upload the recording
            await uploadAudioFile(file);
            
            // Reset recording UI
            discardRecording();
            
            showStatus('Recording saved successfully!', 'success');
        } catch (error) {
            console.error('Error saving recording:', error);
            showStatus(`Error saving recording: ${error.message}`, 'error');
        }
    }

    function discardRecording() {
        recordedBlob = null;
        audioChunks = [];
        recordedAudioPreview.src = '';
        recordedAudioContainer.style.display = 'none';
        
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }
        
        recordButton.style.display = 'inline-flex';
        stopButton.style.display = 'none';
        recordingStatus.style.display = 'none';
        stopRecordingTimer();
    }
}

