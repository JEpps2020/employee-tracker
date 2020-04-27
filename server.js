var mysql = require("mysql");
var inquirer = require("inquirer");
var {prompt } =require("inquirer");
const cTable = require("console.table");
var roleArray=[];

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root@2020",
  database: "tracker_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  runMenu();
});

function runMenu() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["View", "Add", "Update", "Exit"]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View":
        console.log("You chose view")
        runView();
        // artistSearch();
        break;

      case "Add":
        console.log("You chose add")
        addAll();
        // multiSearch();
        break;

      case "Update":
        console.log("You chose update")
        runMenu();
        // rangeSearch();
        break;

      case "Exit":
          default:
              connection.end();
        // rangeSearch();
        break;  

      }
    });
}

function runView() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["View Departments","View Roles","View Employees","Exit"]
  })
    .then(function(answer) {
       switch (answer.action) {
          case "View Departments":
              var query = "SELECT * FROM department ORDER BY id";
              connection.query(query, function(err, res) {
                  console.log("                              ");
                  console.log("--- BEGINNING OF DEPARTMENTS ---");
                  console.log("                              ");
                  console.table(res);
                  console.log("                              ");
                  console.log("------ END OF DEPARTMENTS ------");
                  console.log("                              ");
                  runView();
              });
              break;
          case "View Roles":
              console.log("You chose View Roles");
              var query = "SELECT * FROM role ORDER BY id";
              connection.query(query, function(err, res) {
                  console.log("                          ");
                  console.log("------------- BEGINNING OF ROLES -----------");
                  console.log("                          ");
                  console.table(res);
                  console.log("                          ");
                  console.log("---------------- END OF ROLES --------------");
                  console.log("                          ");
                  runView();
              });
              break;
          case "View Employees":
              console.log("You chose View Employees");
              var query = "SELECT * FROM employee ORDER BY id";
              connection.query(query, function(err, res) {
                  console.table(res);
                  runView();
              });
              break;
          case "Exit":
          default:
              runMenu();
              break;
      }
  });
} 

function addAll() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to add?",
      choices: ["Add Department","Add Role","Add Employee","Exit"]
  })
    .then(function(answer) {
       switch (answer.action) {
          case "Add Department":
            addDepartment();
            
              break;
          case "Add Role":
            var query = "SELECT * FROM tracker_db.role";
            connection.query(query, function(err, res) {
            //console.log(res);
            console.log("inside add role");
            for(var i=0;i<res.length;i++){
              roleArray.push(res[i].department_id);
            }
            console.log("role array:"+ roleArray);
            addRole(roleArray);
            });
            
            
              break;
          case "Add Employee":
              console.log("You chose Add Employees");
              var query = "SELECT * FROM employee ORDER BY id";
              connection.query(query, function(err, res) {
                  console.table(res);
                  runView();
              });
              break;
          case "Exit":
          default:
              runMenu();
              break;
      }
  });
} 

function addDepartment(){
  console.log("inside add department");

  //ask q for inquire
  inquirer
  .prompt({
    name: "departmentname",
    type: "input",
    message: "What is your department name?",
}).then(function(answer){
  console.log(answer.departmentname);



            //communiate to db to add to do

            //tell user it is addedtable_name
              //var query = "INSERT INTO department (name) VALUES ("+answer.departmentname+");"
              //console.log(query);
              connection.query(
                "INSERT INTO department SET ?",
                {
                  name: answer.departmentname,
                },
                function(err, res) {
                  if (err) throw err;
                  console.log(res.affectedRows + " department inserted!\n");
                  // Call updateProduct AFTER the INSERT completes
                  console.log("check db");
                }
              )
            })
}

function addRole(roleArray) {


  //ask q for inquire
  
  inquirer
  .prompt(
    {
      type: "input",
      name: "title",
      message: "What is your title?"
    },
    
    {
      type: "input",
      name: "salary",
      message: "What is your desired salary?"
    },

    {
    name: "departmentrole",
    type: "list",
    choices: roleArray,
    message: "What id would you associate with the department?",
  }

).then(function(answer){
  console.log(answer.departmentrole);
  console.log(answer.title);
  console.log(answer.salary);

            //communiate to db to add to do

            //tell user it is addedtable_name
              // var query = "INSERT INTO department (name) VALUES ("+answer.departmentname+");"
              // console.log(query);
              // connection.query(
              //   "INSERT INTO role SET ?",
              //   {
              //     name: answer.departmentrole,
              //   },
              //   function(err, res) {
              //     if (err) throw err;
              //     console.log(res.affectedRows + " role inserted!\n");
              //     // Call updateProduct AFTER the INSERT completes
              //     console.log("check db");
              //   }
              // )
            })
}

