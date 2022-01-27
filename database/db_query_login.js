// This File will take in a User login request and test it against the user database 
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "user-information-database.cl7ouywfgywl.eu-west-1.rds.amazonaws.com",
    port: 3306,
    user: "masterUsername",
    password: "password",
    database: "User_Information_Database"
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "SELECT * FROM userAccountInfo WHERE username=";
  
  
  
  var username str(input_username);
  
  let text1 = "sea";
  let text2 = "food";
  let result = text1.concat(text2);
  
  sql = sql.concat(username)
  
  
  con.query(sql, function (err, result) {
    if (err) {
		//This is is username is not found in Database 
		console.log("This username is not present: " + username);
		throw err;
	}
	// If Username found in Database
    console.log("Found User: " + username);
	
	//Return Allow to login flag 
	
	
  });
});