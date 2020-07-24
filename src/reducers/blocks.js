import {CHECK_NODE_BLOCKS_START, CHECK_NODE_BLOCKS_SUCCESS, CHECK_NODE_BLOCKS_FAILURE} from '../constants/actionTypes';
import initialState from './initialState';

export default function nodesReducer(state = initialState().nodes, action) {
    let urlIndex = initialState().nodes
    let blockList, nodeIndex;
    switch (action.type) {
        case CHECK_NODE_BLOCKS_START:
        state = action.name
        return {
            ...state,
            blockList
        }
        case CHECK_NODE_BLOCKS_SUCCESS:
        state = action.name
        blockList = action
        nodeIndex = urlIndex.list.findIndex(p => p.url === action.node.url);
        if (nodeIndex >= 0) {
            blockList = [
                {
                    ...urlIndex.list[nodeIndex],
                    online: true,
                    name: action.res.node_name,
                    loading: false,
                    res:action.res.data
                },
                ...urlIndex.list.slice(nodeIndex +1)
            ];
        }
        return {
            ...state,
            blockList
        };
        case CHECK_NODE_BLOCKS_FAILURE:
        state = action.name
        blockList = action;
        return {
            ...state,
            blockList
        };
        default:
            return state;

    }
}