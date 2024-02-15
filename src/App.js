import logo from './logo.svg';
import './App.scss';
import React, { useEffect, useState } from 'react';
import DreeProContainer from './components/containers/DreeProContainer';
import DreeMap from './components/dreemap/DreeMap';
import LaundryPro from './models/LaundryPro';

function App() {
  const [zipCode, setZipCode] = useState('84601');
  const [laundryProsData, setLaundryProsData] = useState(null);
  const [currentCoords, setCurrentCoords] = useState(null);

  const fetchData = async (zip) => {
    setLaundryProsData(null);
    if (zip) {
      try {
        const response = await fetch(
          'https://us-west3-dree-dev-001.cloudfunctions.net/app/externalApi/search/?zip=' +
          zip
        );
        const data = await response.json();
        let dreeProArray = [];
        if (response.ok) {
          data['pros'].forEach((pro) => {
            dreeProArray.push(new LaundryPro(pro));
          });
          const coords = {
            lat: parseFloat(data.zipinfo.latitude),
            lng: parseFloat(data.zipinfo.longitude),
          };
          setCurrentCoords(coords);
          setLaundryProsData(dreeProArray);
        } else {
          console.error('Error fetching data:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setZipCode(event.target.value);
      fetchData(event.target.value);
    }
  };

  useEffect(() => {
    fetchData(zipCode);
  }, []);

  return (
    <div className="App">
      <nav className="nav-bar">
        <img
          className="logo"
          src="https://assets-global.website-files.com/63bc8a20650674801de11372/63bc967f9d628ca591186457_LOGO.png"
        />
        <label className="search">
          <input
            placeholder={zipCode}
            onKeyDown={handleKeyDown}
          />
        </label>
      </nav>
      <DreeProContainer
        dreePros={laundryProsData}
        currentCoords={currentCoords}
      />
      <DreeMap currentCoords={currentCoords} dreePros={laundryProsData} />
    </div>
  );
}

export default App;
