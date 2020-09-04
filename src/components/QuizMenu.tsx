import React, { useContext } from 'react';
import { QuizContext } from '../provider/QuizProvider';
import { Difficulty } from '../Types/types'
import { Grid } from '@material-ui/core'
import { DifficultyOption } from './QuestionCard.styles'
const difficulties: Difficulty[] = [
    Difficulty.EASY,
    Difficulty.MEDIUM,
    Difficulty.HARD
];

export const QuizMenu = () => {


    const {
        startQuiz,
        difficultyHandler,
        difficulty
    } = useContext(QuizContext);




    return (

        <>
            <div>
                <p className="title"> Quiz App</p>
                <br />
                <Grid container justify="space-between" alignContent="space-around">
                    {difficulties.map(difficultyLevel => {
                        return (
                            <Grid key={difficultyLevel} xs={12} sm={4} container item >
                                <DifficultyOption selected={difficulty === difficultyLevel} onClick={() => difficultyHandler!(difficultyLevel)}>
                                    <div >{difficultyLevel.toUpperCase()}</div>
                                </DifficultyOption>
                            </Grid>
                        )
                    })}

                </Grid>
                <br />

                <button className="btn" onClick={startQuiz} >Start Quiz</button>
            </div>
        </>
    )
}
