import express from 'express';
import routes from './routes/index';

const port = 5000;
const app = express();

app.use('/api', routes);

app.get('/', function(res, req) {
  res.send('Welcome to image process API.');
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

export default app;
