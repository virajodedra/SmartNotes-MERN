// const express = require("express");      //old code  source : from youtube.
// const Message = require("../models/message");

// const submit_feedback = (req, res) => {
//   let message = new Message(req.body);
//   message
//     .save()
//     .then((result) => {
//       res.json({ msg: "Thank you for your feedback!" });
//     })
//     .catch((error) => res.json({ msg: error.message }));
// };


// module.exports = { submit_feedback };



const express = require("express");
const Message = require("../models/message");

// Submit Feedback Controller
const submit_feedback = async (req, res) => {      //here 201 for a successful feedback submission.
  try {                                            //400 for for bad input (e.g., missing feedback content).
    // Simple validation                            //500 for  server errors.
    if (!req.body || !req.body.content) {
      return res.status(400).json({ msg: "Feedback content is required." });
    }
    const message = new Message(req.body);
    await message.save();
    res.status(201).json({ msg: "Thank you for your feedback!" });
  } catch (error) {
    res.status(500).json({ msg: "An error occurred while submitting feedback.", error: error.message });
  }
};

module.exports = { submit_feedback };

