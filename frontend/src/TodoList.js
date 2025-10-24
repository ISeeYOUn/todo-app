// frontend/src/TodoList.js
import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const fetchTodos = () => {
    fetch('http://localhost:3001/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  };

  useEffect(() => { fetchTodos(); }, []);

  const addTodo = () => {
    if (!task) return;
    fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task, completed: false })
    }).then(() => {
      setTask('');
      fetchTodos();
    });
  };

  const toggleComplete = (id, completed) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    }).then(fetchTodos);
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, { method: 'DELETE' })
      .then(fetchTodos);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Todo List</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer'
              }}
              onClick={() => toggleComplete(todo.id, todo.completed)}
            >
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '10px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
