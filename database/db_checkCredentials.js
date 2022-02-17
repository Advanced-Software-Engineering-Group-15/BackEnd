class dataBaseHelper {

    constructor(userName, password){
        this.userName = userName;
        this.password = password;
        this.mysql = require('mysql');
        this.sql = "SELECT * FROM userAccountInfo WHERE username = ?";
        this.con = this.mysql.createConnection({
            host: "user-information-database.cl7ouywfgywl.eu-west-1.rds.amazonaws.com",
            port: 3306,
            user: "masterUsername",
            password: "password",
            database: "User_Information_Database"
        });
    }

    //returns true or false if credentials are in database
    get isValidCreds() {
        console.log("Querying database...");
        //return this.queryDatabase;
        this.con.connect(this.querydb());
    }

    querydb = function(err) {
        if (err) throw err;
        console.log("Connected!");
        //bug here, possibly need to download mysql on machine, possible coding issue
        this.con.query(this.sql, [this.userName], function (err, result) {
            if (err) {
                //This is is username is not found in Database 
                console.log("This username is not present: " + this.userName);
                return false;
            }
            // If Username found in Database
            console.log("Found User: " + this.userName);
            console.log(result[0].password) //Need the zero to access the column names like password
            if (result[0].password == this.password){
                console.log("Successful password")
                return true;
            }
            return false;
        });
    }
}
    
module.exports = dataBaseHelper;
