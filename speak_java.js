// app.js

// List of words for pronunciation practice
const words = ["hello", "world", "practice", "learn", "english", "pronunciation"];
let currentWordIndex = 0;

function startRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';

    recognition.start();

    recognition.onstart = function() {
        console.log('Voice recognition started. Try speaking into the microphone.');
    };

    recognition.onresult = function(event) {
        const spokenWord = event.results[0][0].transcript.toLowerCase();
        checkPronunciation(spokenWord);
    };

    recognition.onerror = function(event) {
        console.error('Error occurred in recognition: ' + event.error);
    };

    recognition.onend = function() {
        console.log('Voice recognition ended.');
    };
}

function checkPronunciation(spokenWord) {
    const targetWord = words[currentWordIndex];
    const feedback = document.getElementById('feedback');

    if (spokenWord === targetWord) {
        feedback.innerHTML = `<span style="color: green;">Correct! You said "${spokenWord}"</span>`;
    } else {
        feedback.innerHTML = `<span style="color: red;">Incorrect. You said "${spokenWord}". Try again!</span>`;
    }
}

// Optionally, add functionality to cycle through words
function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    document.getElementById('word').innerText = words[currentWordIndex];
}
