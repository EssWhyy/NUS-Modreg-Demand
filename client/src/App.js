import React, {useState} from 'react';
import './App.css';
import ButtonAppBar from './components/navbar.js';
import EnhancedTable from './components/table.js';
import TestButton from './components/testbutton.js';


function App() {
  const currentRows = [
    {name:'Cupcake', modcode:305, roundzero:3.7, roundone:67, roundtwo:4.3},
    {name:'Donut', modcode:452, roundzero:25.0, roundone:51, roundtwo:4.9},
    {name:'Eclair', modcode:262, roundzero:16.0, roundone:24, roundtwo:6.0}
  ];
  
  const [tableRows, setTableRows] = useState(currentRows)


  const addRow = () => {
    var row = {name:'a', modcode:1, roundzero:1, roundone:1, roundtwo:1}
    var newArray = currentRows.slice()
    if (!newArray.includes(row)){
      newArray.push(row)
      console.log(newArray)
      setTableRows(newArray)
    }
  }

  return (
    <div className="App">
      <ButtonAppBar></ButtonAppBar>
      <header className="App-header">     

        <button onClick={addRow}>Add a Module</button>

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <EnhancedTable inputRows={tableRows}></EnhancedTable>
      </header>
    </div>
  );
}

export default App;
