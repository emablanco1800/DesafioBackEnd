import express from 'express';
import { ProductManager } from './productManager.js';
import { productsRouter } from './routes/products.router.js';

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


export const productManager = new ProductManager;



app.use(express.json())
app.use('/api/products', productsRouter)

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`);
})