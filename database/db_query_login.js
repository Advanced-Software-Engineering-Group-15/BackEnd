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
  var sql = "SELECT * FROM userAccountInfo WHERE username = ?";
  var input_username = user.userName;
  var input_password = user.password;
  con.query(sql, [input_username], function (err, result) {
    if (err) {
		//This is is username is not found in Database 
		console.log("This username is not present: " + input_username);
		throw err;
	}
	// If Username found in Database
    console.log("Found User: " + input_username);
    console.log(result[0].password) //Need the zero to access the column names like password
    if (result[0].password == input_password){
      console.log("Successful password")
    }
    //Return Allow to login flag 

  });
});