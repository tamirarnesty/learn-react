import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      const results = await fetchTasks();
      console.log(results);
      setTasks(results);
    };
    getTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3001/tasks");
    const data = res.json();
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3001/tasks/${id}`);
    const data = res.json();
    return data;
  };

  const addTask = async (rawTask) => {
    const res = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawTask),
    });
    const newTask = await res.json();
    console.log(newTask);
    setTasks([...tasks, newTask]);
  };

  // Delete task
  const deleteTask = async (id) => {
    console.log("Delete task with id", id);
    await fetch(`http://localhost:3001/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle reminder
  const toggleReminder = async (id) => {
    console.log("Toggling reminder for task", id);
    const currentTask = await fetchTask(id);
    const updatedTask = { ...currentTask, reminder: !currentTask.reminder };
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();
    setTasks(tasks.map((task) => (task.id === id ? data : task)));
  };

  return (
    // Can only ever return one element. This can be anything, but it's usually a div.
    // Embed the entire div inside a Browser Router. This can also be done at the index.js stage as seen here:
    // https://reactrouter.com/en/main/getting-started/tutorial#connect-the-url
    <BrowserRouter>
      <div className="container">
        <Header
          title="Task Tracker"
          onClick={() => setShowAddForm(!showAddForm)}
          showAddForm={showAddForm}
        />
        {/* All <Route/> components must be embedded within a <Routes/> component */}
        <Routes>
          <Route
            path="/"
            exact
            element={
              <>
                {showAddForm && <AddTask onAdd={addTask} />}
                {tasks.length ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No Tasks To Show"
                )}
              </>
            }
          />
          <Route path="about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
