import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import { setUserAnwsers } from '../controller';
import constants from '../constants'; 

const { connectKey } = constants;

const validationSchema = z.object({
    data: z.array(z.object({
        code: z.number().gt(0).lte(5),
        answer: z.number().gt(0).lte(5)
    }))
});

export default async (req: Request, res: Response, next: NextFunction) => {
    console.log('add anwsers:', req.body, req.sessionID);
    console.log('add anwsers:', req.cookies, ' cookie' );

    try {
        const validData = validationSchema.parse(req.body);
        const userId =  req.cookies[connectKey] //req.sessionID;
        if (!userId) {
            throw Error('Invalid user!');
        }
        const result = await setUserAnwsers(userId, validData);
        return res.json({
            updated: true
        });
    } catch (error) {
        console.error('Not able to save anwser ', error);
        res.sendStatus(400).end('Invalid request!');
    }
}