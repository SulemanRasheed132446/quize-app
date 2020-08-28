import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../provider/QuizProvider';
import { Difficulty, Category } from '../Types/types'
import Axios from 'axios';


const difficulties: Difficulty[] = [
    Difficulty.EASY,
    Difficulty.MEDIUM,
    Difficulty.HARD
];


export const QuizMenu = () => {


    const {
        startQuiz,
        questionAmountHandler,
        difficultyHandler,
        setcategories,
        setCategoryId,
        categories,
        totalQuestions
    } = useContext(QuizContext);

    useEffect(() => {
        const getCategories = async () => {
            const {
                data: {
                    trivia_categories
                }
            } = await Axios.get('https://opentdb.com/api_category.php');
            setcategories(trivia_categories);
        }
        getCategories();
    },
        [])


    return (

        <>
            <div>
                <p className="title"> Quiz App</p>
                <input type="number" min="5" max="20" step="5" onChange={questionAmountHandler} value={totalQuestions} />
                <br />
                <select onChange={(e) => setCategoryId(e.currentTarget.value)}>
                    {categories?.map((category: Category) => {
                        return (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    })}
                </select>
                <br />

                <select onChange={difficultyHandler}>
                    {difficulties.map(difficulty => {
                        return (
                            <option key={difficulty} value={difficulty}>{difficulty}</option>
                        )
                    })}

                </select>
                <br />

                <button className="btn" onClick={startQuiz} >Start Quiz</button>
            </div>
        </>
    )
}
