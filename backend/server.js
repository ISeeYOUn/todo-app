// // backend/server.js
// const express = require('express');
// const cors = require('cors');
// const app = express();
// app.use(cors());
// app.use(express.json());

// let todos = [
//   { id: 1, task: 'Learn REST API', completed: false },
//   { id: 2, task: 'Build React App', completed: false }
// ];

// // GET all todos
// app.get('/todos', (req, res) => res.json(todos));

// // GET single todo
// app.get('/todos/:id', (req, res) => {
//   const todo = todos.find(t => t.id == req.params.id);
//   res.json(todo);
// });

// // POST new todo
// app.post('/todos', (req, res) => {
//   const newTodo = { id: Date.now(), ...req.body };
//   todos.push(newTodo);
//   res.status(201).json(newTodo);
// });

// // PUT update todo
// app.put('/todos/:id', (req, res) => {
//   const index = todos.findIndex(t => t.id == req.params.id);
//   if (index !== -1) {
//     todos[index] = { ...todos[index], ...req.body };
//     res.json(todos[index]);
//   } else {
//     res.status(404).json({ message: 'Todo not found' });
//   }
// });

// // DELETE todo
// app.delete('/todos/:id', (req, res) => {
//   todos = todos.filter(t => t.id != req.params.id);
//   res.status(204).send();
// });

// app.listen(3001, () => console.log('API running on http://localhost:3001'));

// ***************second time server.js*************************8
// const express = require('express');
// const cors = require('cors');
// const app = express();
// app.use(cors());
// app.use(express.json());

// let todos = [
//   { id: 1, task: 'Learn REST API', completed: false },
//   { id: 2, task: 'Build React App', completed: false }
// ];

// app.get('/todos', (req, res) => res.json(todos));
// app.post('/todos', (req, res) => {
//   const newTodo = { id: Date.now(), ...req.body };
//   todos.push(newTodo);
//   res.status(201).json(newTodo);
// });
// app.put('/todos/:id', (req, res) => {
//   const index = todos.findIndex(t => t.id == req.params.id);
//   if (index !== -1) {
//     todos[index] = { ...todos[index], ...req.body };
//     res.json(todos[index]);
//   } else {
//     res.status(404).json({ message: 'Todo not found' });
//   }
// });
// app.delete('/todos/:id', (req, res) => {
//   todos = todos.filter(t => t.id != req.params.id);
//   res.status(204).send();
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`API running on port ${PORT}`));

// ***************third time server.js with frontend serving*************************
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, task: 'Learn REST API', completed: false },
  { id: 2, task: 'Build React App', completed: false }
];

app.get('/todos', (req, res) => res.json(todos));
app.post('/todos', (req, res) => {
  const newTodo = { id: Date.now(), ...req.body };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
app.put('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id == req.params.id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...req.body };
    res.json(todos[index]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});
app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.status(204).send();
});

// --- SERVE FRONTEND (important part) ---
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
