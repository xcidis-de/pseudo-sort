const express = require('express');

const app = express();

app.use(express.json());

app.use('/', (req,res)=>{
    console.log(req.body);
    res.send();
})

app.listen(3000, (err)=>{
    console.log('server running : Errors ',  err)
})