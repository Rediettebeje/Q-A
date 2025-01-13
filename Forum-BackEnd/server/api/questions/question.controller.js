const pool = require('../../config/database');
const auth = require('../users/middleware/auth');
const { createQuestion, getAllQuestions, questionById ,getPost} = require('./question.service');

module.exports = {
  createQuestionHandler : (req, res) => {
    const { question, questionDescription } = req.body;
    
  const generateUniqueId = () => {
  const timestamp = new Date().getTime().toString(36);
  const randomString = Math.random().toString(36).substring(2, 15);
  return timestamp + randomString;
};

  if (!question || !questionDescription ) {
    return res.status(400).json({ msg: 'Not all fields have been provided!' });
  }

  if (!question  ) {
    return res.status(400).json({ msg: 'please provide question!' });
  }
    
    req.body.userId = req.id;
    req.body.postId = generateUniqueId() 
    
  createQuestion(req.body,  (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Database operation error' });
    }
    return res.status(200).json({
      msg: 'Question created successfully!',
      data: results
    });
  });
},

    getQuestions: (req, res) => {
        getAllQuestions((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'Database connection error' });
            }
            return res.status(200).json({ data: results });
        });
  },
    
    getPosts: (req, res) => {
    getPost((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "questions not found" });
      }
      return res.status(200).json({ data: results });
    });
  },
  getQuestionById: (req, res) => {
      
        const postId  = req.body.id;

        questionById(postId , (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'Database connection error' });
            }
            if (!results) {
                return res.status(404).json({ msg: 'Record not found' });
            }
            return res.status(200).json({ data: results });
        });
    },
};



