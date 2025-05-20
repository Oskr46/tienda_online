import cors from 'cors'
import Express from 'express'
import handleRoutesUser from "./routes/handleRoutesUser"
import handleRoutesProduct from "./routes/handleRoutesProduct"

const App = Express();

const Puerto = 3002;

App.use(cors());

App.use('/api/user/', handleRoutesUser);
App.use('/api/product/', handleRoutesProduct);

App.get('/',async(req, res)=>{
    res.json(`Servidor en funcionamiento`);
})

App.listen(Puerto, ()=>{
    console.log(`Funcionando en la ruta: http://localhost:${Puerto}`);
})