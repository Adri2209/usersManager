import { Router } from 'express'
import UserModel from "../models/user.js"

const userRouter = Router()

userRouter.get('/users',async (req, res)=>{
      let users = await UserModel.find() 
      res.render("users.twig",{
        users:users,
      }) 
      
    })

userRouter.get('/user/:id',async (req, res)=>{
    try{
      let user = await UserModel.findOne({_id: req.params.id})
      res.json(user)  
    }catch (error){
        res.send(error)
    }
})

userRouter.post('/addUser',async (req, res)=>{
  try{
    const newUser = new UserModel(req.body)
    newUser.save()
    res.redirect('/users')
  }catch (error){
  }
})

userRouter.get('/deleteUser/:id',async (req, res)=>{
  try{
   await UserModel.deleteOne({ _id: req.params.id });
    res.redirect('/users') 
  }catch(error){
    res.send(error)
  }
})

userRouter.post('/updateUser/:id',async (req, res)=>{
  try{
  let user = await UserModel.updateOne({ _id: req.params.id },req.body);
   res.redirect('/users')
  }catch (error){
    res.send(error)
  }
})

userRouter.get('/updateUser/:id', async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.params.id })
    res.render('usersmodif.twig',{
      user:user,
      action : "update"
    })
  } catch (error) {
  }
})
userRouter.get('/connectUser/:id', async (req, res) => {
  try {
    let user = await UserModel.connectOne({ _id: req.params.id })
    res.render('usersconnexion.twig',{
      user:user
    })
  } catch (error) {
  }
})

userRouter.get('/addUser/', async (req, res) => {
  try {
    res.render('usersmodif.twig',{
      action :"inscription"
    })
  } catch (error) {
   res.send(error);
  }
})

userRouter.get('/login/', async (req, res) => {
  try {
    res.render('usersmodif.twig',{
      action:"connexion"
    })
  } catch (error) {
   res.send(error);
  }
})

userRouter.post('/login/', async (req, res) => {
  try {
    let user = await UserModel.findOne({mail: req.body.mail, password: req.body.password})
    if (user) {
      console.log(user);
      res.send('Vous etes connecté')
    }else{
      res.send("error")
    }
  } catch (error) {
   res.send(error);
  }
})


export default userRouter