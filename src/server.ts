import router from './routes/templateRouter'
import express from 'express'
import cors from 'cors';
import logger from './logger';
import path from 'path'

const app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use('/logs', express.static('./logs'));

app.post('/api/restart', (req, res) => {
  // Perform any necessary cleanup or save data before restarting (optional)
  res.status(200).json({ message: 'Server is restarting...' });
  process.exit(0); // This will restart the server process
});

app.use('/api/template',router)

export const start = async () => {
    try{
      app.listen(3005,()=> logger.info("Server Running!"));
    }catch(e){
      console.log(e);
      process.exit(0)
    }
}