class dataBaseHelper {

    constructor(userName, password){
        this.userName = userName.toString();
        this.password = password.toString();
        this.mysql = require('mysql');
    }

    //returns true or false if credentials are in database
    get isValidCreds() {
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

        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            con.query(sql, [user.userName], function (err, result) {
                if (err) {
                    //This is is username is not found in Database 
                    console.log("This username is not present: ", user.userName);
                    return false;
                }
                // If Username found in Database
                console.log("Found User: ", user.userName);
                if (result[0].password == user.password){
                    console.log("Successful password")
                    return true;
                }
                return false;
            });
        });
    }
}
    
module.exports = dataBaseHelper;
