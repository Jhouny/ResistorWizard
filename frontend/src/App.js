import React, { useState } from 'react';
import './App.css';

function App() {
    const [resistances, setResistances] = useState([]);

    const handleInputChange = (index, value) => {
      setResistances((prevResistances) => {
          const updatedResistances = [...prevResistances];
          updatedResistances[index] = value;
          return updatedResistances;
      });
  };

    const handleSubmit = async () => {
      console.debug(resistances);
      console.debug(JSON.stringify(resistances));
         try {
             const response = await fetch('/api/send_resistances', {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify(resistances),
             });

             if (response.ok) {
                 alert('Resistances sent successfully');
             } else {
                 alert('Error sending resistances');
             }
         } catch (error) {
             console.error('Error:', error);
             alert('An error occurred');
         }
    };

    return (
      <div className="App">
        <div className="wizard-icon">🧙‍♂️</div>
        <h1 className="title">Resistor Wizard ⚡</h1>          
        {[1, 2, 3, 4, 5, 6].map((index) => (
              <div className="input-container" key={index}>
                  <label htmlFor={`resistance${index}`}>Resistance {index}</label>
                  <input
                      type="text"
                      name={`resistance${index}`}
                      onChange={(event) => handleInputChange(index - 1, event.target.value)}
                  />
              </div>
          ))}
          <button onClick={handleSubmit}>Submit</button>
      </div>
  );
}

export default App;
