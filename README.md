# 📌 AI-Powered Document Management System with Fraud Detection

An intelligent document management system that processes financial documents, extracts key information using **OCR**, enables **AI-based tagging**, provides **semantic search**, performs **document relationship mapping**, and includes **fraud detection alerts**. 

![Project Preview](https://i.postimg.cc/QtmV0Qq0/image.png)

---

## 🚀 Features

✅ **Secure Document Upload** – Upload financial documents via Firebase Storage.  
✅ **OCR Processing** – Extracts text from images and PDFs.  
✅ **AI-Based Tagging** – Identifies people, organizations, dates, and keywords.  
✅ **Semantic Search** – Uses **Vertex AI** embeddings for AI-powered search.  
✅ **Document Relationship Mapping** – Uses **Neo4j** to detect linked documents.  
✅ **Fraud Detection** – Flags suspicious invoices and irregularities.  
✅ **Real-time Updates** – Fetches stored documents and alerts from **Firebase Firestore**.  

---

## 🛠️ Tech Stack

### **Frontend (React + Firebase)**
- **React.js** (UI framework)
- **Firebase Storage** (File storage)
- **Firebase Firestore** (Database)
- **TailwindCSS** (Styling)
- **React Router** (Navigation)
- **Sonner** (Toast notifications for fraud alerts)

### **Backend (FastAPI + Google Vertex AI)**
- **FastAPI** (API framework)
- **Google Vertex AI** (Embeddings for semantic search)
- **Google Cloud Vision API** (OCR processing)
- **Google Cloud Natural Language API** (Tagging & metadata extraction)
- **Neo4j** (Document relationship mapping)
- **Firebase Admin SDK** (Firestore access)

---


---

## 🛠️ Installation & Setup

### 🔹 Backend Setup (FastAPI)

- Add your GCP service account config 

1️⃣ **Clone the repository**
```bash
git clone https://github.com/yourusername/yourproject.git
cd findocs-server
python3 -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### 🔹 Frontend Setup (ReactJS)
```bash
cd ../findocs-client
npm install
npm run dev
```
- Add your Firebase config in src/lib/firebase.js

