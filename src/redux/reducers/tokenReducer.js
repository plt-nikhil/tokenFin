import {
  FETCH_TOKEN_LIST_REQUEST,
  FETCH_TOKEN_LIST_SUCCESS,
  FETCH_TOKEN_LIST_FAIL,
  SELECT_TOKEN_FROM_LIST
} from '../actions/tokenAction';

const initialState = {
  loading: false,
  tokenList: [],
  error: null,
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOKEN_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SELECT_TOKEN_FROM_LIST :
      const updateToken = state.tokenList.map(token => ({ ...token, isSelected: token?.symbol === action.payload?.symbol }))
      return {
        tokenList:[...updateToken],
        loading: false,
        error: null,
      }
    case FETCH_TOKEN_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        tokenList: action.payload,
      };
    case FETCH_TOKEN_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default tokenReducer;
