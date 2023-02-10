import fs from 'fs';
import express from 'express'
import {Server} from 'socket.io'
import http from 'http'

const app = express()
const server = http.createServer(app);
const io = new Server(server)

app.use('/css', express.static('./static/css'))
app.use('/js', express.static('./static/js'))

app.get('/', function(request, response){
    fs.readFile('./static/index.html', function(err, data){
        if(err){
            response.send("ERROR")
        }
        else{
            response.writeHead(200, {'Content-Type':'text/html'})
            response.write(data)
            response.end()
        }
    })
})

io.sockets.on('connection', function(socket){
    console.log("user connected")

    socket.on('send',function(data){
        console.log("Sended Message:", data.msg)
    })

    socket.on('disconnect', function(){
        console.log('disconnected')
    })
})

server.listen(8080,function(){
    console.log("Hello?")
})