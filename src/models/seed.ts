import { quickDbInstance } from "./database";
import dataSet from "./data.json"

async function seedQuestion() {
    for (const q of  dataSet.data) {
        await quickDbInstance.db?.set(`q-${q.code}`, q);
    }
}

export default async function seed() {
    await seedQuestion();  
}