class Key {
  getKey() {
    const key = "abcdef01234567890";
    let result = "";
    const lengthNumber = 8;
    for (let i = 0; i < lengthNumber; i += 1) {
      result += key[Math.floor(Math.random() * key.length)];
    }
    return result;
  }
}
export default Key;
