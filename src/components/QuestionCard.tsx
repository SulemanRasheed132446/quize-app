import React, { useContext } from 'react'
import { QuizContext } from '../provider/QuizProvider'
import { ButtonWrapper } from './QuestionCard.styles'
export const QuestionCard = () => {
    const {
        questionNo,
        score,
        totalQuestions,
        questions,
        userAnswers,
        checkAnswer,
        nextQuestion,
        goToQuizMenu,
    } = useContext(QuizContext)!;
    const disabled = userAnswers ? !!userAnswers![questionNo!] : undefined;
    const correctAnswer = userAnswers?.[questionNo!] ? userAnswers![questionNo!].correct : undefined;
    const userClicked = userAnswers?.[questionNo!] ? userAnswers![questionNo!].userClicked : undefined;


    return (
        <div>
            <p className="score">Score :{score}</p>
            <p>Questions: {`${questionNo! + 1} /  ${totalQuestions}`}</p>
            <p
                dangerouslySetInnerHTML={{ __html: questions![questionNo!].question }}
            ></p>
            <div>
                {questions![questionNo!].answers.map(answer => {
                    return (
                        <ButtonWrapper
                            userClicked={userClicked ? userClicked === answer : false}
                            correct={correctAnswer ? correctAnswer === answer : false}
                            key={answer} >
                            <button
                                onClick={checkAnswer}
                                disabled={disabled}
                                dangerouslySetInnerHTML={{ __html: answer }}
                                value={answer}
                            >
                            </button>
                        </ButtonWrapper>);
                })
                }
            </div>
            {
                disabled && (questionNo! + 1 !== Number(totalQuestions!)) ? (
                    <button onClick={nextQuestion} className="btn">Next</button>
                ) : null
            }
            {
                disabled && (questionNo! + 1 === Number(totalQuestions!)) ? (
                    <button onClick={goToQuizMenu} className="btn">Go to Quiz Page</button>
                ) : null
            }
        </div>
    )
}
