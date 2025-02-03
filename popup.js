const listenButton = document.getElementById('listenButton');
const statusText = document.getElementById('status');
let isListening = false;
let recognition;

// Initialize Web Speech API
if ('webkitSpeechRecognition' in window) {
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    statusText.textContent = `Heard: "${command}"`;
    
    // Send the command to the content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (command) => {
          window.postMessage({ type: 'VOICE_COMMAND', command }, '*');
        },
        args: [command]
      });
    });
  };

  recognition.onerror = () => {
    statusText.textContent = 'Error listening.';
    isListening = false;
  };
}

// Toggle listening
listenButton.addEventListener('click', () => {
  if (!isListening) {
    recognition.start();
    statusText.textContent = 'Status: Listening...';
    listenButton.textContent = 'Stop Listening';
  } else {
    recognition.stop();
    statusText.textContent = 'Status: Idle';
    listenButton.textContent = 'Start Listening';
  }
  isListening = !isListening;
});