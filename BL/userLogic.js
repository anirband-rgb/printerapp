var userData=require('../DL/userData')
module.exports={

        authlogin:async function(userObj)
        {
            return new Promise(async (resolve,reject) => {
                var result= await userData.authlogin(userObj)
                if(result.length>=1)
                {
                    resolve({"status":"success","id":result[0].id,'type':result[0].userType})
                }else{
                    resolve("login error")
                }


            })
        },

        createUser: async function(userObj)
        {
            return new Promise(async (resolve,reject) => {
                
                var createduser=await userData.createUser(userObj)
                console.log(createduser);

                //console.log(result);
               resolve({message:"user created",userId:createduser.insertId})

            })
        },

       

        

}