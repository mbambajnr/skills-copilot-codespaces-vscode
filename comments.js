
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());
//Create web server
console.log("Creating web server...");
//Create array of comments
const comments = [
    { id: 1, comment: 'I love this product' },
    { id: 2, comment: 'I hate this product' },
    { id: 3, comment: 'This product is ok' }
];
//Get all comments
app.get('/comments', (req, res) => {
    res.send(comments);
});
//Get comment by id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('The comment with the given ID was not found');
    res.send(comment);
});
//Create comment
app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        comment: req.body.comment
    };
    comments.push(comment);
    res.send(comment);
});
//Update comment
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('The comment with the given ID was not found');
    comment.comment = req.body.comment;
    res.send(comment);
});
//Delete comment
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) res.status(404).send('The comment with the given ID was not found');
    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.send(comment);
});
//Listen to port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});