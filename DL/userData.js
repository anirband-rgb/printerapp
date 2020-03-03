var mastar=require('./mastarData')
var md5 = require('md5'); 
module.exports={

    login:async function(userObj)
    {
        return new Promise(async (resolve,reject) => {
        var connection=await mastar.connect()

            console.log("after connection user");
            var password=md5(userObj.password)
            console.log(password);
        connection.query('SELECT * FROM users where emailAddress=? and password=?',[userObj.emailAddress,password], function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results);
            console.log(results.length)
            resolve(results)
           
            
          });
        })

    },

    createUser:async function(userObj)
    {
        return new Promise(async (resolve,reject) => {
        var pool=await mastar.connect()
            console.log("inside Create user DAL")

            var sql ='INSERT INTO users SET  emailAddress="'+userObj.emailAddress+'",password="'+md5(userObj.password)+'", phoneNumber="'+userObj.phoneNumber+'" ,location="'+userObj.location+'", qualification="'+userObj.qualification+'", experience="'+userObj.experience+'",icardId="'+userObj.icardId+'",resumeId="'+userObj.resumeId+'"';
 
            pool.getConnection(async function(err, connection) {
                connection.beginTransaction(function(err) {
                    if (err) { throw err; }
                    connection.query(sql, [], function (error, results, fields) {
                      if (error) {
                        return connection.rollback(function() {
                          throw error;
                        });
                      }
                   
                      var userId =  results.insertId ;
                      (userObj.skills).forEach(element => { 
                     connection.query('INSERT INTO userSkills SET userId=?,skill=?', [userId,element.skillName], function (error, results, fields) {
                            if (error) {
                              return connection.rollback(function() {
                                throw error;
                              });
                            }
                         
        
        
                          }); 
                      });
                  
                   
        
        
                      connection.commit(function(err) {
                        if (err) {
                          return connection.rollback(function() {
                            throw err;
                          });
                        }
                        resolve({userId:userId,Message:"user Created successfully"});
                      });
                    });
                  });
        
        
                })





        // connection.query(sql, function (error, results, fields) {
        //     if (error) throw error;
        //     console.log('The solution is: ', results);
           
        //     resolve(results)
        //   });
        })

    },
  
    



    
}