// Import Firebase functions
import { initializeApp } from "firebase/app";
import { 
    getDatabase, 
    ref, 
    push, 
    onChildAdded 
} from "firebase/database";

// Firebase config
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
const db = getDatabase(app);

// Page elements
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const usernameInput = document.getElementById("username");

// Send message
function sendMessage() {
    const text = messageInput.value.trim();
    const user = usernameInput.value.trim() || "Anonymous";

    if (text === "") return;

    push(ref(db, "messages"), {
        user: user,
        text: text,
        time: Date.now()
    });

    messageInput.value = "";
}

// Listen for new messages
onChildAdded(ref(db, "messages"), snapshot => {
    const msg = snapshot.val();

    const div = document.createElement("div");
    div.className = "message";
    div.textContent = `[${msg.user}] ${msg.text}`;

    messagesDiv.appendChild(div);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
