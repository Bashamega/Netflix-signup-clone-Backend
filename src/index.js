const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.get('/netflixpayment', (req, res)=>{
    res.status(500).json(
        {message: "Subscribe and like"}
    )
})

app.listen(3001, ()=>{
    console.log('Api started on port 3001')
})