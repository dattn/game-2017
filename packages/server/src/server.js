require('dotenv').config()

const { default: geckos, iceServers } = require('@geckos.io/server')
const http = require('http')
const express = require('express')
const cors = require('cors')
const path = require('path')
const logger = require('./logger')

const app = express()
const server = http.createServer(app)
const io = geckos({
    iceServers: iceServers.iceServers
})

app.use(cors())

const pathToClient = path.dirname(require.resolve('@ionlu/game-2017-client/package.json'))
app.use('/', express.static(path.resolve(pathToClient, 'dist')))

io.addServer(server)
io.onConnection(channel => {

})

server.listen(process.env.SERVER_PORT, () => {
    let address = server.address()
    logger.info({ address }, `Server is listening on port ${address.port}`)
})