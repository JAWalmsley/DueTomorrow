const express = require('express');
const router = express.Router({mergeParams: true})
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const config = require('./config.json');
const port = 80;

const users = require('./routes/users.js');
const assignments = require('./routes/assignments');
const courses = require('./routes/courses')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));

app.use('/users', users);
app.use('/users/:user/assignments', assignments)
app.use('/users/:user/courses', courses)

app.get('/', (req, res) => {
    res.send("hiiiii")
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
