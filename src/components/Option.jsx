import React from 'react';

const Option = ({dispatch, question, answer}) => {
  const hasAnsered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          onClick={() => dispatch({type:'DATA_ANSWER', payload:index})}
          disabled={hasAnsered}
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${hasAnsered ? index === question.correctOption  ? 'correct' : 'wrong' : ''}`}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Option;