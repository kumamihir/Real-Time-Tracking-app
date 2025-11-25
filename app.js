require('dotenv').config();
const express = require('express')
const app = express();
const http = require('http')
const path = require('path')

const socketio = require('socket.io')
const server = http.createServer(app)

const io = socketio(server)


//ejs likhna h ab so main chiz h use set krna 
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));

//scriptjs se jo connection req ayi h very first line se
io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("recieve-location",{id : socket.id,...data})
    })
    console.log("Connect ho gya socket")

    socket.on("disconnect",function(){
        io.emit("User-Disconnected",socket.id)
    })
}) 

const port= process.env.PORT||4000
app.get("/",(req,res)=>{
    res.render("index");
})
//ab server listen krega app ni
server.listen(port,()=>{
    console.log(`app is listening kid! on ${port}`)
})
