const express = require('express')
const bodyParser = require('body-parser')
const redis = require('redis')
const moment = require('moment')
const cors = require("cors")

var app = express();
const client = redis.createClient();

//v4 redis
(async () => {
    await client.connect();
})();

const whitelist = ["http://localhost:3000"]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))

client.on('connect', () => {
    console.log('Connected to Redis...');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const DATA = [
    { id: "0", name: "Eat", timestamp: moment().subtract(6, 'days') },
    { id: "1", name: "Sleep", timestamp: moment() },
    { id: "2", name: "Pawn", timestamp: moment().subtract(28, 'days') },
    { id: "3", name: "Repeat", timestamp: moment().add(1, 'days') } //testing purpose + 1 day
]

app.get('/', function (req, res) {
    res.json({
        DATA
    })
});

app.get('/all', (req, res) => {
    // client.LRANGE('data', 0, -1, (err, reply) => {
    //console.log(a)
    res.json({
        sample: client.GET("key")
    })
    // });
});

//Add messages on redis
app.post('/announce/add', (req, res, next) => {
    var announce = req.body.announces;
    // client.RPUSH('announce', announce, (err, reply) => {
    //     if (err) {
    //         res.send(err);
    //     }
    //     res.redirect('/');
    // });
    res.send(announce);
});

//Delete messages on redis by index
app.delete('/announce/delete/:id', (req, res, next) => {
    var delANNOUNCE = req.body.announce
    client.LRANGE('announce', 0, -1, (err, announce) => {
        for (let i = 0; i < delANNOUNCE.length; i++) {
            client.LSET('announce', delANNOUNCE[i], deleted);
        }
    });
});

//Port listen of the app
app.listen(3001, () => {
    console.log('Server Started at port 3001...');
});

module.exports = app;