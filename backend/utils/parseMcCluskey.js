/**
 *
 * @param {Array} expression
 * @returns
 */
function getExpression(expression) {
  let asciiChar = 65
  const newExpression = expression.map((bit) => {
    if (bit === '-') {
      asciiChar++
      // eslint-disable-next-line array-callback-return
      return
    }
    const char = String.fromCharCode(asciiChar)
    asciiChar++
    return bit ? char : `${char}\u{0305}`
  })
  return newExpression.join('')
}

module.exports = {
  getExpression
}
