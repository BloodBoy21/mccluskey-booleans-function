function parseMinterms(minterms) {
  const mintermsAsc = minterms.sort((a, b) => a - b).map(Number);
  const maxMinter = mintermsAsc.at(-1);
  return parseToBinary(mintermsAsc, { max: maxMinter.toString(2).length });
}

function parseToBinary(minterms, { max } = {}) {
  return minterms.map((minterm) => {
    let bits = minterm.toString(2);
    if (bits.length < max) {
      bits = "0".repeat(max - bits.length) + bits;
    }
    return parseStringToArray(bits);
  });
}

function parseStringToArray(str) {
  const bits = [];
  for (let i = 0; i < str.length; i++) {
    bits.push(parseInt(str[i]));
  }
  return bits;
}

console.log(parseMinterms([1, 10, 4]));
