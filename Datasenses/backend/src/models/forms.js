const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
  u_id: String,
  createAt: {type: Date, default: Date.now},
  published: {type: Boolean, default: false},
  form_name: {type: String, required: [true, "Name is required field"]},
  description: {type: String, default: ""},
  content: {
    type: Array,
    default: [
      {
        Type: "BasicQuestion",
        Name: "breach_type",
        Label: "What type of data breach did you experience?",
        Placeholder: "Enter breach type here",
        Header: "Breach Type",
        HelperText: "Specify the type of data breach experience",
      },

      {
        Type: "BasicQuestion-Date",
        Name: "breach_date",
        Label: "When did you first become aware of the data breach?",
        Placeholder: "Enter breach date or time frame",
        Header: "Breach Date",
        HelperText:
          "Provide the date or time frame when the data breach was discovered",
      },

      {
        Type: "BasicQuestion",
        Name: "discovery_method",
        Label: "How did you discover the data breach?",
        Placeholder: "Enter discovery method here",
        Header: "Discovery Method",
        HelperText:
          "Describe how the data breach was identified (e.g., internal audit, employee report, security software).",
      },

      {
        Type: "BasicQuestion",
        Name: "compromised_data",
        Label: "What types of data were compromised in the breach?",
        Placeholder: "Enter compromised data types",
        Header: "Compromised Data",
        HelperText:
          " Detail the types of data that were compromised in the breach.",
      },

      {
        Type: "BasicQuestion",
        Name: "affected_count",
        Label:
          "Approximately how many individuals or entities were impacted by the breach?",
        Placeholder: "Enter affected count",
        Header: "Affected Count",
        HelperText:
          "Estimate the number of individuals or entities impacted by the breach.",
      },

      {
        Type: "BasicQuestion",
        Name: "response_steps",
        Label: "What actions have been taken since discovering the breach?",
        Placeholder: "Enter response steps here",
        Header: "Response Steps",
        HelperText:
          "Outline the actions taken following the discovery of the breach.",
      },
    ],
  },
  visits: {type: Number, default: 0},
  submissions: {type: Number, default: 0},
  shareURL: {type: String, default: ""},
});

const forms = mongoose.model("forms", formSchema);
module.exports = forms;
