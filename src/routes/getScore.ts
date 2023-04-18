import { Request, Response } from 'express';
import { getData } from '../controller';
import constants from '../constants';  

export default async (req: Request, res: Response) => {

    try {
        const userId = req.cookies[constants.connectKey];
        if (typeof userId === 'string') {
            const userData = await  getData(userId);
           return res.json(userData);
        } else {
            res.sendStatus(404).end("Not found!");
        }
 
    } catch (error) {
        console.error('Not able to save anwser ', error);
        res.sendStatus(400).end('Invalid request!');
    }
}