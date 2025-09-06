import React from 'react';
import Option from './Option';

const Question = ({dispatch, question, answer}) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Option dispatch={dispatch} question={question} answer={answer}/>
    </div>
  );
};

export default Question;