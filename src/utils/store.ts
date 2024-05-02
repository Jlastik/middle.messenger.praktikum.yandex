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

const deepCopy = (object: Indexed) => {
  try {
    return JSON.parse(JSON.stringify(object));
  } catch (e) {
    console.log(e);
    return "";
  }
};

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
    case "TOGGLE_CHAT_MENU":
      newState.isChatMenuOpen = !newState.isChatMenuOpen;
      return newState;
    case "SET_PARTICIPANT_LIST":
      newState.participants = action.payload;
      return newState;
    case "SET_CHAT_LIST":
      newState.chatList = action.payload;
      return newState;
    case "SET_SEARCH_LIST":
      newState.searchList = action.payload;
      return newState;
    case "SET_MENU_LIST":
      newState.isMenuSearch = false;
      return newState;
    case "SET_MENU_SEARCH":
      newState.isMenuSearch = true;
      return newState;
    case "CLEAR_STORE":
      return {};
    default:
      return state;
  }
};

const store = Object.freeze(
  createStore(reducer, {
    user: null,
    selectedChat: null,
    isChatMenuOpen: false,
    participants: [],
    searchList: [],
    chatList: [],
  }),
);

export default store;
