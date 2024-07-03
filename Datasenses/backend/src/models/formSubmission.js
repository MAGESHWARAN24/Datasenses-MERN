const mongoose = require("mongoose");

const formSubmissionSchema = mongoose.Schema({
  submitAt: {type: Date, default: Date.now},
  formId: {type: String, ref: "Form"},
  content: {},
});

const formSubmissions = mongoose.model("formsubmissions", formSubmissionSchema);

module.exports = formSubmissions;
