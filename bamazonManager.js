//_____________________________________________________________//
//-----------// PLEASE READ THE READ ME FILE //---------------//
//-----------------------------------------------------------//

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");
var result = [];
var newPrice;


//connection with database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Pollito#2",
    database: "bamazon"
});
start();

function connectionDb() {
    connection.query("SELECT * FROM items", function (err, result, fields) {
        if (err){ 
            console.error(err.message);
        }
        })
    }
//function to show products
function showItemList() {
    console.log("Welcome Back!");
    connection.query("SELECT * FROM items", function (err, result, fields) {
        if (err){ 
            console.error(err.message);
        }

    // creating a table
    results = result;
    var t = new Table

    results.forEach(function(product) {
        t.cell('Item Id', product.id)
        t.cell('Description', product.product_name) 
        t.cell('Category', product.department_name)
        t.cell('Price, USD', product.price)
        t.cell('Stock', product.stock_quantity)
        t.newRow()
    })
    console.log(t.toString())
    start();
    });

}

// function to see low inventory
function showItemList2(callback) {
    console.log("Low stock below!");
    connection.query("SELECT * FROM items WHERE stock_quantity < 100 ", function (err, result, fields) {
        if (err){ 
            console.error(err.message);
        }

    // creating a table
    results = result;
    var t = new Table

    results.forEach(function(product) {
        t.cell('Item Id', product.id)
        t.cell('Description', product.product_name) 
        t.cell('Category', product.department_name)
        t.cell('Price, USD', product.price)
        t.cell('Stock', product.stock_quantity)
        t.newRow()
    })
    console.log(t.toString())
    callback();
    });
}

//to start the functions for manager
function start() {
    
    inquirer
    .prompt([
        {
            name: "managerSite",
            type: "list",
            message: "Please select an option:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]
          },
    ])
    .then(function(answer){
        if (answer.managerSite === "View Products for Sale"){
            showItemList();
        }


        else if (answer.managerSite === "View Low Inventory"){
           showItemList2(start);
        }


        else if (answer.managerSite === "Add to Inventory"){
            showItemList2(addStock);   
         }

        else if (answer.managerSite === "Add New Product"){
            showItemList2(addNewProduct);
        }

        else if (answer.managerSite === "EXIT"){
            
            connection.end();
        }

    })
}

    //function to add new product
function addStock(){
    inquirer
    .prompt([
        {
          name: "ID",
          type: "List",
          message: "Please select ID :"
        },
        {
          name: "quantity",
          type: "input",
          message: "Please enter quantity: "
        }
    ])
    //to update data base afer a transaction
    .then(function(answer){

        var aQ = Number(answer.quantity);
        var item = results.filter(function(item){
            return item.id == answer.ID; 
        })
            var originalStock = item[0].stock_quantity;

     //to add more stock 
            
                connection.query("UPDATE items SET ? WHERE ?",
                [
                    {
                        stock_quantity : originalStock + aQ 
                    }, 

                    {
                        id : answer.ID
                    }
                ])
                console.log(aQ + "_Stock added to ID # " + answer.ID);
                console.log("_____________________________________________");
              start();


    })


 };


    // function to add more stock
function addNewProduct(){
        //connectionDb();
        inquirer
    .prompt([
        {
          name: "name",
          type: "input",
          message: "Add product name:"
        },

        {
            name: "department",
            type: "input",
            message: "Please enter category: "
          },

        {
          name: "Price",
          type: "number",
          message: "Please enter price: "
        },

        {
            name: "Stock",
            type: "number",
            message: "Please enter initial stock: "
        }

    ])
    //to update data base afer a transaction
    .then(function(answer){
        var newNumber = parseFloat(answer.Price);
        connection.query("INSERT INTO items (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)",
        
        [ 
            answer.name, 
            answer.department, 
            newNumber, 
            answer.Stock
        ])
        console.log("done");
        start();
        
    })
}

    