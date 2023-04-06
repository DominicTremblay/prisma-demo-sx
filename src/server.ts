import express from 'express';
import morgan from 'morgan';
import movieRouter from './routers/movieRouter';
import actorRouter from './routers/actorRouter';

const PORT = process.env.PORT || 3001;
const app = express();

app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/movies/', movieRouter);
app.use('/api/v1/actors/', actorRouter);

app.get('/', (req, res) => {
  res.json({ msg: 'API Home' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
