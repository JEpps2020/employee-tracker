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

// async function init() {

//   try {

//     //const allRoleArray = await showAllRoles();
//     addRole()
//     // .then(function(res){
//     //   //once we get data from role we need to add this res data to mysql
//     // });

//   }
//   catch (err) {
//       console.log(err);
//     }
//   }


function addRole() {
  var depts = [];
    var query = `SELECT name FROM DEPARTMENT ORDER BY id`;
    connection.query(query, function(err, res) 
    {  
        for (var i = 0; i < res.length; i++) 
        {  
            depts.push(res[i].name); 
        }
        inquirer.prompt([
        {
            name: "dept",
            type: "list",
            message: "What department would you like to add the role to?",
            choices: depts
        },
        {
            name: "roleName",
            type: "input",
            message: "What role would like to add?"
        },
        {
            message: "What is the salary for this role?",
            type: "input",
            name: "salary"
        }
        ])
        .then(function({dept,roleName,salary}) 
        {       
            var query = `INSERT INTO ROLE (title, salary, department_id) VALUES ("${roleName}",${salary},`;
                query += `(select id from department where name = "${dept}"));`
                console.log(query);
            connection.query(query, function(err, res) 
            {
                console.log("                                                                ");
                console.log("----------------------------------------------------------------");
                console.log(`        Role of ${roleName} has been added to database.         `);
                console.log(`With a salary of ${salary} to the following department: ${dept}`);
                console.log("----------------------------------------------------------------");
                console.log("                                                                ");
                runMenu();
            });
        });
    });
}

function runMenu() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["View", "Add Department", "Add Role", "Add Employee", "Update", "Exit"]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View":
        console.log("You chose view")
        runView();
        // artistSearch();
        break;

      case "Add Department":
      console.log("You chose add departments")
      addDepartment();
      break;

      case "Add Role":
      console.log("You chose add role")
      addRole();
      break;

      case "Add Employee":
      console.log("You chose add employee")
      addEmployee();
      break;

      case "Update":
      console.log("You chose update")
      runMenu();
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

// function addAll() {
//   inquirer
//     .prompt({
//       name: "action",
//       type: "list",
//       message: "What would you like to add?",
//       choices: ["Add Department","Add Role","Add Employee","Exit"]
//   })
//     .then(function(answer) {
//        switch (answer.action) {
//           case "Add Department":
//             addDepartment();
            
//               break;
//           case "Add Role":
            
//             init();
            
//               break;
//           case "Add Employee":
//               console.log("You chose Add Employees");
//               var query = "SELECT * FROM employee ORDER BY id";
//               connection.query(query, function(err, res) {
//                   console.table(res);
//                   runView();
//               });
//               break;
//           case "Exit":
//           default:
//               runMenu();
//               break;
//       }
//   });
// } 

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
                  runMenu();
                }
              )
            })
}

