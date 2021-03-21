import React from "react";
import { useSelector } from 'react-redux';
import WalkIcon from '@material-ui/icons/DirectionsWalkOutlined';
import TramIcon from '@material-ui/icons/TramOutlined';
import SubwayIcon from '@material-ui/icons/DirectionsSubwayOutlined';
import BusIcon from '@material-ui/icons/DirectionsBusOutlined';
import RailIcon from '@material-ui/icons/DirectionsRailwayOutlined';
import BoatIcon from '@material-ui/icons/DirectionsBoatOutlined';
import { CircularProgress } from "@material-ui/core";

// Component for route plan
function RoutePlan() {

    const planner = useSelector( (state) => state.planner);
    const { routPlans, loading, error } = planner;

    return (
        
        loading? <div><CircularProgress /></div> :
        error? <div>{error}</div> :
        <div>    
            {routPlans[0].legs.map(obj =>
              <div className="output-plan-stops">
                {obj.mode === "WALK" ? <div className="output-walk"><WalkIcon/> {obj.to.name}</div> : 
                obj.mode === "TRAM" ? <div className="output-tram"><TramIcon/> {obj.to.name}</div> : 
                obj.mode === "BUS" ? <div className="output-bus"><BusIcon/> {obj.to.name}</div>: 
                obj.mode === "FERRY" ? <div className="output-boat"><BoatIcon/> {obj.to.name}</div> : 
                obj.mode === "RAIL" ? <div className="output-rail"><RailIcon/> {obj.to.name}</div> : 
                obj.mode === "SUBWAY" ? <div className="output-subway"><SubwayIcon/> {obj.to.name}</div> : 
                obj.mode}
              </div>
            )}  
        </div>
    );
}

export default RoutePlan;