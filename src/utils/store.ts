type Indexed = Record<string, unknown>;
type Action = { type: string; payload?: unknown };
type SubscribeItem = (state: Indexed) => void;

const createStore = (
  reducer: (state: Indexed, action: Action) => Indexed,
  initialState: Indexed,
) => {
  const subscribers: SubscribeItem[] = [];
  let currentState = initialState;

  return {
    getState: () => currentState,
    subscribe: (fn: SubscribeItem) => {
      subscribers.push(fn);
      fn(currentState);
    },
    dispatch: (action: Action) => {
      currentState = reducer(currentState, action);
      subscribers.forEach((fn) => fn(currentState));
    },
  };
};

const deepCopy = (object: Indexed) => JSON.parse(JSON.stringify(object));

const reducer = (state: Indexed, action: Action) => {
  const newState = deepCopy(state);
  switch (action.type) {
    case "SET_USER":
      newState.user = action.payload;
      return newState;
    case "SIGNUP":
      newState.user = action.payload;
      return newState;
    case "SELECT_CHAT":
      newState.selectedChat = action.payload;
      return newState;
    case "CLEAR_STORE":
      return {};
    default:
      return state;
  }
};

const store = Object.freeze(createStore(reducer, {}));

export default store;
