// Bag_of_Words.js
// Simple Bag of Words similarity (Jaccard index)

class BagOfWords {
  constructor() {
    this.documents = [];
    this.corpusSize = 0;
  }

  addDocuments(documents) {
    this.documents = documents;
    this.corpusSize = documents.length;
    this.docSets = documents.map(doc => new Set(doc));
  }

  // Returns Jaccard similarity scores for the query against all documents
  getScores(query) {
    const querySet = new Set(query);
    return this.docSets.map(docSet => {
      const intersection = new Set([...docSet].filter(x => querySet.has(x)));
      const union = new Set([...docSet, ...querySet]);
      return union.size ? intersection.size / union.size : 0;
    });
  }
}

module.exports = BagOfWords;
