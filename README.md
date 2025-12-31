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
<img width="1600" height="845" alt="image" src="https://github.com/user-attachments/assets/10049a73-81c9-4f17-8d11-bfc8b24d8659" /> </br>

<img width="1597" height="851" alt="image" src="https://github.com/user-attachments/assets/e2120407-7b2e-40c2-9d2c-4da5eb82305e" /> </br>

<img width="1600" height="851" alt="image" src="https://github.com/user-attachments/assets/273d5919-b64c-4598-b68d-48a7459f2399" /> </br>

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
