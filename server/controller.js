let  profiles = [
    {
        id: 0,
        userName: "kyle1",
        password: "kyle",
        gamesPlayed: 10,
        email: "",
        gamesWon: 0,
        leastMoves: 100,
        bestTime: "0:09:57",
},
{
    id: 1,
    userName: "kyle2",
    password: "kyle",
    gamesPlayed: 0,
    email: "",
    gamesWon: 0,
    leastMoves: null,
    bestTime: null,
},
{
    id: 2,
    userName: "kyle3",
    password: "kyle",
    gamesPlayed: 99,
    email: "",
    gamesWon: 34,
    leastMoves: 30,
    bestTime: "1:00:07",
}
];
let id = 4;

module.exports = {
    login: (req,res)=>{
        let {userName, password} = req.body;
        console.log(userName, password)
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
        res.status(200).send(profile);
    },
    read: (req, res)=>{
        res.status(200).send(profiles);
    },
    create: (req, res)=>{
        let {userName, password, email} = req.body;
        let user = {
            id: id,
            userName: userName,
            password: password,
            gamesPlayed: 0,
            email: email,
            gamesWon: 0,
            leastMoves: null,
            bestTime: null,
    }
    profiles.push(user);
    id ++;
    res.status(200).send(profiles);
},
///MIGHT need to change this becasue i dont know if the actaul profiles array will be updated
    update: (req,res)=>{
        let {userName, password, newPassword, newUserName} = req.body;
        let index;
        for (let i = 0; i < profiles.length; i++){
            if (profiles[i].userName === userName && profiles[i].password === password){
                index = i;
                break;
            }
        }
        profiles[index] = {
                id: profiles[index].id,
                userName: newUserName || profiles[index].userName,
                password: newPassword || profiles[index].password,
                gamesPlayed: profiles[index].gamesPlayed,
                email: profiles[index].email,
                gamesWon: profiles[index].gamesWon,
                leastMoves: profiles[index].leastMoves,
                bestTime: profiles[index].bestTime,
        }
        
        res.status(200).send(profiles);
    },
    delete: (req, res)=>{
        let id = req.params.id;
        console.log(id)
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
    }
}