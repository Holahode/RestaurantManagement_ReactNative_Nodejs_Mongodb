const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const { main } = require('./foodModel/foodModel');
const foodRouter = require('./foodRoute/foodRoute');
main();

app.use('/owners', foodRouter);


app.use((error, req, res, next) => {
    if (error || error.message) {
        return res.send(error.message);
    } else {
        res.send('Backend error');
    }
});


app.use((req, res) => {
    res.status(500).send('API not responding')
});

app.listen(4000, () => { console.log("Server listning on port 4000..."); })