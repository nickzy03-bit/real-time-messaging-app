// 1. Your Firebase config
const firebaseConfig = {
    apiKey: "YOUR KEY",
    authDomain: "YOUR DOMAIN",
    databaseURL: "YOUR DATABASE URL",
    projectId: "YOUR PROJECT ID",
    storageBucket: "YOUR STORAGE BUCKET",
    messagingSenderId: "YOUR ID",
    appId: "YOUR APP ID"
};

// 2. Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

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
