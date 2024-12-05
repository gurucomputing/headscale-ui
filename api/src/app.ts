import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/apikey', (req, res) => {
    fs.readFile('./static/apikey.txt', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        } else {
            res.status(200).send(JSON.stringify({"apikey": data}));
        }
    });
});

app.post('/api/apikey', (req, res) => {
    const data = req.body.apikey;
    fs.writeFile('./static/apikey.txt', data, (err) => {
        if (err) {
            res.status(500).send('Error writing file');
        } else {
            res.status(200).send('File written successfully');
        }
    });
});

app.get('/api/url', (req, res) => {
    fs.readFile('./static/url.txt', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        } else {
            res.status(200).send(JSON.stringify({"url": data}));
        }
    });
});

app.post('/api/url', (req, res) => {
    const data = req.body.url;
    fs.writeFile('./static/url.txt', data, (err) => {
        if (err) {
            res.status(500).send('Error writing file');
        } else {
            res.status(200).send('File written successfully');
        }
    });
});

const port = 20000

var server = app.listen(port, function () {
    console.log(`Express App running on port ${port}`);
})
