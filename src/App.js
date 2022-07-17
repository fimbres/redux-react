import { useSelector, useDispatch } from 'react-redux';
import { actions } from './store';
import './App.css';

function App() {
  const counter = useSelector(state => state.counter);
  const dispatch = useDispatch();
  const increment = () => {
    dispatch(actions.increment());
  };
  const decrement = () => {
    dispatch(actions.decrement());
  };
  const addValue = () => {
    dispatch(actions.addValue(10));
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
