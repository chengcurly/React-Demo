import * as types from '../constants/ActionTypes';
import { List, Map } from 'immutable';
import { combineReducers } from 'redux';

function taskList(state = List(), action) {
    switch (action.type) {
        case (types.ADD_TASK):
            return state.push(Map({
                id: action.id,
                title: action.text,
                status: 0
            }));
        case (types.TOGGLE_COMPLETE_TASK):
            return state.map(task => {
                if (task.get('id') === action.id) {
                    return task.update('status', v => {
                        return v === 0 ? 2 : 0;
                    });
                } else {
                    return task;
                }
            })
        case (types.UPDATE_TASK_TITLE):
            return state.map(task => {
                if (task.get('id') === action.id) {
                    return task.update('title', v => action.title);
                } else {
                    return task;
                }
            })   
        case (types.DELETE_TASK):
            return state.filter(task => task.get('id') !== action.id);
        default:
            return state;
    }
}

export default combineReducers({
    taskList,
})