import React, { useState, useEffect, useReducer } from "react";

// Fake user API
const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// Reducer for task management
const initialState = {
  tasks: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case "toggle":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "delete":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
}

function App() {
  const [name, setName] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <h1>React Concepts Demo</h1>

      {/* useState Example */}
      <section>
        <h2>useState</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={{ padding: "0.5rem", marginRight: "1rem" }}
        />
        <p>Hello, {name || "Stranger"}!</p>
      </section>

      {/* useReducer Advanced Example */}
      <section>
        <h2>Task Manager (useReducer)</h2>
        <input
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter task"
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button
          onClick={() => {
            if (taskInput.trim() !== "") {
              dispatch({ type: "add", payload: taskInput });
              setTaskInput("");
            }
          }}
        >
          Add Task
        </button>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {state.tasks.map((task) => (
            <li
              key={task.id}
              style={{
                marginTop: "0.5rem",
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={() => dispatch({ type: "toggle", payload: task.id })}
              >
                {task.text}
              </span>
              <button
                onClick={() => dispatch({ type: "delete", payload: task.id })}
                style={{ marginLeft: "1rem", color: "red" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* API Data Fetching */}
      <section>
        <h2>API + Data Fetching with useEffect</h2>
        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
