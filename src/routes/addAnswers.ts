import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { setUserAnwsers } from '../controller';
import { getUserId } from './util';

const validationSchema = z.object({
    data: z.array(z.object({
        code: z.number().gt(0).lte(5),
        answer: z.number().gt(0).lte(5)
    })).length(5)
});

export default async (req: Request, res: Response) => {
    try {
        const validData = validationSchema.parse(req.body);
        const userId = getUserId(req); // for the moment expecting FE to send `test/header`
      
        if (!userId) {
            throw Error('Invalid user!');
        }
        
        await setUserAnwsers(userId, validData);
      
        res.json({
            saved: true
        });
    } catch (error) {
        console.error('Not able to save anwser ', error);
        res.sendStatus(400).end('Invalid request!');
    }
}