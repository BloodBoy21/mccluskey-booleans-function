const cache = require('../cache')
const { isArray } = require('lodash')
async function parseMinterms(minterms) {
  const mintermsAsc = minterms.sort((a, b) => a - b).map(Number)
  const maxMinter = mintermsAsc.at(-1)
  return await parseToBinary(mintermsAsc, { max: maxMinter.toString(2).length })
}
async function parseToBinary(minterms, { max } = {}) {
  const promises = minterms.map(async (minterm) => {
    const onCache = await cache.get(minterm)
    if (onCache) return normalizeByte(onCache, max)
    const bits = minterm.toString(2)
    return new Promise((resolve) => {
      const byte = normalizeByte(parseStringToArray(bits), max)
      cache.set(minterm, byte)
      resolve(byte)
    })
  })
  return Promise.all(promises)
}

function normalizeByte(bits, max) {
  let bitsStr = isArray(bits) ? bits.join('') : bits.replace(/[,\s]/g, '')
  if (bitsStr.length < max) {
    bitsStr = '0'.repeat(max - bitsStr.length) + bitsStr
  } else if (bitsStr.length > max) {
    bitsStr = bitsStr.slice(bitsStr.length - max)
  }
  return parseStringToArray(bitsStr)
}

function parseStringToArray(str) {
  const bits = []
  for (let i = 0; i < str.length; i++) {
    bits.push(parseInt(str[i]))
  }
  return bits
}
module.exports = {
  parseMinterms
}
