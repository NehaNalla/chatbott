//import express from 'express';
//import bodyParser from 'body-parser';
//import cors from 'cors';
const express  =require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app=express();
app.use(cors());
app.use(bodyParser.json());

let question=[
    {
        question_id:1,
        question_text:"what is your name",
        response_type:"multiple_choice",
        choices:[
            {text:"18-25",next_question_id:2},
            {text:"26-35",next_question_id:3},
            {text:"36-45",next_question_id:4}
        ]
    },
    {
        question_id:2,
        question_text:"what is your occ",
        response_type:"text",
        next_question_id:5
    },
    {
        question_id:3,
        question_text:"what is your favorite hobby",
        response_type:"multiple_choice",
        choices:[
            {text:"reading",next_question_id:5},
            {text:"sports",next_question_id:5}
        ]
    },
];
let userResponse=[];
app.post('/api/get-next-question',(req,res)=>{
    const{currentQuestionId,userResponse}=req.body;
    userResponse.push({questionId:currentQuestionId,response:userResponse});
    const currentQuestion=questions.find(q=> q.question_id===currentQuestionId);
    if(currentQuestion.response_type==='multiple_choice') {
        const nextQuestionId=currentQuestion.choices.find(choice=>choice.text===userResponse).next_question_id;
        const nextQuestion=question.find(q.question_id===nextQuestionId);
        res.json(nextQuestion);
    }
});
app.get('/api/user-responses',(req,res)=>{
    res.json(userResponse);
});
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log('server is running on port ${PORT}');
});