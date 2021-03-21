import axios from 'axios';
import { HSLAddress, planQuery } from '../../../App';
import { PLANNER_FAIL, PLANNER_REQUEST, PLANNER_SUCCESS } from './plannerConstants';

const transportList = () => async (dispatch) => {
    try {
         dispatch({ type: PLANNER_REQUEST });
        const { data } = await axios.post(HSLAddress, {query: planQuery});
        dispatch({ type: PLANNER_SUCCESS, payload: data.data.plan.itineraries }); 
    }
    catch (error) {
        dispatch({ type: PLANNER_FAIL, payload: error.message });
    }
};

export { transportList }