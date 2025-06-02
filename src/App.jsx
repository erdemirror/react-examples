import React, { useState, useEffect, useReducer, use } from "react";

// Experimental fake API using fetch
const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// useReducer example
const initialState = { count: 0 };
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function App() {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect for data fetching
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

  // useEffect for timer (example)
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Tick every 2s");
    }, 2000);

    return () => clearInterval(timer); // cleanup
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>React Concepts Demo</h1>

      <section>
        <h2>useState</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
        <p>Hello, {name || "Stranger"}!</p>
      </section>

      <section>
        <h2>useReducer</h2>
        <p>Count: {state.count}</p>
        <button onClick={() => dispatch({ type: "increment" })}>+1</button>
        <button onClick={() => dispatch({ type: "decrement" })}>-1</button>
      </section>

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

      <section>
        <h2>Experimental use() (React 18+ with Suspense)</h2>
        <button onClick={() => setToggle((prev) => !prev)}>
          Toggle Profile
        </button>
        <React.Suspense fallback={<p>Loading profile...</p>}>
          {toggle && <UserProfile />}
        </React.Suspense>
      </section>
    </div>
  );
}

// ⚠️ Experimental use() hook example
function UserProfile() {
  const user = use(fetchUsers().then((data) => data[0]));
  return (
    <div>
      <h3>First user:</h3>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default App;