function addEmployee()
{
    var dept = [];
    var roles = ["None"];
    var rolesId = [];
    var managers = ["None"];
    var managersId = [];
    var chosenDept = "";
    var chosenRoleId = 0;
    var chosenDeptId = 0;
        
    var queryDepts = `SELECT name FROM DEPARTMENT ORDER BY id`;
    connection.query(queryDepts, function(err, res) 
    {
        for (var i = 0; i < res.length; i++) 
        {  
          dept.push(res[i].name); 
        }
        inquirer.prompt(
        {
            name: "dept",
            type: "list",
            message: "What department would you like to add the employee to?",
            choices: dept
        })
        .then(function({dept})  
        {
            chosenDept = dept;
            var queryRoles = `SELECT id, title, department_id FROM ROLE WHERE department_id = `;
            queryRoles += `(SELECT id FROM DEPARTMENT WHERE name = "${dept}");`;
            console.log(queryRoles);
            connection.query(queryRoles, function(err, res)
            {
                for (var z = 0; z < res.length; z++)
                { 
                    roles.push(res[z].title); 
                    rolesId.push({id: res[z].id,
                    title: res[z].title,
                    department_id: res[z].department_id});
                }
                var queryManagers = `SELECT id, first_name, last_name FROM EMPLOYEE WHERE manager_id IS NULL`;
                    queryManagers += ` AND role_id IN (SELECT id FROM role WHERE department_id = `;
                    queryManagers += `(SELECT id FROM department WHERE name = "${chosenDept}"));`;
                console.log(queryManagers);       
                connection.query(queryManagers, function(err, res) 
                {   
                    for (var y = 0; y < res.length; y++)
                    {
                        managers.push(res[y].first_name+" "+res[y].last_name);
                        managersId.push({id: res[y].id,
                                         first_name: res[y].first_name,
                                         last_name: res[y].last_name});
                    }
                
                    inquirer.prompt(
                    [{
                        name: "managers",
                        type: "list",
                        message: "Who will be the employee's manager?",
                        choices: managers
                    },
                    {  
                        name: "roles",
                        type: "list",
                        message: "What role would you like to the employee to have?",
                        choices: roles
                    },
                    {
                        name: "firstName",
                        type: "input",
                        message: "What is the first name of the employee?"
                    },
                    {
                        name: "lastName",
                        type: "input",
                        message: "What is the last name of the employee?"
                    }])
                    .then(function({managers,roles,firstName,lastName}) 
                    {
                        for (var x = 0; x < rolesId.length; x++)
                        {
                            if (rolesId[x].title === roles)
                            {
                                chosenRoleId = rolesId[x].id;
                                chosenDeptId = rolesId[x].department_id;
                            }
                        }    
                        var managerName = managers.split(" ");
                         
                        if (roles === "None" && managers === "None")
                        {
                            var insertQuery = `INSERT INTO employee(first_name, last_name)`;
                                insertQuery += `VALUES ("${firstName}", "${lastName}");`
                        }    
                        else if (roles !== "None" && managers === "None")
                        {
                            var insertQuery = `INSERT INTO employee(first_name, last_name, role_id)`; 
                                insertQuery += `VALUES ("${firstName}", "${lastName}", ${chosenRoleId});`;
                        }    
                        else if (roles !== "None" && managers !== "None") {    
                        for (var i = 0; i < managersId.length; i ++)
                            {
                            if ((managerName[0] === managersId[i].first_name) && (managerName[1] === managersId[i].last_name))
                                {
                                chosenManagerId = managersId[i].id;
                                break;
                                }
                            }
                            var insertQuery = `INSERT INTO employee(first_name, last_name, role_id, manager_id) `;
                            insertQuery += `VALUES ("${firstName}", "${lastName}", ${chosenRoleId}, ${chosenManagerId});`;
                        }
                        
                        console.log(insertQuery);
                        connection.query(insertQuery, function(err, res)
                        {
                            console.log(`                                                                `);
                            console.log(`----------------------------------------------------------------`);
                            console.log(`        Employee: ${firstName} ${lastName}                      `);
                            console.log(`        Role: ${roles}                                          `);
                            console.log(`        Department: ${chosenDept}                               `);
                            console.log(`        Has Been Added To The Database                          `);
                            console.log(`----------------------------------------------------------------`);
                            console.log(`                                                                `);
                            runMenu();
                        });
                    });
                });
            });
        }); 
    });
}

// async function addRole(roleArray) {

//   const depts = await roleArray;

//   console.log(depts);

//   //ask q for inquire
  
//   inquirer
//   .prompt(
//     {
//       type: "input",
//       name: "title",
//       message: "What is your title?"
//     },
    
//     {
//       type: "input",
//       name: "salary",
//       message: "What is your desired salary?"
//     },

//     {
//     name: "departmentrole",
//     type: "list",
//     choices: depts,
//     message: "What id would you associate with the department?",
//   }

// ).then(function(answer){
//   console.log(answer.departmentrole);
//   console.log(answer.title);
//   console.log(answer.salary);

//             //communiate to db to add to do

//             //tell user it is addedtable_name
//               // var query = "INSERT INTO department (name) VALUES ("+answer.departmentname+");"
//               // console.log(query);
//               // connection.query(
//               //   "INSERT INTO role SET ?",
//               //   {
//               //     name: answer.departmentrole,
//               //   },
//               //   function(err, res) {
//               //     if (err) throw err;
//               //     console.log(res.affectedRows + " role inserted!\n");
//               //     // Call updateProduct AFTER the INSERT completes
//               //     console.log("check db");
//               //   }
//               // )
//             })
// }

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

