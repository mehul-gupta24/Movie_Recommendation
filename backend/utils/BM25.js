class BM25 {
  constructor() {
    this.k1 = 1.5;
    this.b = 0.75;
    this.documents = [];
    this.avgdl = 0;
    this.docFreqs = {};
    this.idf = {};
    this.docLen = [];
    this.corpusSize = 0;
  }

  addDocuments(documents) {
    this.documents = documents;
    this.corpusSize = documents.length;
    this.docLen = documents.map(doc => doc.length);
    
    // Calculate average document length
    const totalDocLen = this.docLen.reduce((a, b) => a + b, 0);
    this.avgdl = totalDocLen / this.corpusSize;
    
    // Calculate document frequencies
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
    
    // Calculate IDF values
    Object.keys(this.docFreqs).forEach(term => {
      const df = this.docFreqs[term];
      this.idf[term] = Math.log(1 + (this.corpusSize - df + 0.5) / (df + 0.5));
    });
  }

  getScores(query) {
    const scores = new Array(this.corpusSize).fill(0);
    
    query.forEach(term => {
      if (!this.idf[term]) return;
      const idf = this.idf[term];
      
      for (let i = 0; i < this.corpusSize; i++) {
        const doc = this.documents[i];
        const termFreq = doc.filter(t => t === term).length;
        
        if (termFreq > 0) {
          const numerator = idf * termFreq * (this.k1 + 1);
          const denominator = termFreq + this.k1 * (1 - this.b + this.b * (this.docLen[i] / this.avgdl));
          scores[i] += numerator / denominator;
        }
      }
    });
    
    return scores;
  }
}

module.exports = BM25;
