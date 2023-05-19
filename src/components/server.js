const Express = require('express');
const app = Express();
const cors=require("cors");
const http = require('http');
const {Server}=require("socket.io");
const { log } = require('console');
const server = http.createServer(app);
app.use(cors())


const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:["GET","POST"],
    }
});
io.on('connection', (socket) => {
    console.log('A user connected with id : ',socket.id);
    socket.on("join",(data)=>{
      socket.join(data);
      console.log("user joined ",data);
    })
    socket.on("msg",(data)=>{
      console.log("msg:",data);
     io.emit("receive",(data))
    })
    socket.on("disconnect",()=>{
      console.log(`${socket.id} disconnected`);
    })
    // socket.on("connection", (message) => {
    // console.log("enterd");
    // socket.broadcast.emit("receive",message)
    //   console.log(message);
    // });
  });
  server.listen(3001,()=>{
    console.log("server is running");
  })

