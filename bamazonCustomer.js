//_____________________________________________________________//
//-----------// PLEASE READ THE READ ME FILE //---------------//
//-----------------------------------------------------------//

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("easy-table");
var results = [];

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

showItemList();
//connection with database
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


// function for inquirer
function start() {
    inquirer
    .prompt([
        {
          name: "ID",
          type: "input",
          message: "Bamazon online store, please enter item ID number:"
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
     //to check if there is enough stock for transaction
            if(aQ < originalStock){
                connection.query("UPDATE items SET ? WHERE ?",
                [
                    {
                        stock_quantity : originalStock - aQ 
                    }, 

                    {
                        id : answer.ID
                    }
                ])
            }

            else {
                console.log("Insufficient Stock, Sorry!");
            }
        
//to run the function again
        showItemList();
    })

            
}

