const router = require('express').Router()
const adminRepository = require('../repository/AdminRepostory')

// todo: make all endpoints authorize access to admin or moderator

router.get("/all", (req, res)=>{
    if(!req.authenticated) return res.send({error: 'You are not authenticated of userId=' + req.userId})
    adminRepository.readAll((msg)=>{
        res.send({error: msg, success:[]})
    },(successData)=>{
        res.send({error: '', success : successData})
    })
})

router.get("/:id", (req, res)=>{
    if(!req.authenticated) return res.send({error: 'You are not authenticated of userId=' + req.userId})
    if(req.params.username != ""){
        adminRepository.readById(req.params.id, (errMsg)=>{
            res.send({error: errMsg, success: ''})
        }, (successData)=>{
            res.send({error: '', success: successData})
        })
    }else{
        res.send({error: "username not given", success: ''})
    }
})

router.post("/create", (req, res)=>{
    if(!req.authenticated) return res.send({error: 'You are not authenticated of userId=' + req.userId})
    if(Object.keys(req.body).length > 0){
        if(req.body.username != "" && req.body.password != "" && req.body.role != ""){
            adminRepository.insert({username: req.body.username, password: req.body.password, role:req.body.role}, (errMsg)=>{
                res.send({error: errMsg, success: ''})
            }, (successData)=>{
                res.send({error: '', success: successData})
            })
        }else{
            res.send({error: 'username, password & role are invalid', success: ''})
        }
    }else{
        res.send({error: 'body not found!', success: ''})
    }
})

router.post("/update_password/:id", (req, res)=>{
    if(!req.authenticated) return res.send({error: 'You are not authenticated of userId=' + req.userId})
    if(req.params.id != "" && req.params.id == req.userId){
        if(req.body.old_password != "" && req.body.new_password != ""){
            if(req.body.old_password != req.body.new_password){
                adminRepository.readById(req.params.id, (errMsg)=>{
                    res.send({error: errMsg})
                }, (successData)=>{
                    if(successData.length > 0){
                        let old_passwd = successData[0].password
                        if(old_passwd == req.body.old_pasword){
                            adminRepository.updatePassword(req.params.id, req.body.new_password, (errorMsg)=>{
                                res.send({error: errorMsg})
                            }, (successMsg)=>{
                                res.send({success:successMsg})
                            })
                        }else{
                            res.send({error: "old_password doesn't match with actual password"})
                        }
                    }else{
                        res.send({error:"user id not found"})
                    }
                })
            }else{
                res.send({error: "old_password & new_password are same"})
            }
        }else{
            res.send({error: "old_password & new_password parameters are empty"})
        }
    }else{
        res.send({error: 'Admin id not provided'})
    }
})

router.get("/delete/:id", (req, res)=>{
    if(!req.authenticated) return res.send({error: 'You are not authenticated of userId=' + req.userId})
    if(req.params.id != "" && req.userId == req.params.id){
        adminRepository.delete(req.params.id, (errorMsg)=>{
            res.send({error: errorMsg})
        }, (successMsg)=>{
            res.send({success: successMsg})
        })
    }else{
        res.send({error: 'Admin id not provided'})
    }
})

module.exports = router;