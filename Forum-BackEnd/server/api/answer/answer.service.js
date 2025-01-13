const pool = require('../../config/database');

module.exports = {

createAnswer: (data, callback) => {
    pool.query(
        `INSERT INTO answers(answer, answer_code_block,user_id, question_id ) VALUES (?,?,?,?)`,
        [
          data.answer,
          data.answerCode,
          data.userId,
          data.questionId,
      ],
        
        (err, result) => {
          if (err) {
            console.log(err);
            return callback(err);
          }
          return callback(null, result);
        }
      );
    },
 getAnswers: (questionId, callback) => {
    pool.query(
      `
  SELECT
    answers.answer_id,
    answers.answer,
    registration.user_name
  FROM
    answers 
  JOIN
    registration ON answers.user_id = registration.user_id
  WHERE
    answers.question_id = ?;
  `,
      [questionId],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

 answerByQuestionId: (id, callback) => {
        //id is questionId
        pool.query(`SELECT answer_id, answer, answer_code_block, question_id, registration.user_id, registration.user_name FROM answer LEFT JOIN registration ON answers.user_id = registration.user_id WHERE answers.question_id = ?`, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        })
    }
};