// function runView() {
//     inquirer
//       .prompt({
//         name: "action",
//         type: "list",
//         message: "What would you like to do?",
//         choices: ["View Departments", "View Roles", "View Employees", "Exit"]
//       })
//            .then(function(answer) {
//             switch (answer.action) {
//             case "View Departments":
//                await viewDepartment();
//                 runMenu();


         
//           break;
  
//         case "View Roles":
//           console.log("You chose view roles")
//           runView();
//           break;
  
//         case "View Employees":
//           console.log("You chose view employees")
//           runView();
//           break;
  
//         case "Exit":
//             default:
//             runMenu();
//           break;  
  
//         }
//       });
//   }

//   async function viewDepartment(){
//     console.log("You chose View Departments");
//     var query = "SELECT * FROM department ORDER BY id";
//     connection.query(query, function(err, res) {  
//         //console.table(['id','name'],res);
//         return res;
//     });

//   }

  // function selectDept() {
//  
//       var query = "SELECT * FROM, department ORDER BY id"
//       connection.query(query, { artist: answer.artist }, function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
//         }
//         runSearch();
//       });
//     });
// }

// function runMenu() {
//   inquirer
//     .prompt({
//       name: "action",
//       type: "rawlist",
//       message: "What would you like to do?",
//       choices: [
//         "Find songs by artist",
//         "Find all artists who appear more than once",
//         "Find data within a specific range",
//         "Search for a specific song",
//         "Find artists with a top song and top album in the same year"
//       ]
//     })
//     .then(function(answer) {
//       switch (answer.action) {
//       case "Find songs by artist":
//         artistSearch();
//         break;

//       case "Find all artists who appear more than once":
//         multiSearch();
//         break;

//       case "Find data within a specific range":
//         rangeSearch();
//         break;

//       case "Search for a specific song":
//         songSearch();
//         break;

//       case "Find artists with a top song and top album in the same year":
//         songAndAlbumSearch();
//         break;
//       }
//     });
// }

// function artistSearch() {
//   inquirer
//     .prompt({
//       name: "artist",
//       type: "input",
//       message: "What artist would you like to search for?"
//     })
//     .then(function(answer) {
//       var query = "SELECT position, song, year FROM top5000 WHERE ?";
//       connection.query(query, { artist: answer.artist }, function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
//         }
//         runSearch();
//       });
//     });
// }

// function multiSearch() {
//   var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
//   connection.query(query, function(err, res) {
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].artist);
//     }
//     runSearch();
//   });
// }

// function rangeSearch() {
//   inquirer
//     .prompt([
//       {
//         name: "start",
//         type: "input",
//         message: "Enter starting position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       },
//       {
//         name: "end",
//         type: "input",
//         message: "Enter ending position: ",
//         validate: function(value) {
//           if (isNaN(value) === false) {
//             return true;
//           }
//           return false;
//         }
//       }
//     ])
//     .then(function(answer) {
//       var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
//       connection.query(query, [answer.start, answer.end], function(err, res) {
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             "Position: " +
//               res[i].position +
//               " || Song: " +
//               res[i].song +
//               " || Artist: " +
//               res[i].artist +
//               " || Year: " +
//               res[i].year
//           );
//         }
//         runSearch();
//       });
//     });
// }

// function songSearch() {
//   inquirer
//     .prompt({
//       name: "song",
//       type: "input",
//       message: "What song would you like to look for?"
//     })
//     .then(function(answer) {
//       console.log(answer.song);
//       connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
//         console.log(
//           "Position: " +
//             res[0].position +
//             " || Song: " +
//             res[0].song +
//             " || Artist: " +
//             res[0].artist +
//             " || Year: " +
//             res[0].year
//         );
//         runSearch();
//       });
//     });
// }

// function songAndAlbumSearch() {
//   inquirer
//     .prompt({
//       name: "artist",
//       type: "input",
//       message: "What artist would you like to search for?"
//     })
//     .then(function(answer) {
//       var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
//       query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
//       query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year, top_albums.position";

//       connection.query(query, [answer.artist, answer.artist], function(err, res) {
//         console.log(res.length + " matches found!");
//         for (var i = 0; i < res.length; i++) {
//           console.log(
//             i+1 + ".) " +
//               "Year: " +
//               res[i].year +
//               " Album Position: " +
//               res[i].position +
//               " || Artist: " +
//               res[i].artist +
//               " || Song: " +
//               res[i].song +
//               " || Album: " +
//               res[i].album
//           );
//         }

//         runSearch();
//       });
//     });
// }
