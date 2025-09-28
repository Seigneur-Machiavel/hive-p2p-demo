// server.mjs - A simple Express server to serve the demo files
import express from 'express';
import path from 'path';

const app = express();
const PORT = 3006;
app.use(express.static('.'));
app.get('/', (req, res) => res.sendFile(path.resolve('./browser-min/demo-inline.html')));
app.get('/inline', (req, res) => res.sendFile(path.resolve('./browser-min/demo-inline.html')));
app.get('/ES6', (req, res) => res.sendFile(path.resolve('./browser-min/demo-es6.html')));

app.listen(PORT, () => {
    console.log(`Open: http://localhost:${PORT}/inline`);
    console.log(`Open: http://localhost:${PORT}/ES6`);
});