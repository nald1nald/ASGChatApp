import {
  createContext,
  useContext,
  useReducer,
} from "react";
import { AuthContext } from "./AuthContext";

// Create a new context for the chat
export const ChatContext = createContext();

// Create a provider component for the chat context
export const ChatContextProvider = ({ children }) => {
  // Access the current user from the AuthContext using useContext hook
  const { currentUser } = useContext(AuthContext);

  // Define the initial state for the chat context
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  // Define the chat reducer function to handle state updates
  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  // Use the useReducer hook to create the state and dispatch function
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  // Provide the state and dispatch through the ChatContext.Provider component
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
