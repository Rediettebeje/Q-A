const mySqul = require("mysql2");
require('dotenv').config();

const  pool= mySqul.createConnection(process.env.DATABASE_URL)

  // Create tables
  const registration = `CREATE TABLE IF NOT EXISTS registration (
    user_id int auto_increment,
    user_name varchar(255) not null,
    user_email varchar(255) not null,
    user_password varchar(255) not null,
    PRIMARY KEY (user_id)
  )`;

  const profile = `CREATE TABLE IF NOT EXISTS profile (
    user_profile_id int auto_increment,
    user_id int(11) not null,
    first_name TEXT not null,
    last_name TEXT not null,
    PRIMARY KEY (user_profile_id)
   
  )`;
   let questions = `CREATE TABLE if not exists questions(
    question_id int auto_increment,
    question_text varchar(255) not null,
    question_description varchar(255) ,
    question_code_block varchar(255) ,
    tags varchar(255),
    post_id varchar(255) not null,
    user_id int not null,
    PRIMARY KEY (question_id),
    UNIQUE KEY (post_id)
    )`;
let answers = `CREATE TABLE if not exists answers(
    answer_id int auto_increment,
    answer varchar(255) not null,
    answer_code_block varchar(255) ,
    user_id int not null,
    question_id int not null,
    PRIMARY KEY (answer_id)
    )`;

  pool.query(registration, (err, results) => {
    if (err) console.log(err);
    console.log("Registration table created");
  });

  pool.query(profile, (err, results) => {
    if (err) console.log(err);
    console.log("Profile table created");
  });


    pool.query(questions, (err, results) => {
    if (err) console.log(err);
    console.log("questions table created");
  });

  pool.query(answers, (err, results) => {
    if (err) console.log(err);
    console.log("Answers table created");
  });


module.exports = pool;


