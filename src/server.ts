import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const serverPort = process.env.PORT || 3000;
const app: Application = express()



app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`The server is running in Port ${serverPort}`)
})
