import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/api/tasks';

  // Buscar tarefas ao carregar o componente
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar tarefas');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const response = await axios.post(API_URL, taskData);
      setTasks([response.data, ...tasks]);
      setError(null);
    } catch (err) {
      setError('Erro ao adicionar tarefa');
      console.error('Erro:', err);
    }
  };

  const handleUpdateTask = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedData);
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
      setError(null);
    } catch (err) {
      setError('Erro ao atualizar tarefa');
      console.error('Erro:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
      setError(null);
    } catch (err) {
      setError('Erro ao deletar tarefa');
      console.error('Erro:', err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📝 Minhas Tarefas</h1>
        <p>Gerencie suas tarefas de forma simples e eficiente</p>
      </header>

      <main className="App-main">
        <TaskForm onAddTask={handleAddTask} />

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Carregando tarefas...</div>
        ) : (
          <TaskList
            tasks={tasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </main>
    </div>
  );
}

export default App;
