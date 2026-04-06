import express from 'express';
import rotaPessoa from './Routes/rotaPessoa.js';

const localhost = 'localhost';
const port = 3000;

const app = express();
app.use(express.json());

app.use("/", rotaPessoa);
app.listen(port, localhost, () => {
    console.log(`API escutando em http://${localhost}:${port}`);
});
