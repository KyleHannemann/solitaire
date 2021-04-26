let  profiles = [{id: 3, userName: 'kyle'}, {userName: "kyle", password: "yo"}];
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
        let id = req.params.id;
        let {userName, password} = req.body;
        let index;
        for (let i = 0; i < profiles.length; i++){
            if (profiles[i].id === parseInt(id)){
                index = i;
                break;
            }
        }
        profiles[index] = {
                id: profiles[index].id,
                userName: userName || profiles[index].userName,
                password: password || profiles[index].password,
                gamesPlayed: profiles[index].gamesPlayed,
                email: profiles[index].email,
                gamesWon: profiles[index].gamesWon,
                leastMoves: profiles[index].leastMoves,
                bestTime: profiles[index].bestTime,
        }
        
        res.status(200).send(profiles);
    }
}