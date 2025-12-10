// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1U8sgAzawiseWeOQ-OjkglaqWzpBJYLQ",
  authDomain: "simple-messaging-app-3c49a.firebaseapp.com",
  projectId: "simple-messaging-app-3c49a",
  storageBucket: "simple-messaging-app-3c49a.firebasestorage.app",
  messagingSenderId: "389788910414",
  appId: "1:389788910414:web:a90f0081325f629745d41f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 2. Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const db = firebase.database();

// 3. Get page elements
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const usernameInput = document.getElementById("username");

// 4. Send a message
function sendMessage() {
    const text = messageInput.value.trim();
    const user = usernameInput.value.trim() || "Anonymous";

    if (text === "") return;

    // Push to Firebase database under "messages"
    db.ref("messages").push({
        user: user,
        text: text,
        time: Date.now()
    });

    messageInput.value = "";
}

// 5. Listen for new messages
db.ref("messages").on("child_added", snapshot => {
    const msg = snapshot.val();

    const div = document.createElement("div");
    div.className = "message";
    div.textContent = `[${msg.user}] ${msg.text}`;

    messagesDiv.appendChild(div);

    // Auto scroll
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
