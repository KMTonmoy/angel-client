# Angel AI

A full-stack AI chatbot that answers questions from your own PDF documents using Retrieval-Augmented Generation (RAG). It includes secure authentication, streaming responses, saved conversations, and source citations.

[Live Demo](#) | [Demo Video](#) | [Report an Issue](#)

> Replace the `#` links above with your deployed URL, demo video, and GitHub issues page.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Database Models](#database-models)
- [Deployment](#deployment)
- [Security](#security)
- [Roadmap](#roadmap)
- [Known Limitations](#known-limitations)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

Angel AI lets users upload PDF documents and hold a conversation with them. Instead of relying only on a language model's general knowledge, the application retrieves the most relevant passages from the user's documents and uses them to generate accurate, grounded answers with citations.

The project demonstrates end-to-end full-stack development, including authentication, real-time streaming, vector search, and cloud deployment.

## Features

**Core**
- User registration and login with JWT stored in httpOnly cookies
- Real-time streaming AI responses
- Multiple saved conversations with full history
- Customizable system prompt for a specific niche or persona

**Document Intelligence (RAG)**
- PDF upload and text extraction
- Automatic chunking and embedding generation
- Vector similarity search using MongoDB Atlas Vector Search
- Source citations showing which part of a document supported each answer

**User Experience**
- Responsive interface for desktop and mobile
- Dark and light themes
- Markdown and code rendering in messages
- Copy and regenerate message actions
- Smooth animations with Framer Motion

**Quality and Safety**
- Rate limiting on authentication and chat routes
- Request validation with Zod
- File type and size restrictions
- Centralized error handling

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Axios |
| Backend | Node.js, Express.js, JavaScript, CORS |
| Database | MongoDB Atlas, Mongoose, Atlas Vector Search |
| AI | Google Gemini API (LLM and embeddings) |
| Authentication | JWT, bcrypt, httpOnly cookies |
| Utilities | Multer, pdf-parse, express-rate-limit, Helmet, Zod |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

## Architecture

```
Next.js Client (Vercel)
        |
        v
Express API (Render) -----> Gemini API
        |
        v
MongoDB Atlas
(users, chats, messages, document chunks and vectors)
```

**RAG pipeline**

1. The user uploads a PDF.
2. The server extracts the text and splits it into overlapping chunks.
3. Each chunk is converted into an embedding using the Gemini embeddings model.
4. Chunks and embeddings are stored in MongoDB.
5. When a question is asked, it is embedded and compared against stored chunks using vector search.
6. The top matching chunks are sent to the language model together with the question and system prompt.
7. The answer is streamed back to the client with source references.

## Project Structure

```
Angel-ai/
├── client/                     # Next.js frontend
│   ├── app/
│   │   ├── (auth)/             # login and register pages
│   │   ├── chat/[id]/          # chat page
│   │   ├── dashboard/
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── chat/               # ChatWindow, MessageBubble, ChatInput, Sidebar
│   │   └── shared/
│   ├── hooks/                  # useChat, useAuth
│   ├── lib/                    # api.ts (Axios instance), utils.ts
│   └── types/
│
├── server/                     # Express backend
│   ├── src/
│   │   ├── config/             # database and environment setup
│   │   ├── models/             # User, Chat, Message, Document, Chunk
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── middleware/         # auth, rate limit, upload, error handler
│   │   ├── services/           # gemini, embeddings, rag, pdf parser
│   │   ├── utils/
│   │   └── app.js
│   └── server.js
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- A MongoDB Atlas account (free tier is sufficient)
- A Google Gemini API key from Google AI Studio

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Angel-ai.git
cd Angel-ai
```

### 2. Set up the backend

```bash
cd server
npm install
cp .env.example .env
# Fill in the values in .env
npm run dev
```

The API runs on `http://localhost:5000` by default.

### 3. Set up the frontend

```bash
cd client
npm install
cp .env.example .env.local
# Fill in the values in .env.local
npm run dev
```

The application runs on `http://localhost:3000`.

### 4. Create the vector search index

In MongoDB Atlas, create a Vector Search index on the `chunks` collection:

```json
{
  "fields": [
    {
      "type": "vector",
      "path": "embedding",
      "numDimensions": 768,
      "similarity": "cosine"
    }
  ]
}
```

Set `numDimensions` to match the embedding model you use.

## Environment Variables

**Server (`server/.env`)**

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key
```

**Client (`client/.env.local`)**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> Never commit `.env` files. API keys must stay on the server only.

## API Reference

Base URL: `/api`

**Authentication**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Create a new account |
| POST | `/auth/login` | Log in and receive a session cookie |
| POST | `/auth/logout` | Clear the session cookie |
| GET | `/auth/me` | Get the current user |

**Chats**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/chats` | Create a new chat |
| GET | `/chats` | List the user's chats |
| GET | `/chats/:id/messages` | Get messages in a chat |
| POST | `/chats/:id/messages` | Send a message and stream the reply |
| DELETE | `/chats/:id` | Delete a chat |

**Documents**

| Method | Endpoint | Description |
|---|---|---|
| POST | `/documents` | Upload and process a PDF |
| GET | `/documents` | List the user's documents |
| DELETE | `/documents/:id` | Delete a document and its chunks |

## Database Models

| Model | Fields |
|---|---|
| User | name, email, password (hashed), role, createdAt |
| Chat | userId, title, documentId (optional), createdAt |
| Message | chatId, role (`user` or `assistant`), content, sources, createdAt |
| Document | userId, fileName, status, createdAt |
| Chunk | documentId, text, embedding, pageNumber |

## Deployment

**Backend (Render)**
1. Create a new Web Service from the `server` directory.
2. Set the build command to `npm install` and the start command to `node server.js`.
3. Add all server environment variables, setting `CLIENT_URL` to your Vercel URL.

**Frontend (Vercel)**
1. Import the repository and set the root directory to `client`.
2. Add `NEXT_PUBLIC_API_URL` pointing to your Render backend URL followed by `/api`.

**Production cookie and CORS settings**

```js
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

res.cookie("token", jwt, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
```

## Security

- Passwords are hashed with bcrypt.
- Sessions use JWT in httpOnly cookies to reduce XSS exposure.
- Helmet sets secure HTTP headers.
- CORS is restricted to the configured client origin.
- Rate limiting protects authentication and chat endpoints.
- Inputs are validated with Zod, and uploads are limited by type and size.
- Secrets are stored in environment variables only.

## Roadmap

- [ ] Support for DOCX and TXT uploads
- [ ] Voice input and voice output
- [ ] Admin dashboard with usage analytics
- [ ] Web search tool integration
- [ ] Automated test coverage for all endpoints
- [ ] Docker setup for local development

## Known Limitations

- The backend is hosted on Render's free tier, so the first request after inactivity may take up to a minute.
- The Gemini free tier has rate limits, which may cause temporary slowdowns under heavy use.
- Scanned PDFs without selectable text are not supported.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m "Add your feature"`.
4. Push the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Author

**Your Name**
Full-Stack Web Developer

- Portfolio: [your-portfolio.com](#)
- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [your-profile](#)
- Email: your.email@example.com
