import React from "react";
import {arrayMove} from "@dnd-kit/sortable";
const builderProvider = React.createContext();
const initialState = [
  {
    Property: {
      Type: "BasicQuestion",
      Name: "breach_type",
      Label: "What type of data breach did you experience?",
      Placeholder: "Enter breach type here",
      Header: "Breach Type",
      HelperText: "Specify the type of data breach experience",
    },
  },
  {
    Property: {
      Type: "BasicQuestion-Date",
      Name: "breach_date",
      Label: "When did you first become aware of the data breach?",
      Placeholder: "Enter breach date or time frame",
      Header: "Breach Date",
      HelperText:
        "Provide the date or time frame when the data breach was discovered",
    },
  },
  {
    Property: {
      Type: "BasicQuestion",
      Name: "discovery_method",
      Label: "How did you discover the data breach?",
      Placeholder: "Enter discovery method here",
      Header: "Discovery Method",
      HelperText:
        "Describe how the data breach was identified (e.g., internal audit, employee report, security software).",
    },
  },
  {
    Property: {
      Type: "BasicQuestion",
      Name: "compromised_data",
      Label: "What types of data were compromised in the breach?",
      Placeholder: "Enter compromised data types",
      Header: "Compromised Data",
      HelperText:
        " Detail the types of data that were compromised in the breach.",
    },
  },
  {
    Property: {
      Type: "BasicQuestion",
      Name: "affected_count",
      Label:
        "Approximately how many individuals or entities were impacted by the breach?",
      Placeholder: "Enter affected count",
      Header: "Affected Count",
      HelperText:
        "Estimate the number of individuals or entities impacted by the breach.",
    },
  },
  {
    Property: {
      Type: "BasicQuestion",
      Name: "response_steps",
      Label: "What actions have been taken since discovering the breach?",
      Placeholder: "Enter response steps here",
      Header: "Response Steps",
      HelperText:
        "Outline the actions taken following the discovery of the breach.",
    },
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const {Property, id} = action.payload;
      return (state = [...state, {Property, id}]);
    }
    case "swapElement": {
      const {oldIndex, newIndex} = action.payload;
      return arrayMove(state, oldIndex, newIndex);
    }
    case "remove": {
      const {id} = action.payload;
      return (state = state.filter((ele) => ele.id !== id));
    }
    case "update": {
      const {id, data} = action.payload;
      const index = state.findIndex((ele) => ele.id === id);
      state[index].Property = data;
      return state;
    }
    case "addAll":
      return (state = action.payload);
    default:
      return state;
  }
};

export const FormBuilderContext = ({children}) => {
  const [formElements, dispatch] = React.useReducer(reducer, initialState);
  const [isPreview, setIsPreview] = React.useState(false);
  return (
    <builderProvider.Provider
      value={{formElements, isPreview, setIsPreview, dispatch}}
    >
      {children}
    </builderProvider.Provider>
  );
};

export function useFormBuilder() {
  return React.useContext(builderProvider);
}
