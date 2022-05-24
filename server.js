const express = require('express');
const bodyParser = require('body-parser')
const moment = require('moment')
const cors = require("cors")
var app = express();

// localStorage substitute
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

// CORS
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

let tasks = [
    { id: '0', name: 'Eat', timestamp: moment().subtract(6, 'days') },
    { id: '1', name: 'Sleep', timestamp: moment() },
    { id: '2', name: 'Pawn', timestamp: moment().subtract(28, 'days') },
    { id: '3', name: 'Repeat', timestamp: moment().add(1, 'days') } //testing purpose + 1 day
]

localStorage.setItem('tasks', JSON.stringify(tasks))

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/all', (req, res) => {
    res.send(localStorage.getItem('tasks'))
    res.status(200)
});


app.post('/add', (req, res) => {
    console.log(req.body)
    let newTask = req.body;
    let oldTasks = JSON.parse(localStorage.getItem('tasks') || "[]");
    oldTasks.push(newTask)
    localStorage.setItem('tasks', JSON.stringify(oldTasks))
    res.status(201).json();
});

app.delete('/delete/:id', (req, res) => {
    let id = parseInt(req.params.id);
    if (tasks.filter(tasks => tasks.id == id).length !== 0) {
        tasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', tasks)
        res.status(200).send();
    } else {
        res.status(404).send();
    }
});

app.listen(3001, () => {
    console.log('Server Started at port 3001...');
});
