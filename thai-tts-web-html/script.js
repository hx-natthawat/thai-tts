let speechSynth = window.speechSynthesis;
let currentUtterance = null;
let typingTimer; // Timer identifier
const doneTypingInterval = 3000; // Time in ms (3 seconds)

// Add event listeners for the text input
document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const indicator = document.getElementById('auto-speak-indicator');
    
    // On keyup, start the countdown
    textInput.addEventListener('keyup', function() {
        clearTimeout(typingTimer);
        if (this.value) {
            indicator.classList.add('show');
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
        } else {
            indicator.classList.remove('show');
        }
    });

    // On keydown, clear the countdown
    textInput.addEventListener('keydown', function() {
        clearTimeout(typingTimer);
        indicator.classList.remove('show');
    });
});

// User is done typing, trigger speech
function doneTyping() {
    const indicator = document.getElementById('auto-speak-indicator');
    indicator.classList.remove('show');
    speak();
}

function speak() {
    // Stop any ongoing speech
    stop();

    const text = document.getElementById('text-input').value;
    if (text.trim() === '') return;

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language to Thai
    utterance.lang = 'th-TH';
    
    // Get all voices
    const voices = speechSynth.getVoices();
    
    // Set voice based on selection
    const voiceSelect = document.getElementById('voice-select').value;
    
    // Find Thai voices
    const thaiVoices = voices.filter(voice => voice.lang.includes('th'));
    
    if (thaiVoices.length > 0) {
        // If there are Thai voices available, use them
        if (voiceSelect === 'female') {
            utterance.voice = thaiVoices.find(voice => !voice.name.toLowerCase().includes('male')) || thaiVoices[0];
        } else {
            utterance.voice = thaiVoices.find(voice => voice.name.toLowerCase().includes('male')) || thaiVoices[0];
        }
    }

    // Adjust pitch and rate based on voice type
    if (voiceSelect === 'male') {
        utterance.pitch = 0.8;
        utterance.rate = 0.9;
    } else {
        utterance.pitch = 1.2;
        utterance.rate = 1.0;
    }

    currentUtterance = utterance;
    speechSynth.speak(utterance);
}

function pause() {
    speechSynth.pause();
}

function resume() {
    speechSynth.resume();
}

function stop() {
    speechSynth.cancel();
    currentUtterance = null;
}

function useExample(element) {
    const textInput = document.getElementById('text-input');
    textInput.value = element.textContent.replace('ตัวอย่าง: ', '');
    // Trigger speech after using example
    speak();
}

// Initialize voices
function initVoices() {
    speechSynth.getVoices();
}

// Initialize voices when they're loaded
speechSynthesis.onvoiceschanged = initVoices;
initVoices();
