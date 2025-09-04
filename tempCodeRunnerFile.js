const express = require('express');
 const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
 app.use('/tasks', taskRoutes);

app.listen(PORT, () => {