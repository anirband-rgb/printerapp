var express = require('express');
var router = express.Router();
var jwt=require('jsonwebtoken');
var userLogic=require('../BL/userLogic');
//var authmiddleware=require('./middleware/authmiddleware');
/* GETt users listing. */
router.post('/signin',async function(req, res) {
 
      const user={
          id:1,
          username:'anir',
          email:'test@example.com'
      }
      jwt.sign({user:user},'secretkey',(err,token)=>{
          res.json({
            token
          })
      })  

  

  
});


router.post('/login',async function(req, res) {
 
  
  var temp = await userLogic.authlogin(req.body)

  console.log(temp)
  res.send(temp)



});
router.post('/register',async function(req, res) {
 
  
  var temp = await userLogic.createUser(req.body)

  console.log(temp)
  res.send(temp)



});

function veryfyToken(req,res,next)
{
    let headers=req.headers['access_token'] 
    console.log(headers);
    if(headers ===undefined)
    {
      res.sendStatus(403)
      
    }else
    {
      jwt.verify(headers,'secretkey',(err,authData)=>{
        if(err)
        {
          res.sendStatus(403)
        }else{
          next()
        }
      })
    
    }
 
}


module.exports = router;
