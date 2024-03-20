import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";

//Add API base
const API_BASE = 'http://localhost:3001/todo';

function App() {

  //Add useState, we ll store items in the array
  const [items, setItems] = useState([]);

  // Add input state, we will store the user's input in this state
  const [input, setInput] = useState("");

  //Add useEffect, GetTodos() will run every time the component renders
  useEffect(() => {
    GetTodos();
  }, []);

  // Store the target's value into the input state
  const handleChange = (e) => {
    setInput(e.target.value);
  }

  // Add GetTodos() function, fetches data from our API, converts to JSON
  // and then saves the data in the 'items' state
  // If there's an error, it will be logged to the console
  const GetTodos = () => {
    fetch(API_BASE)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.log(err))
  }

  const addItem = async () => {
    const data = await fetch(API_BASE + "/new", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: input,
        completed: false
      })
    }).then(res => res.json())
    console.log(data)
    await GetTodos()
    setInput('')
  }


  return (
    <div className="container">
      <div className="heading">
        <h1>TO-DO-APP</h1>
      </div>

      <div className="form">
        <input type='text' value={input} onChange={handleChange}></input>
        <button onClick={() => addItem()}>
          <span>ADD</span>
        </button>
      </div>

      <div className="todolist">
        {items.map((item) => {
          const { _id, name, completed } = item
          return <TodoItem name={name} id={_id} completed={completed} setItems={setItems} />
        })}
      </div>
    </div>

  );
}

export default App;