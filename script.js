// Import Firebase functions from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Firebase config (with databaseURL + corrected storageBucket)
const firebaseConfig = {
  apiKey: "AIzaSyA1U8sgAzawiseWeOQ-OjkglaqWzpBJYLQ",
  authDomain: "simple-messaging-app-3c49a.firebaseapp.com",
  databaseURL: "https://simple-messaging-app-3c49a-default-rtdb.firebaseio.com",
  projectId: "simple-messaging-app-3c49a",
  storageBucket: "simple-messaging-app-3c49a.appspot.com",
  messagingSenderId: "389788910414",
  appId: "1:389788910414:web:a90f0081325f629745d41f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Page elements
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const usernameInput = document.getElementById("username");
const sendButton = document.getElementById("sendBtn"); // safer

// Send message
function sendMessage() {
  const text = messageInput.value.trim();
  const user = usernameInput.value.trim() || "Anonymous";

  if (!text) return;

  push(ref(db, "messages"), {
    user,
    text,
    time: Date.now()
  });

  messageInput.value = "";
}

// Attach event listener
sendButton.addEventListener("click", sendMessage);

// Listen for new messages
onChildAdded(ref(db, "messages"), snapshot => {
  const msg = snapshot.val();

  const div = document.createElement("div");
  div.className = "message";
  div.textContent = `[${msg.user}] ${msg.text}`;

  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
