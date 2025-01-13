const pool = require('../../config/database');

module.exports = {

createQuestion : (data, callback) => {
    pool.query(
        `INSERT INTO questions (question_text, question_description, question_code_block, tags, post_id, user_id) VALUES (?,?,?,?,?,?)`,
        [
          data.question,
            data.questionDescription,
            data.questionCode,
            data.questionTags,  
             data.postId,
          data.userId,
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
 getPost: (callback) => {
    pool.query(
      `
   SELECT * FROM questions;
`,
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },

    questionById: (id, callback) => {
    
        pool.query(`SELECT * FROM questions WHERE post_id = ?`, [id], (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result[0]);
        })
    },


    
    getAllQuestions: (callback) => {
        pool.query(`SELECT questions.*, registration.user_name
    FROM questions
    INNER JOIN registration ON questions.user_id = registration.user_id  ORDER BY question_id DESC`, (err, result) => {
            if (err) {
                return callback(err);
            }
            return callback(null, result);
        })
    }
};

// getQuestion: (callback) => {
//     pool.query(
//       `
//     SELECT question.*, registration.user_name
//     FROM question
//     INNER JOIN registration ON question.user_id = registration.user_id
//     `,
//       (err, result) => {
//         if (err) {
//           return callback(err);
//         }
//         return callback(null, result);
//       }
//     );
//   },


// module.exports = {

// createQuestion : (data, userName, password, callback) => {
//   pool.query('SELECT * FROM registration WHERE user_name= ? AND user_password = ?', [userName, password], (err, results) => {
//     if (err) {
//       console.log(err);
//       return callback(err);
//     }

//     if (results.length === 0) {
//       return callback('User not found');
//     } else {
//       const userId = results[0].user_id; // Get the userId from the results

//       pool.query(
//         `INSERT INTO question (question_text, question_description,question_code_block,tags, post_id, user_id) VALUES (?,?,?,?,?,?)`,
      
//         [
//           data.question,
//           data.questionDescription,
//           data.userId,
//           data.postId,
//           data.questionCode,
//            data.questionTags,  
//         ],
//         (err, result) => {
//           if (err) {
//             console.log(err);
//             return callback(err);
//           }
//           return callback(null, result);
//         }
//       );
//     }
//   });
// },

//     questionById: (id, callback) => {
    
//         pool.query(`SELECT * FROM question WHERE post_id = ?`, [id], (err, result) => {
//             if (err) {
//                 return callback(err);
//             }
//             return callback(null, result[0]);
//         })
//     },


    
//     getAllQuestions: (callback) => {
//         pool.query(`SELECT registration.user_name, question_text,question_description,question_code_block,tags,post_id FROM question JOIN registration ON question.user_id = registration.user_id  ORDER BY question_id DESC`, [], (err, result) => {
//             if (err) {
//                 return callback(err);
//             }
//             return callback(null, result);
//         })
//     }
// };


