// TF_IDF.js
// Simple TF-IDF implementation for document similarity

class TF_IDF {
  constructor() {
    this.documents = [];
    this.termFreqs = [];
    this.docFreqs = {};
    this.idf = {};
    this.corpusSize = 0;
  }

  addDocuments(documents) {
    this.documents = documents;
    this.corpusSize = documents.length;
    this.termFreqs = documents.map(doc => {
      const tf = {};
      doc.forEach(term => {
        tf[term] = (tf[term] || 0) + 1;
      });
      return tf;
    });
    this.docFreqs = {};
    documents.forEach(doc => {
      const seen = new Set();
      doc.forEach(term => {
        if (!seen.has(term)) {
          seen.add(term);
          this.docFreqs[term] = (this.docFreqs[term] || 0) + 1;
        }
      });
    });
    this.idf = {};
    Object.keys(this.docFreqs).forEach(term => {
      this.idf[term] = Math.log(this.corpusSize / (1 + this.docFreqs[term]));
    });
  }

  // Returns cosine similarity scores for the query against all documents
  getScores(query) {
    // Compute query tf
    const queryTf = {};
    query.forEach(term => {
      queryTf[term] = (queryTf[term] || 0) + 1;
    });
    // Compute query tf-idf vector
    const queryVec = {};
    Object.keys(queryTf).forEach(term => {
      queryVec[term] = (queryTf[term] || 0) * (this.idf[term] || 0);
    });
    // Compute cosine similarity for each document
    return this.termFreqs.map((tf, idx) => {
      // Doc tf-idf vector
      const docVec = {};
      Object.keys(tf).forEach(term => {
        docVec[term] = (tf[term] || 0) * (this.idf[term] || 0);
      });
      // Cosine similarity
      const allTerms = new Set([...Object.keys(queryVec), ...Object.keys(docVec)]);
      let dot = 0, qNorm = 0, dNorm = 0;
      allTerms.forEach(term => {
        const q = queryVec[term] || 0;
        const d = docVec[term] || 0;
        dot += q * d;
        qNorm += q * q;
        dNorm += d * d;
      });
      return qNorm && dNorm ? dot / (Math.sqrt(qNorm) * Math.sqrt(dNorm)) : 0;
    });
  }
}

module.exports = TF_IDF;
