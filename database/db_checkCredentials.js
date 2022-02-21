
class dataBaseHelper {

    constructor(userName, password){
        this.userName = userName.toString();
        this.password = password.toString();
        this.mysql = require('mysql');
        this.status = new Boolean();
    }

    //returns true or false if credentials are in database
    async isValidCreds() {
        var sql = "SELECT * FROM userAccountInfo WHERE username = ?";
        console.log("Querying database: Username: ", this.userName, ", Password: ", this.password);
        const con = this.mysql.createConnection({
            host: "user-information-database.cl7ouywfgywl.eu-west-1.rds.amazonaws.com",
            port: 3306,
            user: "masterUsername",
            password: "password",
            database: "User_Information_Database"
        });

        var user = {
            userName: this.userName,
            password: this.password
        };

        await new Promise((resolve) => {
            con.connect(function(err) {
                if (err) throw err;
                console.log("Connected!");
                con.query(sql, [user.userName], function (err, result) {
                    if (err) {
                        //This is is username is not found in Database 
                        console.log("This username is not present: ", user.userName);
                        return resolve(false)
                    }
                    if (result[0] == undefined){
                        console.log("result is undefined");    
                        return resolve(false)
                    }
                    // If Username found in Database
                    console.log("Found User: ", user.userName);
                    if (result[0].password == user.password){
                        console.log("Valid password for ", user.userName)
                        return resolve(true)
                    }
                    else{
                        return resolve(false)
                    }
                  
                });
            });
        }).then((status) => {
            console.log('Is login details valid? ', status);
            this.status = status;
            return this.getStatus;
        })
    }

    get getStatus(){
        return this.status;
    }
}
    
module.exports = dataBaseHelper;
