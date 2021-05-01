const express = require('express');
const app = express();
const port = 3007;
const cnt = require('./controller')
app.use(express.json());

app.get('/api/profiles', cnt.read);
app.post('/api/profiles/login', cnt.login)
app.post('/api/profiles', cnt.create);
app.put('/api/profiles', cnt.update);
app.delete('/api/profiles/:id', cnt.delete)
app.put('/api/profiles/games', cnt.updateSolitaire)
app.put('/api/profiles/games/memory', cnt.updateMemory)

app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})