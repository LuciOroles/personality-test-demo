declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SESSION_SECRET: string;
        }
    }
}

export interface QuestionAnswers {
    code: number;
    label: string;
}

export interface Question {
    code: number;
    label: string;
    answers: QuestionAnswers[]
}


export interface Responses {
    code: Question['code'],
    answer: QuestionAnswers['code']
}


export { }