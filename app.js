import express from 'express';
import chalk from './index.js/chalk/source';

const app = express();
const PORT = process.env.PORT || 3000;

// Home route
app.get('/', (req, res) => {
  console.log(chalk.green("Someone accessed your website!"));
  res.send("<h1>Hello AI World! 🚀</h1><p>This is your Node.js website.</p>");
});

// Start server
app.listen(PORT, () => {
  console.log(chalk.blue(`Server is running on port ${PORT}`));
});

