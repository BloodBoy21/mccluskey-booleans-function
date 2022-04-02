const { parseInput, mccluskey } = require('../utils')
const logger = require('../logger')
exports.table = async (req, res) => {
  const { minterms } = req.body
  logger.info('Received request to calculate table')
  logger.info(`Received minterms: ${minterms}`)
  if (minterms.length === 0) {
    return res.status(400).json({ error: 'No minterms provided' })
  }
  const mintermsAsBits = await parseInput.parseMinterms(minterms)
  const finalFunction = mccluskey(mintermsAsBits)
  return res.status(200).json({ function: finalFunction })
}
 