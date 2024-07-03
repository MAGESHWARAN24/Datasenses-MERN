const forms = require("../models/forms");
const formSubmissions = require("../models/formSubmission");
const {getUID} = require("../services/userServices");

module.exports.__repository_fetchAll = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const id = await getUID(token);
    const repository = await forms.find(
      {u_id: id},
      {form_name: 1, createAt: 1, published: 1, description: 1}
    );
    res.status(200).json({repository});
  } catch (error) {
    console.log(error);
    res.status(500).json({Error: error});
  }
};

module.exports.__repository_fetch = async (req, res) => {
  try {
    const {id} = req.params;
    const {content, shareURL} = await forms.findOne({_id: id});
    const data = await formSubmissions.find({formId: id}, {content: 1});
    res.status(200).json({columns: content, data, shareURL});
  } catch (error) {
    console.log(error);
    res.status(500).json({Error: error});
  }
};
