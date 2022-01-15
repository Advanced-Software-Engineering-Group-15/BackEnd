var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Adv_sofT_1!",
  database: "JourneySharingDatabase"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO userdata (name, username, email, password, rating) VALUES ?";
    var values = [
      ['Joe Bloggs', 'jim_b99', 'joe@mail.com', 'LetMeIn', '4.0'],
      ['Rachel Brady', 'rachel_b55', 'rach@mail.com', 'vRoomvRoom', '4.8'],
      ['Sean Cahill', 'scahi11', 'seancah2@mail.com', 'haCKer22', '3.5'],
      ['Grace Sheehan', 'grac3_ful', 'gracey@mail.com', 'duBlin72', '4.2']
 //     ['John', 'Highway 72'],
  //    ['Peter', 'Lowstreet 5'],
  //    ['Amy', 'Apple st 653'],
  //    ['Hannah', 'Mountain 22'],
  //    ['Michael', 'Valley 346'],
   //   ['Sandy', 'Ocean blvd 3'],
   //   ['Betty', 'Green Grass 2'],
  //    ['Richard', 'Sky st 332'],
  //    ['Susan', 'One way 99'],
   //   ['Vicky', 'Yellow Garden 3'],
   //   ['Ben', 'Park Lane 39'],
    //  ['William', 'Central st 955'],
   //   ['Chuck', 'Main Road 990'],
    //  ['Viola', 'Sideway 1634']
    ];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });
  });