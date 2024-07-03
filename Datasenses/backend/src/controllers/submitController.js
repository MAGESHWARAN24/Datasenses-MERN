const forms = require("../models/forms");
const formSubmissions = require("../models/formSubmission");
module.exports.__form_submit_Get = async (req, res) => {
  try {
    const {formName, id} = req.params;
    const content = await forms.findOne({_id: id}, {form_name: 1, content: 1});
    if (content) {
      await forms.findByIdAndUpdate(
        {_id: id},
        {
          $inc: {visits: 1},
        }
      );
      res.status(200).json({content: content.content, name: content.form_name});
    } else {
      res.status(500).json({Error: "Form not found"});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({Error: error});
  }
};

module.exports.__form_submit_Post = async (req, res) => {
  try {
    const {id} = req.params;
    const content = req.body;
    await formSubmissions.create({content, formId: id});
    await forms.findByIdAndUpdate(
      {_id: id},
      {
        $inc: {
          submissions: 1,
        },
      }
    );
    res.status(203).json({submit: true});
  } catch (error) {
    res.status(500).json({Error: error});
  }
};
