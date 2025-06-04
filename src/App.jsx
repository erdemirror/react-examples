import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

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
    alert("Something went wrong");
  }

  return (
    <div className="max-w-5xl mx-auto p-8 text-center font-sans">
      <section>
        <p className="mb-4">
          {isPending ? "Loading..." : JSON.stringify(data)}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Refetch
          </button>
          <button
            onClick={() => setId((prev) => prev + 1)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Increment ID
          </button>
        </div>
      </section>
    </div>
  );
}

export default App;
