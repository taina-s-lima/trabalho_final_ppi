import express from 'express';
import rotaPessoa from './Routes/rotaPessoa.js';
import rotaImovel from './Routes/rotaImovel.js';

const localhost = 'localhost';
const port = 3000;

const app = express();
app.use(express.json());

app.use("/", rotaPessoa);
app.use("/", rotaImovel);
app.listen(port, localhost, () => {
    console.log(`API escutando em http://${localhost}:${port}`);
});
