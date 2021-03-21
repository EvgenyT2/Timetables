import { PLANNER_FAIL, PLANNER_REQUEST, PLANNER_SUCCESS } from './plannerConstants';

function plannerReducer(state = { routPlans: [] }, action) {

    switch (action.type) {
        case PLANNER_REQUEST:
            return { loading: true };
        case PLANNER_SUCCESS:
            return { loading: false, routPlans: action.payload };
        case PLANNER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export { plannerReducer }