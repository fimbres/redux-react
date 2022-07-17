import { useSelector, useDispatch } from 'react-redux';
import './App.css';

function App() {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  const increment = () => {
    dispatch({ type: 'INC' });
  };
  const decrement = () => {
    dispatch({ type: 'DEC' });
  };
  const addValue = () => {
    dispatch({ type: 'ADD', payload: 10 });
  };

  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={addValue}>Add 10</button>
    </div>
  );
}

export default App;
