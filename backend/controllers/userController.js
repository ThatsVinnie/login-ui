const{User: UserModel} = require('../models/Users')
const { crypt } = require('../components/crypt')

const userController = {
    create: async(req, res) =>{
        try{
            const user = {
                name: req.body.name,
                mail: req.body.mail,
                pass: crypt(req.body.pass)
            }
            const response = await UserModel.create(user)
            res.status(200).json({response, msg:'User was succesfully created'})
        }catch(e){
            console.log(e)
        }
    },
    login: async(req, res) =>{
        try{
            let {mail, password} = req.body
            const pass = crypt(password)

            const user = await UserModel.find({mail:mail, pass:pass})

            if(user.length !==0){
                return res.status(200).json({user, msg: 'Login was succesfully done'})
            }else{
                return res.status(404).json({user, msg: 'User not found'})
            }
        }catch(e){
            console.log(e)
        }
    }
}

module.exports = userController