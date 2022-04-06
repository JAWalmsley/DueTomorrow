const express = require('express')
const bodyparser = require('body-parser')

const app = express()
app.use(bodyparser.json())
const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

// app.use(express.static(__dirname + '/html'))
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))
assig = {
    'twoone': ['one', 'two', 'three', false],
    'twoones': ['ones', 'two', 'three', false],
    'twooness': ['oness', 'two', 'three', true]
}
app.get('/', (req, res) => {
    res.render('index', {assignments: assig})
})

app.post('/complete', (req, res) => {
    console.log(req.body);
    assig[req.body.item][3]=req.body.done;
    res.sendStatus(200);
});

app.post('/newitem', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})