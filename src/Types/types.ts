export type Input = {
    amount: string,
    difficulty: Difficulty,
    category: string
}
export type Category = {
    id: number
    name: string
}
export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}
export type Question = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: string[]
    question: string
    type: string
}
export type QuestionState = {
    question: string
    correct_answer: string
    answers: string[]
};
export type QuizInput = {
    difficulty: Difficulty
    category: string
}