### 📩 Connectly – Real-Time Chat Application

A full-stack real-time chat application built using the MERN stack with WebSockets (Socket.IO) and Clerk authentication, supporting private and group chats with persistent message storage.

### 🚀 Features

* User authentication using Clerk
* Real-time messaging using Socket.IO
* Private & group chats
* Message persistence (MongoDB)
* Responsive UI
* Live updates without page refresh

### 🛠 Tech Stack
### Frontend
- React.js
- Vite
- Clerk Authentication
- Axios
- Socket.IO 

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.IO
- Clerk SDK

### ⚙️ Prerequisites

Make sure you have the following installed:

* Node.js v18+
* npm v9+
* MongoDB Atlas account
* Clerk account

### 🔧 Environment Variables
### Backend (server/.env)
- PORT=5000
- MONGO_URI=your_mongodb_connection_string
- CLERK_SECRET_KEY=your_clerk_secret_key

### Frontend (client/.env)
- VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

### ▶️ How to Run the Project Locally
### 1️. Clone the Repository

git clone https://github.com/your-username/connectly.git </br>
cd connectly

### 2️. Setup Backend

cd server </br>
npm install </br>
npm start </br>


Backend will run on:

 - http://localhost:5000

### 3️. Setup Frontend
cd client </br>
npm install </br> 
npm run dev </br>


Frontend will run on:

- http://localhost:5173


### 📸 Screenshots
<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/a8232e73-cbc1-44a6-9913-c52e6fb6ff81" /> </br>

<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/70f6e17b-5368-42eb-a018-89454e98e38f" /> </br>

<img width="1920" height="1200" alt="image" src="https://github.com/user-attachments/assets/bedb73b7-f183-4b73-9bd4-337e23977955" /> </br>


### 🧪 Testing Checklist

* User can log in using Clerk
* Chats load correctly
* Messages appear in real time
* Messages persist after refresh
* Works on different screen sizes

### 📌 Real-World Relevance

Inspired by:

* Slack
* WhatsApp
* Microsoft Teams

### 👩‍💻 Author

Sakshi Shrivastava  </br>
Final Year CSE Student  </br>
Aspiring Full-Stack Developer
