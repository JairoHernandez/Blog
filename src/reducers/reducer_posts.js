import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

// Will default our state to be an object(aka object with posts).
export default function(state={}, action) {
    switch(action.type){
        case DELETE_POST:
            return _.omit(state, action.payload);
            /** Better than using an array for state because we would 
             * have to write this instead.
             * 
             * return _.reject(state, post => === action.payload)
             * 
             *  that's why object for application level state looks cleaner.
             * this also speeds up the Deletion. */
        case FETCH_POST:
            /** ES5 way */
            // const post = action.payload.data;
            // const newState = { ...state }; // ...state takes all existing posts from state object and place into this now new object.
            // newState[post.id] = post;
            // return newState;
            /** ES6 equivalent */
            // return { something } means it returns the full object
            // console.log('...state:', { ...state); // Empty object
            // console.log('action.payload.data:', action.payload.data);
            // BEcause [action.payload.data.id]: action.payload.data appears to the right of ...state it will OVERWRITE the post matching [action.payload.data.id].
            return { ...state, [action.payload.data.id]: action.payload.data }; // [action.paylod.data.id] is not an array it's actual name of the key.

        case FETCH_POSTS:
            //console.log(action.payload.data); // [post2, post2] needs to be converted to { 4: post }
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}