# 📚 Schooly

**AI-powered online classroom platform** for Future Generation School (New Sohag City), enabling teachers and students to connect seamlessly through virtual classrooms, real-time video, and AI-enhanced attendance tracking.

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
- **Backend & Auth**: Supabase Auth  
- **AI/ML**: Custom face recognition logic

---

## 🚀 Getting Started

### Prerequisites

- Node.js >=14  
- npm أو yarn  
- حساب على Supabase (لـ Auth و DB)  

### Setup

```bash
git clone https://github.com/yourusername/schooly.git
cd schooly
npm install        # or yarn
cp .env.example .env.local
# اضف مفاتيح Supabase وبيانات AI
npm run dev
