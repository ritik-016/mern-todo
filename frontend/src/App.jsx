import { useState, useEffect } from "react";
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoClipboardOutline } from "react-icons/io5";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post("/api/todos", { text: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("/api/todos");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Task Manager
          </h1>
        </div>
        <form
          onSubmit={addTodo}
          className="flex items-center gap-2 shadow-sm border border-gray-200 p-2 rounded-lg"
        >
          <input
            className="flex-1 outline-none px-3 py-2 text-gray-700"
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs to be done?"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium cursor-pointer"
          >
            Add Task
          </button>
        </form>
        <div>
          {todos.length === 0 ? (
            <div></div>
          ) : (
            <div>
              {todos.map((todo) => (
                <div key={todo._id}>{todo.text}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
