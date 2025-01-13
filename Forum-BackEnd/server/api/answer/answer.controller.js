const { createAnswer, answerByQuestionId , getAnswers} = require("./answer.service");
const pool = require('../../config/database');
const auth = require('../users/middleware/auth');

module.exports = {
    solveQuestion: (req, res) => {
        const { answer} = req.body;
        
        //validation
        if (!answer) {
            return res.status(400).json({ msg: 'Not all fields have been provided!' })
        }
   req.body.userId = req.id;
        //sending data to answer table
        createAnswer(req.body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: "database connection"})
            }
            return res.status(200).json({
                msg: 'Answer was successfully inserted',
                data: results
            })
        })
    },
    getAllAnswers: (req, res) => {
    const questionId = req.params.questionId;

    getAnswers(questionId, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "questions not found" });
      }
      return res.status(200).json({ data: results });
    });
  },
    getAnswerByQuestionId: (req, res) => {
        let questionId = req.params.id;
        answerByQuestionId(questionId, (err, results) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ msg: "database connection" })
            }
            // if (!results) {
            //     return res.status(400).json({ msg: "Record not found" });
            // }
            return res.status(200).json({data: results});
        })
    }
}