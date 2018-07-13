const rabbot = require('rabbot')

async function rabbitWorker (message) {
  await setTimeout(() => {
    message.ack()
    console.log('request handled succcessfully')
  }, 1000)
}




rabbot.handle('Scrape', (message) => {
  console.log('received scrape message')
    message.ack()
})

rabbot.handle('DB Request', (message) => {
  console.log('received db request message')
  message.ack()
}) 




rabbot.configure({
  connection: {
    name: 'default',
    user: 'guest',
    pass: 'guest',
    host: 'localhost',
    port: 5672,
    vhost: '%2f',
    replyQueue: 'customReplyQueue'
  },
  exchanges: [
    { name: 'ex.1', type: 'fanout', autoDelete: false, durable: true}
  ],
  queues: [
    { name: 'q.1', autoDelete: false, subscribe: true , queueLimit: 1000},
  ],
  bindings: [
    { exchange: 'ex.1', target: 'q.1', keys: [] }
  ]
}).then(
  () => console.log('connected!')
)