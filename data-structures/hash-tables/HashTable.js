class HashTable {
  constructor() {
    this.table = [];
  }

  loseLoseHashCode(key) {
    let hash = 0;

    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }

    return hash % 37;
  }

  put(key, value) {
    this.table[this.loseLoseHashCode(key)] = value;
  }

  get(key) {
    return this.table[this.loseLoseHashCode(key)];
  }

  remove(key) {
    this.table[this.loseLoseHashCode(key)] = undefined;
  }
}

module.exports = HashTable;

