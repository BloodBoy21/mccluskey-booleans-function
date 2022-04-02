const { createClient } = require('redis')
const client = createClient()
client.on('error', (err) => {
  console.log('Error ' + err)
})
;(async () => {
  await client.connect()
})()

module.exports = client
