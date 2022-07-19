import React, {useState} from 'react';
import './App.css';
import ButtonAppBar from './components/navbar.js';
import EnhancedTable from './components/table.js';


function App() {

  //Table Data Section
  const currentRows = [
    {name:'Cupcake', modcode:305, roundzero:3.7, roundone:67, roundtwo:4.3},
    {name:'Donut', modcode:452, roundzero:25.0, roundone:51, roundtwo:4.9},
    {name:'Eclair', modcode:262, roundzero:16.0, roundone:24, roundtwo:6.0}
  ];
  
  const [tableRows, setTableRows] = useState(currentRows)

  //adds row from search bar
  const addRow = () => {
    var row = {name:'a', modcode:1, roundzero:1, roundone:1, roundtwo:1}
    var newArray = currentRows.slice()
    if (!newArray.includes(row)){
      newArray.push(row)
      console.log("Row Added to Table")
      setTableRows(newArray)
    }
  }

  return (
    <div className="App">
      <ButtonAppBar></ButtonAppBar>
      <header className="App-header">     

        <button onClick={addRow}>Add a Module</button>

        <p>
          Check Module Demand for NUS Modules from ModReg Round 0-3
          Current Semester: AY22/23 Sem 1
        </p>

        <EnhancedTable inputRows={tableRows} delRows={setTableRows}></EnhancedTable>
      </header>
    </div>
  );
}

export default App;
