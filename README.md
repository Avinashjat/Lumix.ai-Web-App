# LUMIX – AI Powered API Utility Platform

LUMIX is a full-stack AI-powered content and image generation platform built using the MERN stack. The platform integrates multiple AI APIs to provide intelligent tools for content creation, creativity, and productivity.

Users can generate articles, create blog titles, review resumes using AI feedback, interact with an AI assistant, and generate images in different artistic styles. The platform also allows users to publish generated images publicly so other users can view and like them.

The system includes authentication, a personal dashboard, and a subscription model with free and premium plans.

---

## Features

### AI Content Generation
- Generate full-length articles with customizable length options
- Generate blog titles based on selected categories
- AI-powered resume review with suggestions and feedback

### AI Chat Assistant
- Real-time AI chat powered by Gemini API
- Ask questions, generate ideas, or get writing help
- Interactive chat experience

### AI Image Generation
- Generate images from prompts
- Multiple styles supported:
  - Anime
  - Realistic
  - Fantasy
  - Digital Art
  ��� Concept Art

### AI Image Editing Tools
- Background removal using Cloudinary
- Object removal using Cloudinary AI tools

### Public Image Gallery
- Users can publish generated images publicly
- Other users can browse and like images

### User Dashboard
- Displays recent creations
- Shows usage statistics
- Manage generated content

### Authentication
- Secure user authentication using Clerk
- Protected routes and account management

### Subscription System
**Free Plan**
- Limited access to AI tools

**Premium Plan**
- Access to all AI tools
- Higher usage limits

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- Clerk Authentication

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### AI & Cloud APIs
- Gemini API (Content generation & AI chat)
- ClipDrop API (Image generation)
- Cloudinary API (Background removal & object removal)

---

## Project Structure

```
LUMIX
│
├── client
│   ├── components
│   ├── pages
│   ├── assets
│   └── services
│
├── server
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── middleware
│   └── config
│
└── README.md
```

---

## Installation

### 1 Clone the Repository

```bash
git clone https://github.com/yourusername/lumix.git
cd lumix
```

### 2 Install Dependencies

Frontend

```bash
cd client
npm install
```

Backend

```bash
cd server
npm install
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

Example:

```
PORT=5000

MONGO_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_gemini_api_key

CLIPDROP_API_KEY=your_clipdrop_api_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

CLERK_SECRET_KEY=your_clerk_secret_key
```

---

## Running the Application

Start the backend server

```bash
cd server
npm run dev
```

Start the frontend

```bash
cd client
npm run dev
```

Application will run on:

```
http://localhost:5173
```

---

## Core Modules

- AI Article Generator
- Blog Title Generator
- Resume Review AI
- AI Chat Assistant
- AI Image Generator
- Background Removal Tool
- Object Removal Tool
- Public Image Gallery
- User Dashboard
- Subscription System

---

## Future Improvements

- AI video generation
- Prompt template library
- Social sharing for generated content
- Advanced creator analytics
- More AI image editing tools

---

## Author

**Avinash Jat**

Full Stack Developer  
MERN Stack | AI Integration | Web Applications
