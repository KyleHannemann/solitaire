const bcrypt = require('bcryptjs');




module.exports = {
/*good*/    login: async (req,res)=>{
        let {userName, password} = req.body;
        const db = req.app.get('db');

        let user  = await db.get_user(userName);
        console.log(user)
        if (user.length !== 1){
            return res.status(404).send('invalid username and/or password')
        }
        else {
            let hash = bcrypt.compareSync(password, user[0].password);
            console.log(hash)
            if (hash === false){
                return res.status(404).send('invalid username and/or password')

            }
            else{
                return res.status(200).send(user[0]);
            }
        }
        // let profile = profiles.filter(el=>{
        //     if (el.userName === userName){
        //         if (el.password === password){
        //             return el;
        //         }
        //     }
        //     else{
        //         return false;
        //     }
         
        // })
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
       
    },
    readMemory: (req, res)=>{
        const db = req.app.get('db');
        db.get_all_users_memory().then((data,err)=>{
            res.status(200).send(data);
        }).catch(err=>{
            res.status(500).send('error')
        });
        
    },
    readSolitaire: (req, res)=>{
        const db = req.app.get('db');
        db.get_all_users_solitiare().then((data,err)=>{
            res.status(200).send(data);
        }).catch(err=>{
            res.status(500).send('error')
        });
    },
/*GOOD */   create: async (req, res)=>{
    let {userName, password, email} = req.body;
     const db = req.app.get('db');

     let user = await db.check_exists(userName);
     if (user.length >= 1){
        return res.status(409).send('username unavailable');
     }
     else {
         const salt = bcrypt.genSaltSync(10);
         const hash = bcrypt.hashSync(password, salt);
        let created = await db.new_user([userName, hash, email]);
        console.log(created)
        return res.status(200).send('success');
     }
},
        // let {userName, password, email} = req.body;
        // const db = req.app.get('db');

        // db.get_users().then((data, err)=>{
        //     console.log(data);
        //     for (let i = 0; i < data.length; i++){
        //             if (data[i].username === userName){
        //                 res.status(404).send("userName unavailable")
        //                 return;
        //             }
        //         }
            
            
        // }).catch(err=>{res.status(500).send})
        // db.new_user([userName, password, email]).then(()=>{
        //         res.status(200).send('success');
        // }).catch(()=>{
        //     res.status(500).send('error');
        // })


    //     
    //     let user = {
    //         id: id,
    //         userName: userName,
    //         password: password,
    //         gamesPlayed: 0,
    //         email: email,
    //         gamesWon: 0,
    //         leastMoves: null,
    //         bestTime: null,
    //         memory: {
    //             easy:{
    //                 gamesWon: 0,
    //                 time: null,
    //                 moves: null,
    //             },
    //             medium:{
    //                 gamesWon: 0,
    //                 time: null,
    //                 moves: null,
    //             },
    //             hard:{
    //                 gamesWon: 0,
    //                 time: null,
    //                 moves: null,
    //             },
    //             extreme:{
    //                 gamesWon: 0,
    //                 time: null,
    //                 moves: null,
    //             }
    //         }
    // }
    // profiles.push(user);
    // id ++;
    // res.status(200).send(profiles);
///MIGHT need to change this becasue i dont know if the actaul profiles array will be updated
   /**todo */   update: (req,res)=>{
       const {userName, password, id} = req.body;
       const db = req.app.get('db');

       db.update_user_info([id, userName, password]).then((data,err)=>{
           res.status(200).send('update complete');
       }).catch(err=>{
           res.status(500).send('error')
       })
    },
      delete: (req, res)=>{
        const {id} = req.params;
        const db = req.app.get('db');

        db.delete_profile(id).then(()=>{
            res.status(200).send('delete complete')
        }).catch(err=>{
            console.log(err)
            res.status(500).send('error')
        })
    },
      updateSolitaire:(req, res)=>{
       const db = req.app.get('db');
       const {id} = req.params;
        const {gameWon, time, moves, userName} = req.body;
        console.log(gameWon, time, moves, userName, id)
       db.update_solitaire([userName, id, gameWon, moves, time]).then(()=>{
           res.status(200).send('update successful');
       }).catch(err=>{
           res.status(505).send('update failed');
       })
    },
    updateMemory: (req,res)=>{
       console.log('mem')
    const db = req.app.get('db');
    const {id} = req.params;
     const {gameWon, time, moves, userName, difficulty} = req.body;

    db.update_memory([userName, id, gameWon, moves, time, difficulty]).then(()=>{
        res.status(200).send('update successful');
    }).catch(err=>{
        res.status(505).send('update failed');
    })
    },
    getSolitaireStats: (req,res)=>{
            let {id} = req.params;
            const db = req.app.get('db');
            let stats = {
                bestTime: null,
                bestMoves: null,
                totalGames: null,
                wins: null,
            }
            db.get_user_solitaire_time(id).then((data,err)=>{
                stats.bestTime = data;
               
            }).then(()=>{
                db.get_user_solitaire_wins(id).then((data, err)=>{
                    stats.wins = data;
                }).then(()=>{
                    db.get_user_solitaire_moves(id).then((data,err)=>{
                                stats.bestMoves = data;
                                 
                             }).then(()=>{
                                 db.get_user_solitaire_games(id).then((data,err)=>{
                                     stats.totalGames = data;
                                     res.status(200).send(stats);
                                 })
                             })
                })
            }).catch(err=>{
                res.status(500).send('error')
            });
        
            
            
    },
    getMemoryStats: (req,res)=>{
        let {id} = req.params;
        let stats = {
            easy: null,
            medium: null,
            hard: null,
            extreme: null
        }
        const db = req.app.get('db');

        db.get_user_memory_byDifficulty([id, 'easy']).then((data,err)=>{
            stats.easy = data;
        })
        .then(()=>{
            db.get_user_memory_byDifficulty([id, 'medium']).then((data,err)=>{
                stats.medium = data;
            }).then(()=>{
                db.get_user_memory_byDifficulty([id, 'hard']).then((data,err)=>{
                    stats.hard = data;
                }).then(()=>{
                    db.get_user_memory_byDifficulty([id, 'extreme']).then((data,err)=>{
                        stats.extreme = data;
                        res.status(200).send(stats)
                    })
            
        })
            
        
            
        })
    }).catch(err=>{
        res.status(500).send('error')
    })
}

}