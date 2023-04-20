import { Request, Response } from 'express';
import { getData } from '../controller';
import { getUserId } from './util';
import { AnswersApi } from '../types';

export default async (req: Request, res: Response) => {
    try {
        const userId = getUserId(req);
        if (typeof userId === 'string') {
            const userData = (await  getData(userId)) as AnswersApi;
            const { data }  = userData;
            const score = {
                tierA: 0,
                tierB: 0,
            }

            for (let answ of data) {
                if (answ.answer > 3) {
                    score.tierB +=1 
                } else {
                    score.tierA +=1;
                }
            }

           return res.json({
            "Introvert": score.tierA,
            "Extrovert": score.tierB
           });
        } else {
            res.sendStatus(404).end("Not found!");
        }
 
    } catch (error) {
        console.error('Not able to save anwser ', error);
        res.sendStatus(400).end('Invalid request!');
    }
}