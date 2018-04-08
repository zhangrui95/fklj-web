import {INTERROGATION_DATA} from  "../actions/InterrogationRecord";
import {store} from '../index.js';
const initialState = {
    success: true,
    data: {
        interrogationRecord: {
            reason: {
                "code": "",
                "text": ""
            },
            result: {
                total: 0,
                list: [],
            },
        }
    }
}

const InterrogationRecordUsers = (state = initialState, action) => {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case 'REQUEST_INTERROGATIOM_RECORD':
            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }
        case INTERROGATION_DATA:
            newState.data.interrogationRecord.result.list = action.data.result.list;
            newState.data.interrogationRecord.result.total = action.data.result.page.totalResult;
            newState.isFetching = false;
            return newState;
        default:
            if (store !== undefined) {
                return store.getState().InterrogationRecordUsers;
            } else {
                return state;
            }
    }
}

module.exports = {InterrogationRecordUsers}

