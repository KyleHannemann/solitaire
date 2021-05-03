
let data = require('./MOCK_DATA')
let profiles = data;
let id = 102;

module.exports = {
    login: (req,res)=>{
        let {userName, password} = req.body;
        let profile = profiles.filter(el=>{
            if (el.userName === userName){
                if (el.password === password){
                    return el;
                }
            }
            else{
                return false;
            }
         
        })
        //updating profiles to contain correct data
       /* for (let i = 0; i < profiles.length; i++){
            profiles[i].memory = {
                easy: {
                    gamesWon: Math.floor(Math.random() * 100),
                    time: Math.floor(Math.random() * 1000),
                    moves: Math.floor(Math.random() * 200)
                },
                medium: {
                    gamesWon: Math.floor(Math.random() * 100),
                    time: Math.floor(Math.random() * 1000),
                    moves: Math.floor(Math.random() * 200)
                },
                hard: {
                    gamesWon: Math.floor(Math.random() * 100),
                    time: Math.floor(Math.random() * 1000),
                    moves: Math.floor(Math.random() * 200)
                },
                extreme: {
                    gamesWon: Math.floor(Math.random() * 100),
                    time: Math.floor(Math.random() * 1000),
                    moves: Math.floor(Math.random() * 200)
                },
            }
        }
        //change back to profile[0]//*/
        res.status(200).send(profile[0]);
    },
    read: (req, res)=>{
        res.status(200).send(profiles);
    },
    create: (req, res)=>{
        let {userName, password, email} = req.body;
        for (let i = 0; i < profiles.length; i++){
            if (profiles[i].userName === userName){
                res.status(404).send("userName unavailable")
                return;
            }
        }
        let user = {
            id: id,
            userName: userName,
            password: password,
            gamesPlayed: 0,
            email: email,
            gamesWon: 0,
            leastMoves: null,
            bestTime: null,
            memory: {
                easy:{
                    gamesWon: 0,
                    time: null,
                    moves: null,
                },
                medium:{
                    gamesWon: 0,
                    time: null,
                    moves: null,
                },
                hard:{
                    gamesWon: 0,
                    time: null,
                    moves: null,
                },
                extreme:{
                    gamesWon: 0,
                    time: null,
                    moves: null,
                }
            }
    }
    profiles.push(user);
    id ++;
    res.status(200).send(profiles);
},
///MIGHT need to change this becasue i dont know if the actaul profiles array will be updated
    update: (req,res)=>{
        let {userName, password, newPassword, newUserName} = req.body;
        let index = null;
        for (let i = 0; i < profiles.length; i++){
            if (profiles[i].userName === userName && profiles[i].password === password){
                index = i;
                break;
            }
        }
        if (index === null){
            res.status(404).send("user not found")
        }
        else{
        profiles[index] = {
                id: profiles[index].id,
                userName: newUserName || profiles[index].userName,
                password: newPassword || profiles[index].password,
                gamesPlayed: profiles[index].gamesPlayed,
                email: profiles[index].email,
                gamesWon: profiles[index].gamesWon,
                leastMoves: profiles[index].leastMoves,
                bestTime: profiles[index].bestTime,
                memory: profiles[index].memory,
        }
        
        res.status(200).send(profiles[index]);

        }
    },
    delete: (req, res)=>{
        let id = req.params.id;
        let index = false;
        for (let i = 0; i < profiles.length; i++){
            if (profiles[i].id === parseInt(id)){
                index = i;
                break;
            }
        }
        if (index !== false){
        profiles.splice(index, 1);
        res.status(200).send(profiles)
        }
        else{
        res.status(404).send("not found")
        }
    },
    updateSolitaire:(req, res)=>{
        let index = null;
        let {gameWon, time, moves, userName, password} = req.body;
        for (let i = 0; i < profiles.length; i++){
            if (profiles[i].userName === userName && profiles[i].password === password){
                index = i;
                break;
            }
        }
        if (index === null){
            res.status(500).send("not found")
        }
        let bestTime = profiles[index].bestTime;
        if ((gameWon === true) && (bestTime === null || time < bestTime)){
            bestTime = time
        }
        let leastMoves = profiles[index].leastMoves;
        if ((gameWon === true) && (leastMoves === null || moves < leastMoves)){
            leastMoves = moves;
        }
        let gamesWon = profiles[index].gamesWon;
        if (gameWon === true){
            gamesWon += 1;
        }
        profiles[index] = {
            id: profiles[index].id,
            userName: profiles[index].userName,
            password: profiles[index].password,
            gamesPlayed: profiles[index].gamesPlayed + 1,
            email: profiles[index].email,
            gamesWon: gamesWon,
            leastMoves: leastMoves,
            bestTime: bestTime,
            memory: profiles[index].memory
    }
     res.status(200).send(profiles[index]); 
    },
    updateMemory: (req,res)=>{
        let {userName, password, time, moves, gameWon, difficulty} = req.body;
        let index = null;
        for (let i = 0; i < profiles.length; i++){
            if (profiles[i].userName === userName && profiles[i].password === password){
                index = i;
                break;
            }
        }
        if(index === null){
            res.status(404).send('user not found')
        }
        let {time: newTime, moves: newMoves, gamesWon} = profiles[index].memory[difficulty]
        if(gameWon === true){
            gamesWon = profiles[index].memory[difficulty].gamesWon +  1;
        }
        if(gameWon === true && (time < newTime || newTime === null)){
            newTime = time;
        }
        if (gameWon === true && (moves < newMoves || newMoves === null)){
            newMoves = moves;
        }
        profiles[index].memory[difficulty] = {
            gamesWon: gamesWon,
            time: newTime,
            moves: newMoves,
        }
        
        res.status(200).send(profiles[index])
        
    }
}