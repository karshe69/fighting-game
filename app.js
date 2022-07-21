const express = require('express')
const app = express()

app.use(express.static('./public'))

app.get('/about', (req, res)=>{
    res.send('about')
})

app.all('*', (req, res) =>{
    res.status(404).send('<h1>resource not found</h1>')
})

app.listen(8080, () =>{
  console.log("running on 8080");
})