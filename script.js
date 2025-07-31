let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
  let text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.pitch = 1;
  text_speak.volume = 1;
  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  let day = new Date();
  let hours = day.getHours();
  if (hours >= 0 && hours < 12) {
    speak("Good Morning Sir");
  } else if (hours >= 12 && hours < 16) {
    speak("Good Afternoon Sir");
  } else {
    speak("Good Evening Sir");
  }
}

window.addEventListener("load", () => {
  wishMe();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = "en-IN"; 
recognition.onresult = (event) => {
  let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

recognition.onerror = (event) => {
  console.error("Speech recognition error:", event.error);
  speak("Sorry, I couldn't understand. Please try again.");
};

btn.addEventListener("click", () => {
  window.speechSynthesis.cancel(); 
  console.log("Starting speech recognition...");
  recognition.start();
  btn.style.display = "none";
  voice.style.display = "block";
});

function takeCommand(message) {
  btn.style.display = "block"; 
  voice.style.display = "none";
  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello sir, what can I help you with?");
  } else if (message.includes("who are you")) {
    speak("I am Drone, a virtual assistant created by Yashasvi Sakshi");
  } else if (message.includes("how are you")) {
    speak("I am fine, what about you?");
  } else if (message.includes("tell")) {
    speak("Jai Shree Ram");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube");
    window.open("https://www.youtube.com/", "_blank");
  } else if (message.includes("open google")) {
    speak("Opening Google");
    window.open("https://www.google.com/", "_blank");
  } else if (message.includes("open instagram")) {
    speak("Opening Instagram");
    window.open("https://www.instagram.com/", "_blank");
  } else if (message.includes("open linkedin")) { 
    speak("Opening LinkedIn");
    window.open("https://www.linkedin.com/", "_blank"); 
  } else if (message.includes("open github")) {
    speak("Opening GitHub");
    window.open("https://www.github.com/", "_blank");
  } else if (message.includes("open twitter")) {
    speak("Opening Twitter");
    window.open("https://www.x.com/", "_blank"); 
  } else if (message.includes("open spotify")) {
    speak("Opening Spotify");
    window.open("https://www.spotify.com/", "_blank");
  } else {
    speak(`Searching the web for ${message}`);
    window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
  }
}