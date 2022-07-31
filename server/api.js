const express = require("express");
const axios = require("axios");
const { Connection, Request } = require("tedious");

const app = express();
const port = 3001;

var ModsNumber = 0;
var rows = []

// Create connection to database
const config = {
    authentication: {
      options: {
        userName: "esswhyy",
        password: "FgfkX2H9gH#6H!$s"
      },
      type: "default"
    },
    server: "esswhyy.database.windows.net",
    options: {
      database: "modules",
      encrypt: true
    }
  };


const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  } else {
    queryDatabase();
  }
});

connection.connect();


function queryDatabase() {
    console.log("Reading rows from the Table...");
    
    // Read all rows from table

    const request = new Request(
      `SELECT TOP 2 modname, modcode, roundzero, roundone, roundtwo
       FROM [dbo].[MODULES]`,
      (err, rowCount) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${rowCount} row(s) returned`);
        }
      }
    );
    
    console.log("flan")

    //response is an array of json objects corresponding to database rows
    //we reformat this response to give only the columns and values, no metadata.
    try{
      request.on("row", columns => {
      var rowObject = {modname:'', modcode: '', roundzero: 0, roundone: 0, roundtwo: 0}
      console.log(columns)

      columns.forEach(column => {
        console.log("%s\t%s", column.metadata.colName, column.value);
        rowObject[column.metadata.colName] = column.value
        rows.push(rowObject)
      });
    });
    
    connection.execSql(request);
  }
    catch(err){
      console.log(err.errors)
    }
    
  
    
  }




const getMods = () => {
    try {
        return axios.get('https://api.nusmods.com/v2/2022-2023/moduleList.json')
    } catch (error) {
        console.error(error)
    }
}

const countMods = async () => {
    const mods = getMods()
        .then(response => {
            console.log("Status code: ", response.status)
            if (response.data) {
                console.log(
                    `Got ${Object.entries(response.data).length} mods`
                )
                ModsNumber = Object.entries(response.data).length
            }
        })
        .catch(error => {
            console.log(error)
        })
}

countMods();

app.get('/api', (req, res) => {
    res.json({numberOfMods: ModsNumber, moduleDemandData: rows});
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});