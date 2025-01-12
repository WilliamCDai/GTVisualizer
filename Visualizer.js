
const http = require("http");
const fs = require("fs");
const express = require("express");
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'docs')));
app.use(express.static(path.join(__dirname, 'algorithms')));

app.set('view engine', 'ejs');

app.get('/dfs', (req, res) => {
    res.render('index', {algoPath: "/dfs/dfs.js"});
})

app.get('/bfs', (req, res) => {
    res.render('index', {algoPath: "/bfs/bfs.js"});
})
 
app.get('/dijkstra', (req, res) => {
    res.render('index', {algoPath: "/dijkstras/dijkstra.js"});
})

app.get('/', (req, res) => {
    res.render('index', {algoPath: "/home/home.js"});
}); 

app.listen(8080, () => {
    console.log('Server running on port 8080');
});