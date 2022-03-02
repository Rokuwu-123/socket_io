const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/postgres-adapter");
const { Pool } = require("pg");
var express = require('express');
var http = require('http');
app = express()


const pool = new Pool({
    user: "postgres",
    host: "192.168.200.213",
    password: "inticomp1!",
    database: "ausath_dummy_holding",
    port: 5432
});

pool.query(`
  drop table if exists socket_io_attachments;
  CREATE TABLE socket_io_attachments (
      id          bigserial UNIQUE,
      created_at  timestamptz DEFAULT NOW(),
      payload     bytea
  );
`);

app.set('port', '0.0.0.0' || 33000);
app.set('views', 'page');
app.set('view engine', 'ejs');
app.use(express.json());

app.get('/',(req,res)=>{
    res.render('index',{

    })
})

server_http = http.createServer(app)

server_http.listen(33000, '0.0.0.0', () => {
    console.log(`Server running at http://${'0.0.0.0'}:${33000}/`);
});

io = new Server(server_http)

// async function notif(){
//     await pool.connect(async(err,client)=>{
//        await  client.on('notification',(pesan)=>{
//             vpesan = pesan.payload
//             //console.log(vpesan)
//             return vpesan
//         })
//         await client.query(`LISTEN update_table`)
//     })
// }
// vdata = notif()

io.adapter(createAdapter(pool));
io.sockets.on('connection', async function (socket) {
    console.log(`client id : ${socket.id}`)
        
    // socket.emit('update', { message: 'title' });
    koneksi = socket.adapter.pool
        await koneksi.connect(async (err,client)=>{
            await client.on('notification', function(title) {
                
                vdata = JSON.parse(title.payload)
                console.log(socket.id)
                // socket.emit('update', { message: vdata });
                io.to(socket.id).emit('update', { message: vdata });
            })
            await client.query(`LISTEN update_table`)
        })
    // socket.on('unik', async function (data) {
    //     console.log(data)
    //     koneksi = socket.adapter.pool
    //     await koneksi.connect(async (err,client)=>{
    //         await client.on('notification', function(title) {
                
    //             vdata = JSON.parse(title.payload)
    //             socket.emit('update', { message: vdata });
    //         })
    //         await client.query(`LISTEN update_table`)
    //     })
    //     // await koneksi.on('notification', function(title) {
    //     //     console.log(title)
    //     //     vdata = JSON.parse(title.payload)
    //     //     // socket.emit('update', { message: title });
    //     // })
    //     // await koneksi.query(`LISTEN update_table`)
        
    // });
});

