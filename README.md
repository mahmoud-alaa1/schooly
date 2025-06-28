# 📚 Schooly

**AI-powered online classroom platform** for Future Generation School (New Sohag City), enabling teachers and students to connect seamlessly through virtual classrooms, real-time video, and AI-enhanced attendance tracking.

---

## 🏫 Classroom
![image](https://github.com/user-attachments/assets/07ee49e2-33c8-4b6c-ab79-969a21ca4f85)

## 📺 Video Call App
![image](https://github.com/user-attachments/assets/9a163a3f-e1e5-46e9-88f0-bd04cfbd966d)

---

## 🌟 Features

- 👥 **User Roles**: Student & Teacher registration and authentication (email/password + Google OAuth).
- 🕵️‍♂️ **AI Attendance**: Facial recognition for real-time tracking.
- 📢 **Announcements & Assignments**: Teachers can post and manage class-specific content.
- 💬 **Interactive Comments**: Students can comment/edit on posts.
- 📹 **Live Sessions**: WebRTC-powered video calls.
- 🔄 **Real-time Updates**: Powered by Socket.io.
- 📊 **Class Dashboard**: Instant overview of attendance & active sessions.

---

## 🛠 Built With

- **Frontend**: Next.js (App Router), TypeScript  
- **Styling**: Tailwind CSS, Shadcn UI  
- **State Management**: Zustand  
- **Real-time & Video**: Socket.io, WebRTC  
- **Backend & Auth**: .NET Backend  
- **AI/ML**: Custom face recognition logic deployed on backend server

---

## 🚀 Getting Started

### Prerequisites

- Node.js >=14  
- pnpm  

### Setup

```bash
git clone https://github.com/yourusername/schooly.git
cd schooly
pnpm i        
cp .env 
# Add API, agora keys
pnpm dev
