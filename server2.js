const { Client,Pool } = require("pg");
var express = require('express');
var http = require('http');
app = express()

app.use(express.json());
app.set('port', '0.0.0.0' || 33000);
app.get('/',(req,res)=>{
    res.send('index')
})

const pool = new Pool({
    user: "postgres",
    host: "192.168.200.213",
    password: "inticomp1!",
    database: "ausath_dummy_holding",
    port: 5432
});

pool.connect((err,client)=>{
        client.on('notification',(pesan)=>{
            console.log(pesan)
        })
        client.query(`LISTEN update_table`)
})

// pool.on('notification',(pesan)=>{
//                 console.log(pesan)
// })
// pool.query(`LISTEN update_table`)
// pool.connect((err,client)=>{
//     client.on('notification',(pesan)=>{
//         console.log(pesan)
//     })
//     client.query(`LISTEN update_table`)
// })

http.createServer(app).listen(33000, '0.0.0.0', () => {
    console.log(`Server running at http://${'0.0.0.0'}:${33000}/`);
});