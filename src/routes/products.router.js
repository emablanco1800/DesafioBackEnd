import {Router} from 'express';
import { productManager } from '../index.js';

const productsRouter = Router()


// http://localhost:8080/products
// TRAER TODOS LOS PRODUCTOS QUE TENGA EN EL PRODUCTS.JSON Y SI RECIBO UN LIMITE TRAER HASTA ESE LIMITE

productsRouter.get('/', async (req, res) =>{
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts()

        if(limit){
            const limitedProducts = products.slice(0, limit)
            return res.json(limitedProducts)
        }

        return res.json(products)

    } catch (error){
        console.log(error);
        res.send('ERROR AL INTENTAR RECIBIR LOS PRODUCTOS')
    }
})

productsRouter.get('/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        const products = await productManager.getProductById(pid)
        res.json(products)
    } catch (error){
        console.log(error);
        res.send(`ERROR AL INTENTAR RECIBIR EL PRODUCTO CON ID ${pid}`)
    }
})

productsRouter.post('/', async (req, res) =>{
    try {
        const { title, description, price, code ,stock, status = true, category } = req.body;
        const response = await productManager.addProduct({ title, description, price ,code ,stock, status, category})
        res.json(response)
    //     let products = req.body; //VER ESTO
    // products.push(products)
    }catch (error){
        console.log(error);
        res.send(`ERROR AL INTENTAR AGREGAR PRODUCTO`)
    }
})

productsRouter.put('/:pid', async (req, res) => {
    const {pid} = req.params;

    try {
        const { title, description, price, code ,stock, status = true, category} = req.body;
        const response = await productManager.updateProduct(pid, {title, description, price, thumbnail, code ,stock, status, category})
        res.json(response)
    }catch (error){
        console.log(error);
        res.send(`ERROR AL INTENTAR EDITAR PRODUCTO CON ID ${pid}`)
    }
})

productsRouter.delete('/:pid', async (req, res) => {
    const {pid} = req.params;
    try{
        await productManager.deleteProduct(pid)
        res.send(`PRODUCTO ELIMINADO EXITOSAMENTE`)
    }catch (error){
        console.log(error);
        res.send(`ERROR AL INTENTAR ELIMINAR PRODUCTO CON ID ${pid}`)
    }
})

export { Router as productsRouter}