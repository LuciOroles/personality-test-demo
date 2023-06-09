import { quickDbInstance } from "../models/database";
import { AnswersApi } from "../types";

export async function getData<T>(key: string): Promise<T | null> {
    try {
        const db = quickDbInstance.db;
        if (!db) {
            throw Error("DB not available")
        }
        const result = await db.get(key);
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export async function setData<T>(key: string, value: T): Promise<T | null> {
    const db = quickDbInstance.db;
    if (!db) {
        throw Error("DB not available")
    }
    if (await db.has(key)) {
        throw Error(`The key ${key} is already set`);
    }
    const result = await db.set(key, value);
    return result;

}


export async function getQuestion(questionNr: number) {
    return await getData(`q-${questionNr}`)
}

export async function setUserAnwsers(userId: string, anwsers: AnswersApi) {

    await setData(userId, anwsers);
}