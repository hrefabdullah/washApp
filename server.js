import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import path from 'path';

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://127.0.0.1:5500/index.html',
        methods: ['GET', 'POST'],
    }
})

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('chat_message', (msg) => {
        io.emit('chat_message', msg)
    })
})


app.get('/', (req, res) => {
    res.sendFile('/public/index.html')
})

server.listen(8000, () => {
    console.log('server is running on port http://localhost:8000')
})
