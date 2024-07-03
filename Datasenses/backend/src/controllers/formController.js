const {pipeline} = require("nodemailer/lib/xoauth2");
const forms = require("../models/forms");
const {getUID} = require("../services/userServices");
const formsubmissions = require("../models/formSubmission");
module.exports.__form_Post = async (req, res) => {
  try {
    const {form_name, description} = req.body;
    const token = req.cookies.jwt;
    const id = await getUID(token);
    const createForm = await forms.create({u_id: id, form_name, description});
    if (createForm) res.status(201).json();
  } catch (error) {
    res.status(500).json({Error: error});
  }
};

module.exports.__form_fetch_Get = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const id = await getUID(token);
    const Forms = await forms.find(
      {u_id: id},
      {
        _id: 1,
        published: 1,
        form_name: 1,
        description: 1,
        createAt: 1,
      }
    );
    const Status = await forms.aggregate([
      {$match: {u_id: id}},
      {
        $group: {
          _id: "$u_id",
          visits: {$sum: "$visits"},
          submissions: {$sum: "$submissions"},
        },
      },
      {
        $project: {
          visits: 1,
          submissions: 1,
          submissionsRate: {
            $cond: {
              if: {$gt: ["$visits", 0]},
              then: {$multiply: [{$divide: ["$submissions", "$visits"]}, 100]},
              else: 0,
            },
          },
          bounsRate: {
            $cond: {
              if: {$gt: ["$visits", 0]},
              then: {
                $subtract: [
                  100,
                  {$multiply: [{$divide: ["$submissions", "$visits"]}, 100]},
                ],
              },
              else: 0,
            },
          },
        },
      },
    ]);

    res.status(200).json({Forms, Status});
  } catch (error) {
    console.log(error);
    res.status(500).json({Error: error});
  }
};

module.exports.__form_save_Patch = async (req, res) => {
  try {
    const {id} = req.params;
    const isForm = await forms.find({_id: id});
    if (isForm) {
      const updatedForm = await forms.findByIdAndUpdate(
        {_id: id},
        {content: req.body}
      );
      res.status(200).json({updatedForm});
    } else {
      res.status(404).json({Error: "Form not found"});
    }
  } catch (error) {
    res.status(500).json({Error: error});
  }
};

module.exports.__form_getStructure_Get = async (req, res) => {
  try {
    const {id} = req.params;
    const {content} = await forms.findOne({_id: id}, {content: 1});
    res.status(200).json({content});
  } catch (error) {
    res.status(500).json({Error: error});
  }
};

module.exports.__form_publish_Put = async (req, res) => {
  try {
    const {id, formName} = req.params;
    const isForm = await forms.find({_id: id});
    if (isForm) {
      const isPub = await forms.findOneAndUpdate(
        {_id: id},
        {
          published: true,
          shareURL: `http://localhost:5173/submit/${id}`,
        }
      );
      res.status(203).json({updated: true});
    } else {
      res.status(404).json({Error: "Form not found"});
    }
  } catch (error) {
    res.status(500).json({Error: error});
  }
};
