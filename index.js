const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send({Hello: 'buddy', });
});

const port  = process.env.PORT || 3000; //want known
app.listen(port)