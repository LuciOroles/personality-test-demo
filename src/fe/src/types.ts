
export interface QuestionAnswers {
    code: number;
    label: string;
}

export interface Question {
    code: number;
    label: string;
    answers: QuestionAnswers[]
}


export interface Answer {
    code: Question['code'],
    answer: QuestionAnswers['code']
}

export interface AnswersApi {
    data: Answer[]
}

 