import Header from "./components/Header";
import Main from "./components/Main.jsx";
import {useEffect, useReducer} from "react";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import StartScreen from "./components/StartScreen.jsx";
import Question from "./components/Question.jsx";

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index:0,
  answer:null,
  points:0,
};

function reducer(state, action) {
  switch (action.type) {
    case "DATA_RECEIVED":
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };

    case 'DATA_ERROR':
      return {
        ...state,
        status: 'error',
      };

    case 'DATA_ACTIVE':
      return {
        ...state,
        status: 'active',
      }
      case 'DATA_ANSWER':
        {
          const question = state.questions.at(state.index);
          return {
            ...state,
            answer: action.payload,
            points:
              action.payload === question.correctOption
                ? state.points + question.points
                : state.points,
          }
        }

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function App() {
  const [{questions, status, index, answer, options}, dispatch] = useReducer(reducer, initialState);
  const numberQuestions = questions.length;

  const activate = () => dispatch({type: 'DATA_ACTIVE'});

  useEffect(() => {
    fetch("http://localhost:8080/questions")
      .then((response) => response.json())
      .then((data) => dispatch({type: 'DATA_RECEIVED', payload: data}))
      .catch(() => dispatch({type: 'DATA_ERROR'}));
  }, [])

  return (
    <div className="app">
      <Header/>
      <Main>
        {status === 'loading' && <Loader/>}
        {status === 'error' && <Error/>}
        {status === 'ready' && <StartScreen numberQuestions={numberQuestions} activate={activate}/>}
        {status === 'active' &&
          <Question
            dispatch={dispatch}
            question={questions[index]}
            answer={answer}/>
        }
      </Main>
    </div>
  )
}

export default App
