import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useReducer } from "react";
import Loading from "./public/Loading.svg?react";

const getTodos = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  return await response.json();
};

function App() {
  const [id, setId] = useState(1);
  const { data, isPending, refetch, error } = useQuery({
    queryKey: ["todos", id],
    queryFn: () => getTodos(id),
  });
  if (error) {
    alert("something went wrong");
  }

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <section>
        <p>{isPending ? <Loading /> : JSON.stringify(data)}</p>

        <center>
          <button onClick={() => refetch()}>Refetch</button>
          <button onClick={() => setId((prev) => prev + 1)}>
            Increment ID
          </button>
        </center>
      </section>
    </div>
  );
}

export default App;
