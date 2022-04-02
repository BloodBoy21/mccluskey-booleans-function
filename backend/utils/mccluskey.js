const { isEmpty } = require('lodash')
const { getExpression } = require('./parseMcCluskey')
/**
 * @class Minterm
 * @param {Array} minterm
 */
class Minterm {
  constructor(minterm, { position, group, m } = {}) {
    this.bits = minterm
    this.group = group
    this.m = m ?? [this.#getPosition()]
  }
  #getPosition() {
    const numDEC = this.bits.join('')
    return parseInt(numDEC, 2)
  }
  /**
   * @param {Number} pos
   */
  changeBit(pos) {
    this.bits[pos] = '-'
  }
}
/**
 *
 * @param {Array} minterm
 * @returns  {Number} count
 */
const countOnes = (bits) => {
  let count = 0
  bits.forEach((bit) => {
    if (bit === 1) count++
  })
  return count
}
/**
 *
 * @param {Array} table
 */
function agroupByOnes(table) {
  const groups = {}
  table.forEach((minterm) => {
    const count = countOnes(minterm.bits)
    if (!groups[count]) {
      groups[count] = []
    }
    groups[count].push(minterm)
    minterm.group = count
  })
  return groups
}
/**
 *
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Number} position
 */
function getBitChange(arr1, arr2) {
  let position = -1
  let count = 0
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      position = i
      count++
    }
  }
  return count > 1 ? -1 : position
}
/**
 *
 * @param {Array} minterms
 * @returns
 */
function checkIfIsCopy(minterms, newMinterm) {
  return minterms.some((m) => {
    return JSON.stringify(newMinterm.bits) === JSON.stringify(m.bits)
  })
}

/**
 *
 * @param {Array} arrarr1
 * @param {Array} arr2
 * @returns {Object} minterms
 */
function reduceTable(arr1, arr2) {
  const minterms = {}
  arr1.forEach((minterm) => {
    arr2.forEach((minterm2) => {
      const position = getBitChange(minterm.bits, minterm2.bits)
      if (position === -1) return
      const newMinterm = new Minterm([...minterm.bits], {
        m: [...minterm.m, ...minterm2.m]
      })
      newMinterm.changeBit(position)
      newMinterm.group = countOnes(newMinterm.bits)
      if (!minterms[newMinterm.group]) minterms[newMinterm.group] = []
      const isCopy = checkIfIsCopy(minterms[newMinterm.group], newMinterm)
      if (isCopy) return
      minterms[newMinterm.group].push(newMinterm)
    })
  })
  return minterms
}
/**
 *
 * @param {Array} table
 * @returns {Object}
 */

function reduceArrayTable(table) {
  return table.reduce((acc, curr) => {
    Object.keys(curr).forEach((key) => {
      if (!acc.hasOwnProperty(key)) acc[key] = []
      acc[key].push(...curr[key])
    })
    return acc
  }, {})
}

/**
 * @param {Object} table
 * return {Object} newTable
 */
function agroupByBitChange(table) {
  let newTable = []
  const groups = Object.keys(table)
    .sort((a, b) => a - b)
    .map(Number) // sort groups by ascending order
  for (let i = 0; i < groups.length; i++) {
    const groupOne = groups.at(i)
    const groupTwo = groups.at(i + 1)
    if (!groupTwo || groupTwo - groupOne !== 1) break
    const mutations = reduceTable(table[groupOne], table[groupTwo])
    if (isEmpty(mutations)) break
    newTable.push(mutations)
  }
  if (isEmpty(newTable)) return table
  newTable = reduceArrayTable(newTable)
  return agroupByBitChange(newTable)
}
/**
 *
 * @param {Array} table
 * @param {Array} positions
 * @returns
 */
function getTermByPosition(table, positions) {
  return positions.map((position) => {
    return table.find((m) => m.m.includes(parseInt(position)))
  })
}

/**
 *
 * @param {Array} table
 */
function getMinSum(table) {
  const terms = {}
  table.forEach((minterm) => {
    minterm.m.forEach((m) => {
      if (!terms[m]) terms[m] = 0
      terms[m]++
    })
  })
  const uniques = Object.keys(terms).filter((k) => {
    return terms[k] === 1
  })
  return getTermByPosition(table, uniques)
}

/**
 *
 * @param {Array} table
 */
function getFinalFunction(table) {
  const bits = table.map((minterm) => minterm.bits)
  const functions = new Set(bits.map((x) => getExpression(x)))
  return Array.from(functions).join(' + ')
}

/**
 *
 * @param {Array} minterms
 */
function main(minterms) {
  const mainTable = minterms.map((minterm) => new Minterm(minterm))
  const groups = agroupByOnes(mainTable)
  const newTable = agroupByBitChange(groups)
  const minSum = getMinSum(Object.values(newTable).flat(100))
  const finalFunction = getFinalFunction(minSum)
  return finalFunction
}
module.exports = main
