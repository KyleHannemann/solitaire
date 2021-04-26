const express = require('express');
const app = express();
const port = 3007;
const cnt = require('./controller')
app.use(express.json());

app.get('/api/profiles', cnt.read);
app.post('/api/profiles/login', cnt.login)
app.post('/api/profiles', cnt.create);
app.put('/api/profiles/:id', cnt.update)
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})