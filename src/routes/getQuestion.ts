import { Request, Response } from 'express';
import { getQuestion } from "../controller";
import z from 'zod';

export default async (req: Request, res: Response) => {
    const id = req.params.id;
    const idSchema = z.number().lte(5).gte(1);
    try {
        const nrId = idSchema.parse(Number(id));
        const question = await getQuestion(nrId)
        res.json(question);
    } catch (error) {
        console.log(error);
        res.sendStatus(404).end();
    }
}