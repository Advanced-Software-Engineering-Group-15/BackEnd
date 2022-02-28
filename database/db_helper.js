
class dataBaseHelper {

    constructor(props){
        this.userName = props.userName.toString();
        this.password = props.password.toString();
        this.email = props.email.toString();
        this.name = props.name.toString();
        this.rating = Number(props.rating);
        this.userId = props.userId.toString(); //may or may not be a number or string
        this.mysql = require('mysql');
        this.status = new Boolean();
    }

    //add props to database, set status as true or false if operation was successful
    async insertIntoDatabase() {
        var sql = "INSERT INTO userAccountInfo (name, username, email, password, rating) VALUES ?";
        console.log("Adding to database: name: ", this.name, ", username: ", this.userName, ", email: ",this.email, ", password: ",this.password, ", rating: ",this.rating)
        
        var con = this.mysql.createConnection({
            host: "user-information-database.cl7ouywfgywl.eu-west-1.rds.amazonaws.com",
            port: 3306,
            user: "masterUsername",
            password: "password",
            database: "User_Information_Database"
        });
        var values = [
            [this.name, this.userName, this.email, this.password, this.rating]
        ];
        await new Promise((resolve) => {
            con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            console.log(values);
            con.query(sql, [values], function (err, result) {
                if (err) throw err;
                if (result == undefined){
                    console.log("Could not insert into database")
                    return resolve(false)
                }
                console.log("Number of records inserted: " + result.affectedRows);
                return resolve(true)
            });
            });
        }).then((status) => {
            console.log('Is new user added to database ', status);
            this.status = status;
            return this.getStatus;
        });
    }

    //checks if credentials are in database, sets status true or false depending
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

    //gets the status of the last query, whether its true or false
    get getStatus(){
        return this.status;
    }
}
    
module.exports = dataBaseHelper;
