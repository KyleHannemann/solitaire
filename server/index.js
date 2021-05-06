const express = require('express');
const massive = require('massive');
require('dotenv').config();
const app = express();
const cnt = require('./controller')

const {SERVER_PORT, CONNECTION_STRING} = process.env;
app.use(express.json());
massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db=>{
    app.set('db', db);
}).catch(err=>{console.log(err)})

app.get('/api/profiles/solitaire', cnt.readSolitaire);
app.get('/api/profiles/memory', cnt.readMemory);
app.get('/api/profiles/gamesStats/solitare/:id', cnt.getSolitaireStats)
app.get('/api/profiles/gamesStats/memory/:id', cnt.getMemoryStats)
app.post('/api/profiles/login', cnt.login)
app.post('/api/profiles', cnt.create);
app.put('/api/profiles', cnt.update);
app.delete('/api/profiles/:id', cnt.delete)
app.put('/api/profiles/games/:id', cnt.updateSolitaire)
app.put('/api/profiles/games/memory/:id', cnt.updateMemory)

app.listen(SERVER_PORT, ()=>{
    console.log(`listening on port ${SERVER_PORT}`)
})