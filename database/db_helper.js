var bodyParser = require('body-parser');
const fileSystem = require("fs");
const { userInfo } = require('os');


class dataBaseHelper {

    constructor(props){
        this.userName = props.userName.toString();
        this.password = props.password.toString();
        this.email = props.email.toString();
        this.name = props.name.toString();
        this.rating = props.rating.toString();
        this.userId = props.userId.toString(); //may or may not be a number or string
        this.journeyID = props.journeyID.toString();
        this.journeyType = props.journeyType.toString();
        this.startName = props.startName.toString();
        this.startLat = props.startLat.toString();
        this.startLong = props.startLong.toString();
        this.endName = props.endName.toString();
        this.endLat = props.endLat.toString();
        this.endLong = props.endLong.toString();
        this.currency = props.currency.toString();
        this.cost = props.cost.toString();
        this.creatorID = props.creatorID.toString();
        this.creatorRating = props.creatorRating.toString();      
        this.capacity = props.capacity;
        this.mysql = require('mysql');
        this.status = new Boolean();
        this.userInfo = {}
    }

    //add props to database, set status as true or false if operation was successful
    async insertUserIntoDatabase() {
        var sql = "INSERT INTO userAccountInfo (name, username, email, password, rating) VALUES ?";
        console.log("Adding to database: name: ", this.name, 
                    ", username: ", this.userName, 
                    ", email: ",this.email, 
                    ", password: ",this.password, 
                    ", rating: ",this.rating)
        
        var con = this.mysql.createConnection({
            host: "user-information-database.cl7ouywfgywl.eu-west-1.rds.amazonaws.com",
            port: 3306,
            user: "masterUsername",
            password: "password",
            database: "User_Information_Database"
        });
        var values = [
            [this.name, 
            this.userName, 
            this.email, 
            this.password, 
            this.rating, 
            this.capacity]
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


    async insertJourneyIntoDatabase() {
        var sql = "INSERT INTO journeyListFormat (journeyID, journeyType, startName, startLat, startLong, endName, endLat, endLong, currency, cost, creatorID, creatorRating, capacity) VALUES ?";
        console.log("Adding to database: journeyID: ", this.journeyID, ", journeyType: ", this.journeyType, ", startName: ",this.startName, ", endName: ",this.endName, ", cost: ",this.cost, ", capacity: ",this.capacity)
        //(journeyID, journeyType, startName, startLat, startLong, endName, endLat, endLong, currency, cost, creatorID, creatorRating)
        var con = this.mysql.createConnection({
            host: "user-information-database.cl7ouywfgywl.eu-west-1.rds.amazonaws.com",
            port: 3306,
            user: "masterUsername",
            password: "password",
            database: "User_Information_Database"
        });
        var values = [
            [   this.journeyID,
                this.journeyType,
                this.startName,
                this.startLat,
                this.startLong,
                this.endName,
                this.endLat,
                this.endLong,
                this.currency,
                this.cost,
                this.creatorID,
                this.creatorRating,
                this.capacity  ]
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
            console.log('Is new journey added to database ', status);
            this.status = status;
            return this.getStatus;
        });
    }


    async insertParticipantIntoJourney() {
        var sql = "INSERT INTO journeyListFormat (journeyID, journeyType, startName, startLat, startLong, endName, endLat, endLong, currency, cost, creatorID, creatorRating) VALUES ?";
        
        var con = this.mysql.createConnection({
            host: "user-information-database.cl7ouywfgywl.eu-west-1.rds.amazonaws.com",
            port: 3306,
            user: "masterUsername",
            password: "password",
            database: "User_Information_Database"
        });
        var values = [
            [   this.journeyID, //journey to add participant to
                this.userID, //participant to add
             ]
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
            console.log('Is new journey added to database ', status);
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

                        this.userName = result[0].username
                        this.email = result[0].email
                        this.name = result[0].name
                        this.rating = result[0].rating
                        this.userId = result[0].id

                        const userInfo = {
                            'username': this.userName,
                            'email': this.email, 
                            'name': this.name,
                            'rating': this.rating,
                            'userID': this.userId
                        }
                        console.log(userInfo)

                        return resolve([true, userInfo])
                    }
                    else{
                    return resolve([false, {}])
                    }
                  
                });
            });
        }).then((response) => {
            console.log('Is login details valid? ', response[0]);
            console.log('user info passed:', response[1])
            this.userInfo = response[1]
            this.status = response[0];
            return this.getStatus, this.getUserInfo;
        })
    }

    async getAllJourneys(){
        var sql = "SELECT * FROM User_Information_Database.journeyListFormat;"

        const con = this.mysql.createConnection({
            host: "user-information-database.cl7ouywfgywl.eu-west-1.rds.amazonaws.com",
            port: 3306,
            user: "masterUsername",
            password: "password",
            database: "User_Information_Database"
        });

        await new Promise((resolve) => {
            con.connect(function(err) {
                if (err) throw err;
                console.log("Connected for get all journeys!");
                con.query(sql, function (err, result) {
                    if (err) {
                        console.log("Database can't be accessed: ");
                        return resolve(false)
                    }
                    if (result[0] == undefined){
                        console.log("result is undefined");    
                        return resolve(false)
                    }
                    console.log("Found get all journeys data: ", result);
                    if (result){
                        const exJourneys = { "exJourneys": [] };

                        for (let i = 0; i < result.length; i++) {
                            exJourneys.exJourneys.push(result[i])
                          }
                        fileSystem.writeFile("./exJourneys.json", JSON.stringify(exJourneys, null, 2), err=>{
                            if(err){
                              console.log("Error writing file" ,err)
                            } else {
                              console.log('JSON data is written to exJourneys file successfully')
                            }
                        })                       
                        return resolve(true)
                    }
                    else{
                        return resolve(false)
                    } 
                });
            });
        }).then((status) => {
            console.log('Is database valid? ', status);
            this.status = status;
            return this.getStatus;
        })
    }

    async getAllPassengers(){
        var sql = "SELECT * FROM User_Information_Database.addingUsers;"

        const con = this.mysql.createConnection({
            host: "user-information-database.cl7ouywfgywl.eu-west-1.rds.amazonaws.com",
            port: 3306,
            user: "masterUsername",
            password: "password",
            database: "User_Information_Database"
        });

        await new Promise((resolve) => {
            con.connect(function(err) {
                if (err) throw err;
                console.log("Connected for get all passengers!");
                con.query(sql, function (err, result) {
                    if (err) {
                        console.log("Database can't be accessed: ");
                        return resolve(false)
                    }
                    if (result[0] == undefined){
                        console.log("result is undefined");    
                        return resolve(false)
                    }
                    console.log("Found get all passengers data: ", result);
                    if (result){
                        const exPassengers = { "exPassnengers": [] };

                        for (let i = 0; i < result.length; i++) {
                            exPassengers.exPassengers.push(result[i])
                          }
                        fileSystem.writeFile("./exPassengers.json", JSON.stringify(exPassengers, null, 2), err=>{
                            if(err){
                              console.log("Error writing file" ,err)
                            } else {
                              console.log('JSON data is written to exPassengers file successfully')
                            }
                        })                       
                        return resolve(true)
                    }
                    else{
                        return resolve(false)
                    } 
                });
            });
        }).then((status) => {
            console.log('Is database valid? ', status);
            this.status = status;
            return this.getStatus;
        })
    }

    //gets the status of the last query, whether its true or false
    get getStatus(){
        return this.status;
    }

    get getUserInfo(){
        console.log('YO PROPS ARE', this.userInfo)
        
        return this.userInfo
    }
}
    
module.exports = dataBaseHelper;
