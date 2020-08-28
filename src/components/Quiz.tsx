import React, { useContext } from 'react'
import { QuizMenu } from './QuizMenu'
import { QuizContext } from '../provider/QuizProvider'
import { QuestionCard } from './QuestionCard'
import ReactLoading from 'react-loading';
import { GlobalStyle } from '../App.styles'
export const Quiz = () => {
    const {
        gameOver,
        isLoading
    } = useContext(QuizContext)
    return (
        <div className="App">
            <GlobalStyle />
            {gameOver ? <QuizMenu /> : null}
            {isLoading ? <ReactLoading className="spinner" type={"spin"} color={"orange"} height={100} width={100} /> : null}
            {!isLoading && !gameOver ? <QuestionCard /> : null}
        </div>
    )
}
