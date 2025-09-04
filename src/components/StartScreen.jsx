import React from 'react';

const StartScreen = ({numberQuestions,activate}) => {
    return (
        <div className="start">
            <h2>Welcome to The React Quiz!</h2>
            <h3>{numberQuestions} questions to test React mastery</h3>
            <button className="btn btn-ui" onClick={activate}>Let's start</button>
        </div>
    );
};

export default StartScreen;