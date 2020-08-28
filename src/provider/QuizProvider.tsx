import React, { createContext, useState } from 'react';
import { getQuestions } from '../services/getQuestions';
import { QuestionState, Difficulty, Category } from '../Types/types'
type quizContext = {
    goToQuizMenu: (e: React.MouseEvent<HTMLButtonElement>) => void
    nextQuestion: (e: React.MouseEvent<HTMLButtonElement>) => void
    startQuiz: () => Promise<void>
    questionAmountHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
    difficultyHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void
    checkAnswer: (q: React.MouseEvent<HTMLButtonElement>) => void
    setcategories: any
    setCategoryId: any
    categories: Category[]
    gameOver: boolean
    isLoading: boolean
    questionNo: number
    score: number
    totalQuestions: string
    questions: QuestionState[]
    userAnswers: UserAnswer[]
}
type UserAnswer = {
    correct: string
    userClicked: string
}
export const QuizContext = createContext<Partial<quizContext>>({});



export const QuizProvider: React.FC = ({ children }) => {
    const [totalQuestions, setTotalQuestions] = useState('10');
    const [difficulty, setDifficulty] = useState(Difficulty.EASY);
    const [questions, setQuestions] = useState<QuestionState[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [gameOver, setGameOver] = useState(true);
    const [categoryId, setCategoryId] = useState("10")
    const [categories, setcategories] = useState<Category[]>([])
    const [questionNo, setQuestionNo] = useState(0);
    const [score, setscore] = useState(0);
    const [userAnswers, setuserAnswers] = useState<UserAnswer[]>([]);


    const startQuiz = async () => {
        setGameOver(false);
        setIsLoading(true);
        const result = await getQuestions({
            amount: totalQuestions,
            difficulty,
            category: categoryId
        });
        setQuestionNo(0);
        setQuestions(result);
        setIsLoading(false);
        setuserAnswers([]);
    };

    const questionAmountHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTotalQuestions(e.currentTarget.value);
    }
    const difficultyHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.value) {
            case Difficulty.EASY:
                setDifficulty(Difficulty.EASY);
                break;
            case Difficulty.MEDIUM:
                setDifficulty(Difficulty.MEDIUM);
                break;
            case Difficulty.HARD:
                setDifficulty(Difficulty.HARD);
                break;
        }
    }
    const nextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
        setQuestionNo(questionNo + 1);
    }
    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        const correctAnswer = questions[questionNo].correct_answer;
        setuserAnswers([
            ...userAnswers,
            {
                correct: correctAnswer,
                userClicked: e.currentTarget.value
            }
        ])
        if (correctAnswer === e.currentTarget.value) {
            setscore(score + 1);
        }
    }
    const goToQuizMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        setGameOver(true);
        setscore(0);
    }
    return (
        <QuizContext.Provider value={{
            startQuiz,
            nextQuestion,
            questionAmountHandler,
            difficultyHandler,
            setcategories,
            setCategoryId,
            categories,
            gameOver,
            isLoading,
            questionNo,
            score,
            totalQuestions,
            questions,
            userAnswers,
            checkAnswer,
            goToQuizMenu
        }}>
            {children}
        </QuizContext.Provider>
    )
}




