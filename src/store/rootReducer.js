import { combineReducers } from "redux";
import { plannerReducer } from "./ducks/planner/plannerReducer";

export const rootReducer = combineReducers({
    planner: plannerReducer,
});