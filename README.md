# Cine Match

Cine Match is an AI-powered movie recommendation web application that uses advanced NLP algorithms (BM25, TF-IDF, Bag of Words, and BERT) to suggest movies based on your input. The project is split into a React frontend and a Node.js/Express backend.

---

## Features
- Modern React frontend with Tailwind CSS
- Express.js backend with modular controllers, routes, and middlewares
- Multiple NLP-based recommendation algorithms (BM25, TF-IDF, Bag of Words, BERT)
- OMDb API integration for movie posters and IMDb links
- Ready for deployment on Vercel

---

## Folder Structure
```
Cine-Match-main/
├── backend/
│   ├── controllers/
│   ├── data/
│   ├── middlewares/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── vercel.json
└── frontend/
    ├── public/
    ├── src/
    ├── .env
    ├── package.json
    └── ...
```

---

## Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/apraneeth20/Cine_Match_NLP.git
cd Cine_Match_NLP
```

### 2. Backend Setup
```sh
cd backend
npm install
```

- Create a `.env` file in the `backend` folder:
  ```env
  OMDB_API_KEY=your_omdb_api_key
  ```
- (Optional) Edit `vercel.json` if you change the entry point or folder structure.

#### Run Backend Locally
```sh
node server.js
# or
npm start
```

### 3. Frontend Setup
```sh
cd ../frontend
npm install
```

- Create a `.env` file in the `frontend` folder:
  ```env
  VITE_API_BASE_URL=http://localhost:3001/api
  ```
  - For production, set this to your deployed backend URL (e.g. `https://cine-match-nlp.vercel.app/api`)

#### Run Frontend Locally
```sh
npm run dev
```

---

## Deployment

### Deploy Backend to Vercel
- Push your code to GitHub.
- Connect the `backend` folder as a project in Vercel.
- Set the `OMDB_API_KEY` environment variable in Vercel dashboard.
- Deploy!

### Deploy Frontend to Vercel/Netlify
- Push your code to GitHub.
- Connect the `frontend` folder as a project in Vercel or Netlify.
- Set the `VITE_API_BASE_URL` environment variable to your backend’s deployed URL.
- Deploy!

---

## Algorithms Used
- **BM25**: Probabilistic information retrieval model
- **TF-IDF**: Term Frequency-Inverse Document Frequency
- **Bag of Words**: Jaccard similarity
- **BERT**: (Mocked) Embedding-based similarity (for demo; real BERT requires Python/ONNX)

---

## Authors
- Attunuri Praneeth Reddy



---


