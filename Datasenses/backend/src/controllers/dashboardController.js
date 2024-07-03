const {pipeline} = require("nodemailer/lib/xoauth2");
const formSubmissions = require("../models/formSubmission");
const forms = require("../models/forms");
const users = require("../models/users");
const {getUID} = require("../services/userServices");

module.exports.__dashboard_Get = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    const id = await getUID(token);
    const {members} = await users.findOne({_id: id});
    const form = await forms.find({u_id: id}, {_id: 1});
    const report = await formSubmissions.aggregate([
      {
        $lookup: {
          from: "forms",
          localField: "formId",
          foreignField: "$id",
          as: "rep",
        },
      },
    ]);

    // const rep = await forms.aggregate([
    //   {
    //     $lookup: {
    //       from: "formsubmissions",
    //       localField: "formId",
    //       foreignField: "id",
    //       as: "submissions",
    //     },
    //   },
    //   {
    //     $unwind: "$submissions",
    //   },
    //   {
    //     $group: {
    //       _id: {$month: "$submissions.content.breach_date"},
    //       total_affected_count: {$sum: "$submissions.content.affected_count"},
    //     },
    //   },
    // ]);
    // const rep = await forms.aggregate([
    //   {
    //     $lookup: {
    //       from: "formsubmissions",
    //       localField: "formId",
    //       foreignField: "id",
    //       as: "submissions",
    //     },
    //   },
    //   {
    //     $unwind: "$submissions",
    //   },
    //   {
    //     $addFields: {
    //       "submissions.content.breach_date": {
    //         $toDate: "$submissions.content.breach_date", // Convert string to Date object
    //       },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: {$month: "$submissions.content.breach_date"}, // Extract month from breach date
    //       total_affected_count: {$sum: "$submissions.content.affected_count"},
    //     },
    //   },
    //   {$sort: {_id: 1}},
    // ]);

    const rep = await forms.aggregate([
      {
        $lookup: {
          from: "formsubmissions",
          localField: "formId",
          foreignField: "id",
          as: "submissions",
        },
      },
      {
        $unwind: "$submissions",
      },
      {
        $addFields: {
          "submissions.content.breach_date": {
            $toDate: "$submissions.content.breach_date", // Convert string to Date object
          },
        },
      },
      {
        $group: {
          _id: {$month: "$submissions.content.breach_date"}, // Extract month from breach date
          total_affected_count: {$sum: "$submissions.content.affected_count"},
        },
      },
      {
        $project: {
          _id: 1,
          total_affected_count: 1,
          month_name: {
            $let: {
              vars: {
                monthsInString: [
                  null,
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
              },
              in: {$arrayElemAt: ["$$monthsInString", "$_id"]},
            },
          },
        },
      },
      {$sort: {_id: 1}},
    ]);

    res.status(200).json({members, form, report, rep});
  } catch (error) {
    console.log(error);
    res.status(500).json({Error: error});
  }
};
