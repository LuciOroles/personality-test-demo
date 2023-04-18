import constants from "../constants";
import { Question,QuestionAnswers, Answer } from "../types";
import { quickDbInstance } from "./database";

async function seedTestUser() {
    const answers: Answer[] = [];
    for (const i of [1,2,3,4,5]) {
        answers.push({ code: i, answer: 1 })
    }
    await  quickDbInstance.db?.set(constants.test, {
        data: answers
    });
}

async function seedQuestion() {
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

export default async function seed() {
    await seedQuestion();
    await seedTestUser();   
}