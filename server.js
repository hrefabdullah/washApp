import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`)

    socket.on('chat-message', (msg) => {
        io.emit('chat-message', msg)
    })

    socket.on('chat-message', (msg) => {
        console.log("Received message:", msg)
    })
})


server.listen(8000, () => {
    console.log('server is running on http://localhost:8000')
})
