import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API_URL = "http://127.0.0.1:8000/api/tasks/";

  // Fetch tasks
  const getTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add task
  const addTask = async () => {
    if (!title) return;

    try {
      await axios.post(API_URL, { title });
      setTitle("");
      getTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}${id}/`);
      getTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Load tasks on start
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Simple Task Manager</h2>

      {/* Add Task */}
      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
