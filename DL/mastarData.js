var mysql=require('mysql')
module.exports= {

    connect: async function(flag)
    {
        console.log("creating connection");
        var pool  =await mysql.createPool({
            connectionLimit : 100,
            host            : 'leadsoft.in',
            user            : 'leadsoft',
            password        : '@7$T2CuNfu',
            database        : 'leadsoft_printers'
          });
          return pool;
    }
}
