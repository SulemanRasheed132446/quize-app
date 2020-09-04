import React, { createContext, useState } from 'react';
import { getQuestions } from '../services/getQuestions';
import { QuestionState, Difficulty } from '../Types/types'


type quizContext = {
    goToQuizMenu: (e: React.MouseEvent<HTMLButtonElement>) => void
    nextQuestion: (e: React.MouseEvent<HTMLButtonElement>) => void
    startQuiz: () => Promise<void>
    difficultyHandler: (difficulty: Difficulty) => void
    checkAnswer: (q: React.MouseEvent<HTMLButtonElement>) => void
    gameOver: boolean
    isLoading: boolean
    questionNo: number
    score: number
    totalQuestions: string
    questions: QuestionState[]
    userAnswers: UserAnswer[]
    difficulty: Difficulty
}
type UserAnswer = {
    correct: string
    userClicked: string
}
export const QuizContext = createContext<Partial<quizContext>>({});



export const QuizProvider: React.FC = ({ children }) => {
    const [totalQuestions,] = useState('5');
    const [difficulty, setDifficulty] = useState(Difficulty.EASY);
    const [questions, setQuestions] = useState<QuestionState[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [gameOver, setGameOver] = useState(true);
    const [questionNo, setQuestionNo] = useState(0);
    const [score, setscore] = useState(0);
    const [userAnswers, setuserAnswers] = useState<UserAnswer[]>([]);


    const startQuiz = async () => {
        setGameOver(false);
        setIsLoading(true);
        const result = await getQuestions({
            difficulty,
        });
        setQuestionNo(0);
        setQuestions(result);
        setIsLoading(false);
        setuserAnswers([]);
    };

    const difficultyHandler = (difficulty: Difficulty) => {
        switch (difficulty) {
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
            difficultyHandler,
            gameOver,
            isLoading,
            questionNo,
            score,
            totalQuestions,
            questions,
            userAnswers,
            checkAnswer,
            goToQuizMenu,
            difficulty
        }}>
            {children}
        </QuizContext.Provider>
    )
}




