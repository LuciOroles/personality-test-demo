import  { Request, Response } from 'express';
import { getQuestion } from "../controller";
export default async (req: Request, res: Response) => {
    const data = { message: 'This is some data from the server!' };
    console.log(req.session, req.sessionID);
    const id = req.params.id;
    if (Number.isFinite(Number(id))) {
        try {
            const question= await getQuestion(Number(id))
            res.json(question);
        } catch (error) {
            console.log(error);
            res.sendStatus(404).end();
        }
    } else {
        res.sendStatus(404).end();
    }
}