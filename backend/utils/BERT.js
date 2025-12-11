// BERT.js (Node.js placeholder for BERT-based similarity)
// In production, use a Python microservice or ONNX model for real BERT embeddings.

function cosineSimilarity(vecA, vecB) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  return normA && normB ? dot / (Math.sqrt(normA) * Math.sqrt(normB)) : 0;
}

// Simple word vectorizer (not real BERT, just for demo)
function vectorize(tokens, vocab) {
  const vec = Array(vocab.length).fill(0);
  tokens.forEach(token => {
    const idx = vocab.indexOf(token);
    if (idx !== -1) vec[idx] += 1;
  });
  return vec;
}

class BERT {
  constructor() {
    this.documents = [];
    this.corpusSize = 0;
    this.vocab = [];
    this.docVecs = [];
  }

  addDocuments(documents) {
    this.documents = documents;
    this.corpusSize = documents.length;
    // Build vocabulary
    const vocabSet = new Set();
    documents.forEach(doc => doc.forEach(token => vocabSet.add(token)));
    this.vocab = Array.from(vocabSet);
    // Vectorize all documents
    this.docVecs = documents.map(doc => vectorize(doc, this.vocab));
  }

  getScores(query) {
    const queryVec = vectorize(query, this.vocab);
    return this.docVecs.map(docVec => cosineSimilarity(queryVec, docVec));
  }
}

module.exports = BERT;
