const rabbot = require('rabbot')

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


const DBLoop = setInterval (publishDBMessage, 2000)
const scrapeLoop = setInterval (publishScrapeMessage, 2000)

function publishDBMessage () {
  rabbot.publish('ex.1', { type: 'DB Request', body: 'database request!' })
}

function publishScrapeMessage () {
  rabbot.publish('ex.1', { type: 'Scrape', body: 'scrapey scrapey!' })
}