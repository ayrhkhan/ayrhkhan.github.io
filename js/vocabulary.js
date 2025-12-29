// Vocabulary state
let vocabulary = {}; // { word: { count: number, firstUsed: date, lastUsed: date } }
let allWords = []; // Array of all words ever typed (for recent sorting)
let processedWordsInCurrentText = new Set(); // Track words already counted in current text

// DOM elements
const textInput = document.getElementById('textInput');
const vocabularyBox = document.getElementById('vocabularyBox');
const wordCount = document.getElementById('wordCount');
const charCount = document.getElementById('charCount');
const totalWords = document.getElementById('totalWords');
const uniqueWords = document.getElementById('uniqueWords');
const clearBtn = document.getElementById('clearBtn');
const clearVocabularyBtn = document.getElementById('clearVocabularyBtn');
const searchWords = document.getElementById('searchWords');
const sortBy = document.getElementById('sortBy');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadVocabulary();
    setupEventListeners();
    updateDisplay();
    // Process any existing text on load
    if (textInput.value.trim()) {
        processCompletedWords(textInput.value);
    }
});

function setupEventListeners() {
    textInput.addEventListener('input', handleTextInput);
    textInput.addEventListener('paste', () => {
        setTimeout(() => {
            // Process all completed words in pasted text
            const text = textInput.value;
            processCompletedWords(text);
            setLastTextLength(text.length);
            updateStats(text);
        }, 10);
    });
    clearBtn.addEventListener('click', clearText);
    clearVocabularyBtn.addEventListener('click', clearVocabulary);
    searchWords.addEventListener('input', updateDisplay);
    sortBy.addEventListener('change', updateDisplay);
}

