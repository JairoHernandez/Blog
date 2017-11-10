import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST } from '../actions';

// Will default our state to be an object(aka object with posts).
export default function(state={}, action) {
    switch(action.type){
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
            return { ...state, [action.payload.data.id]: action.payload.data }; // [action.paylod.data.id] is not an array it's actual name of the key.

        case FETCH_POSTS:
            //console.log(action.payload.data); // [post2, post2] needs to be converted to { 4: post }
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}