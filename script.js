// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA1U8sgAzawiseWeOQ-OjkglaqWzpBJYLQ",
  authDomain: "simple-messaging-app-3c49a.firebaseapp.com",
  projectId: "simple-messaging-app-3c49a",
  storageBucket: "simple-messaging-app-3c49a.firebasestorage.app",
  messagingSenderId: "389788910414",
  appId: "1:389788910414:web:a90f0081325f629745d41f"
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 🔹 Send message function
function sendMessage() {
  const username = document.getElementById("username").value;
  const message = document.getElementById("messageInput").value;

  if (username && message) {
    push(ref(db, "messages"), {
      username,
      message,
      timestamp: Date.now()
    });

    document.getElementById("messageInput").value = ""; // clear input
  }
}

// 🔹 Listen for new messages
const messagesRef = ref(db, "messages");
onChildAdded(messagesRef, (snapshot) => {
  const data = snapshot.val();
  const msgDiv = document.createElement("div");
  msgDiv.textContent = `${data.username}: ${data.message}`;
  document.getElementById("messages").appendChild(msgDiv);
});

// 🔹 Attach event listener to button
document.getElementById("sendBtn").addEventListener("click", sendMessage);
