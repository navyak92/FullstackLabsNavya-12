import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes';

const checkNodeStatusStart = (node) => {
  return {
    type: types.CHECK_NODE_STATUS_START,
    node
  };
};

const checkNodeStatusSuccess = (node, res) => {
  return {
    type: types.CHECK_NODE_STATUS_SUCCESS,
    node,
    res
  };
};

const checkNodeStatusFailure = node => {
  return {
    type: types.CHECK_NODE_STATUS_FAILURE,
    node,
  };
};

const checkNodeBlocksStart = node => {
  return {
    type: types.CHECK_NODE_BLOCKS_START,
    node
  };
};

const checkNodeBlocksSuccess = (node, res) => {
  return {
    type: types.CHECK_NODE_BLOCKS_SUCCESS,
    node,
    res
  };
};

const checkNodeBlocksFailure = node => {
  return {
    type: types.CHECK_NODE_BLOCKS_FAILURE,
    node
  };
};

export function checkNodeBlock(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeBlocksStart(node));
      const res = await fetch(`${node.url}/api/v1/blocks`);

      if(res.status >= 400) {
        dispatch(checkNodeBlocksFailure(node));
      }

      const json = await res.json();

      dispatch(checkNodeBlocksSuccess(node, json));
    } catch (err) {
      dispatch(checkNodeBlocksFailure(node));
    }
  };
}

export function checkNodeBlocks(list) {
  return (dispatch) => {
    list.forEach(node => {
      dispatch(checkNodeBlock(node));
    });
  };
}
export function checkNodeStatus(node) {
  return async (dispatch) => {
    try {
      dispatch(checkNodeStatusStart(node));
      const res = await fetch(`${node.url}/api/v1/status`);

      if(res.status >= 400) {
        dispatch(checkNodeStatusFailure(node));
      }

      const json = await res.json();

      dispatch(checkNodeStatusSuccess(node, json));
    } catch (err) {
      dispatch(checkNodeStatusFailure(node));
    }
  };
}

export function checkNodeStatuses(list) {
  return (dispatch) => {
    list.forEach(node => {
      dispatch(checkNodeStatus(node));
    });
  };
}
