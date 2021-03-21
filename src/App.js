import { useState } from 'react';
import { BrowserRouter, Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { transportList } from "./store/ducks/planner/plannerActions";
import RoutePlan from './components/RoutePlan';
import axios from 'axios';

// Simple solution for requesting latitude and longitude according to address input from HSL's geolocation API and requesting public transport route plan according to address.
// I encountered a problem with executing address HTTP requests at same time with route plan request in actions, didn't found quick solution, so here is simple solution of task.
// Problem was that all actions were executed at same time, so route planner action didn't get address before execution.
// Correct way to implement this task would probably be to create reducer, action, etc... for each request.
// Additionally didn't found solution how to convert HSL offered time format ("startTime": 1616328990000,) to readable time format. 
// Current implementation getting route plan only accordig to current time.

export let HSLAddress;
export let planQuery;

function App() {

  const dispatch = useDispatch();
  const [routeData, setRouteData] = useState();
  const [originData, setOriginData] = useState();
  const [destinationData, setDestinationData] = useState();

  const handleOriginInput = (e) => {
    if (e.currentTarget) {
      setOriginData(e.currentTarget.value);
    }
  }

  const handleDestinationInput = (e) => {
    if (e.currentTarget) {
      setDestinationData(e.currentTarget.value);
    }
  }

  // Get current time
  const currentDate = new Date();
  const date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();

  const currentTime = new Date();
  const time = currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();

  // Requesting geolocation for both inputs and adding them to query
  // Search radius is Helsinki, Vantaa, Espoo regions
  if (originData && destinationData) {
    const getAddress = async () => {
      const originAddress = await axios.get(`https://api.digitransit.fi/geocoding/v1/search?text=${originData}&boundary.circle.lat=60.2&boundary.circle.lon=24.936&boundary.circle.radius=30`);
      const originLocation = originAddress.data.bbox[1] + ',' + originAddress.data.bbox[0];

      const destinationAddress = await axios.get(`https://api.digitransit.fi/geocoding/v1/search?text=${destinationData}&boundary.circle.lat=60.2&boundary.circle.lon=24.936&boundary.circle.radius=30`);
      const destinationLocation = destinationAddress.data.bbox[1] + ',' + destinationAddress.data.bbox[0];

      HSLAddress = "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql";
      planQuery = `
  {
      plan(
        fromPlace: "${originLocation}",
        toPlace: "${destinationLocation}",
        date: "${date}",
        time: "${time}",
      numItineraries: 1,
      ) {
      itineraries{
          walkDistance
          duration
          legs {
          mode
          startTime
          endTime
          from {
              name
          }
          to {
              name
          }
          }
      }
      }
  }
  `;
    }
    getAddress();
  }

  if (routeData) {
    dispatch(transportList());
 
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="page-name">
            <Link to="/">HSL Public Transport Route Planner</Link>
          </div>
        </header>
        <main className="main">
          <div className="content">
            <div>
              <TextField className="input-origin" id="origin" label="Origin" variant="outlined" onChange={handleOriginInput} />
            </div>
            <div>
              <TextField className="input-destination" id="destination" label="Destination" variant="outlined" onChange={handleDestinationInput} />
            </div>
          </div>
          <div className="button-search">
            <div>
              <Button variant="contained" onClick={() => setRouteData(<RoutePlan />)}>
                Search
              </Button>
            </div>
          </div>
          <div className="output-plan">
            {routeData}
          </div>
        </main>
        <footer className="footer">
          All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
