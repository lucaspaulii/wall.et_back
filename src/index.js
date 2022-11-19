import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/usersRoutes.js';
import inflowRoutes from './routes/inflowsRoutes.js'

const app = express();
app.use(express.json());
app.use(cors());
app.use(usersRoutes);
app.use(inflowRoutes);

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`app running at: port ${port}`));