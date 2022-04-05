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

app.get('/', (req, res) => {
    res.render('index', {assignments: [['one', 'two', 'three', false], ['ones', 'two', 'three', false], ['oness', 'two', 'three', true], ['onesss', 'two', 'three', true]]})
})

app.post('/complete', (req, res) => {
    console.log(req.body);
    res.sendStatus(200)
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})