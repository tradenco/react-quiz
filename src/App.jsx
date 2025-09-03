import Header from "./components/Header";
import Main from "./components/Main.jsx";
import {useEffect, useReducer} from "react";

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status:'loading'
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

      default:
        throw new Error(`Unknown action type: ${action.type}`);
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("http://localhost:8080/questions")
      .then((response) => response.json())
      .then((data) => dispatch({type:'DATA_RECEIVED', payload: data}))
      .catch(() => dispatch({type:'DATA_ERROR'}));
  }, [])
  return (
    <div className="app">
      <Header/>
      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  )
}

export default App
