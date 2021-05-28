import express from 'express';
import routes from './routes/index';
import morgan from 'morgan';

const port = 5000;
const app = express();

app.use(morgan('combined'));

app.use('/api', routes);

app.get('/', function(req, res) {
  res.send('Welcome to image process API.');
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

export default app;
