const { parseInput, mccluskey } = require('../utils')
exports.table = async (req, res) => {
  const { minterms } = req.body
  const mintermsAsBits = await parseInput.parseMinterms(minterms)
  const finalFunction = mccluskey(mintermsAsBits)
  return res.status(200).json({ function: finalFunction })
}
