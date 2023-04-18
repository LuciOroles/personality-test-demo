import { Question, QuestionAnswers } from "../types";
import { quickDbInstance } from "./database";

export default async function seed() {
    for (const q of [1, 2, 3, 4, 5]) {
        let que: Question = {
            code: q,
            label: `Question ${q}`,
            answers: []
        }
        for (const a of [1, 2, 3, 4]) {
            const ans: QuestionAnswers = {
                code: a,
                label: `${q} Answer ${a}`
            }

            que.answers.push(ans);
        }

        await quickDbInstance.db?.set(`q-${q}`, que);
    }
}