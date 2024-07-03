import React from "react";

const contextProvider = React.createContext();

const initialState = {
  dashboard: {
    member: [],
    recorded_vulnerability: [],
    response_report: [],
  },
  forms: {
    Forms: [],
    Status: [],
  },
};

// localStorage()
const reducer = (state, action) => {
  switch (action.type) {
    case types.form.addAll_Forms: {
      const {Forms, Status} = action.payload;
      return {
        ...state,
        forms: {
          ...state.forms,
          Forms,
          Status,
        },
      };
    }
    default:
      return state;
  }
};

export const types = {
  form: {
    addAll_Forms: "add-all-forms",
  },
};

export const AppContext = ({children}) => {
  const [data, dispatch] = React.useReducer(reducer, initialState);
  return (
    <contextProvider.Provider value={{data, dispatch}}>
      {children}
    </contextProvider.Provider>
  );
};

export function useAppContext() {
  return React.useContext(contextProvider);
}
