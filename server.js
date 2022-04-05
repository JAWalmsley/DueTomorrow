const express = require('express')
const app = express()
const port = 3000

app.set('views', './views')
app.set('view engine', 'pug')

// app.use(express.static(__dirname + '/html'))
app.use('/css', express.static(__dirname + '/css'))
app.use('/js', express.static(__dirname + '/js'))

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})