function handleTextInput(e) {
    const text = textInput.value;
    updateStats(text);
    
    // Check if text was deleted (length decreased)
    if (text.length < getLastTextLength()) {
        // Reset processed words when text is deleted so words can be recounted
        processedWordsInCurrentText.clear();
        setLastTextLength(text.length);
        return;
    }
    
    // Only process when a space or punctuation is typed (word completion)
    const lastChar = text[text.length - 1];
    if (lastChar && (/\s/.test(lastChar) || /[^\w'-]/.test(lastChar))) {
        // Extract the word that was just completed (before the space/punctuation)
        const textBeforeLastChar = text.slice(0, -1);
        const words = textBeforeLastChar.toLowerCase()
            .replace(/[^\w\s'-]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 0 && /[a-z]/.test(word));
        
        if (words.length > 0) {
            const lastWord = words[words.length - 1];
            // Create a unique key for this word occurrence (word + position in text)
            // This allows counting the same word multiple times
            const wordKey = `${lastWord}_${textBeforeLastChar.length - lastWord.length}`;
            
            // Only count if we haven't already counted this specific occurrence
            if (!processedWordsInCurrentText.has(wordKey)) {
                processSingleWord(lastWord);
                processedWordsInCurrentText.add(wordKey);
            }
        }
    }
    
    setLastTextLength(text.length);
}

let lastTextLength = 0;

function getLastTextLength() {
    return lastTextLength;
}

function setLastTextLength(length) {
    lastTextLength = length;
}

function updateStats(text) {
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    wordCount.textContent = `${words.length} words`;
    charCount.textContent = `${text.length} characters`;
}

function processSingleWord(word) {
    const currentTime = new Date();
    let hasChanges = false;
    
    if (!vocabulary[word]) {
        // New word - first time seeing it
        vocabulary[word] = {
            count: 1,
            firstUsed: currentTime,
            lastUsed: currentTime
        };
        allWords.push(word);
        hasChanges = true;
    } else {
        // Existing word - increment count
        vocabulary[word].count++;
        vocabulary[word].lastUsed = currentTime;
        hasChanges = true;
    }
    
    if (hasChanges) {
        saveVocabulary();
        updateDisplay();
    }
}

function processCompletedWords(text) {
    // Process all completed words in text (used on initial load)
    const words = text.toLowerCase()
        .replace(/[^\w\s'-]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 0 && /[a-z]/.test(word));
    
    words.forEach(word => {
        if (!processedWordsInCurrentText.has(word)) {
            processSingleWord(word);
            processedWordsInCurrentText.add(word);
        }
    });
}

function updateDisplay() {
    updateVocabularyBox();
    updateStats();
}

function updateVocabularyBox() {
    const searchTerm = searchWords.value.toLowerCase().trim();
    const sortValue = sortBy.value;
    
    // Filter words
    let filteredWords = Object.entries(vocabulary);
    if (searchTerm) {
        filteredWords = filteredWords.filter(([word]) => word.includes(searchTerm));
    }
    
    // Sort words
    filteredWords.sort((a, b) => {
        const [wordA, dataA] = a;
        const [wordB, dataB] = b;
        
        switch(sortValue) {
            case 'frequency-desc':
                return dataB.count - dataA.count;
            case 'frequency-asc':
                return dataA.count - dataB.count;
            case 'alphabetical':
                return wordA.localeCompare(wordB);
            case 'recent':
                return new Date(dataB.lastUsed) - new Date(dataA.lastUsed);
            default:
                return 0;
        }
    });
    
    // Update stats
    const totalCount = Object.values(vocabulary).reduce((sum, data) => sum + data.count, 0);
    totalWords.textContent = totalCount.toLocaleString();
    uniqueWords.textContent = Object.keys(vocabulary).length.toLocaleString();
    
    // Display words
    if (filteredWords.length === 0) {
        if (searchTerm) {
            vocabularyBox.innerHTML = `<p class="empty-message">No words found matching "${searchTerm}"</p>`;
        } else {
            vocabularyBox.innerHTML = '<p class="empty-message">Start typing to build your vocabulary!</p>';
        }
        return;
    }
    
    vocabularyBox.innerHTML = '';
    filteredWords.forEach(([word, data]) => {
        const wordCard = createWordCard(word, data);
        vocabularyBox.appendChild(wordCard);
    });
}

function createWordCard(word, data) {
    const card = document.createElement('div');
    card.className = 'word-card';
    
    const wordText = document.createElement('div');
    wordText.className = 'word-text';
    wordText.textContent = word;
    
    const wordCount = document.createElement('div');
    wordCount.className = 'word-count';
    wordCount.textContent = `${data.count} ${data.count === 1 ? 'time' : 'times'}`;
    
    const wordMeta = document.createElement('div');
    wordMeta.className = 'word-meta';
    const firstUsed = new Date(data.firstUsed);
    const lastUsed = new Date(data.lastUsed);
    wordMeta.textContent = `First: ${formatDate(firstUsed)} • Last: ${formatDate(lastUsed)}`;
    
    card.appendChild(wordText);
    card.appendChild(wordCount);
    card.appendChild(wordMeta);
    
    return card;
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function clearText() {
    if (confirm('Clear the text box? Your vocabulary will remain saved.')) {
        textInput.value = '';
        processedWordsInCurrentText.clear();
        setLastTextLength(0);
        updateStats('');
    }
}

function clearVocabulary() {
    if (confirm('Are you sure you want to clear all vocabulary data? This cannot be undone.')) {
        vocabulary = {};
        allWords = [];
        saveVocabulary();
        updateDisplay();
        textInput.value = '';
        updateStats('');
    }
}

function saveVocabulary() {
    try {
        localStorage.setItem('vocabulary', JSON.stringify(vocabulary));
        localStorage.setItem('allWords', JSON.stringify(allWords));
    } catch (error) {
        console.error('Error saving vocabulary:', error);
    }
}

function loadVocabulary() {
    try {
        const saved = localStorage.getItem('vocabulary');
        const savedWords = localStorage.getItem('allWords');
        
        if (saved) {
            vocabulary = JSON.parse(saved);
            // Convert date strings back to Date objects
            Object.keys(vocabulary).forEach(word => {
                if (vocabulary[word].firstUsed) {
                    vocabulary[word].firstUsed = new Date(vocabulary[word].firstUsed);
                }
                if (vocabulary[word].lastUsed) {
                    vocabulary[word].lastUsed = new Date(vocabulary[word].lastUsed);
                }
            });
        }
        
        if (savedWords) {
            allWords = JSON.parse(savedWords);
        }
    } catch (error) {
        console.error('Error loading vocabulary:', error);
        vocabulary = {};
        allWords = [];
    }
}

