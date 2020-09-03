import React, { useContext, useEffect } from 'react';
import { QuizContext } from '../provider/QuizProvider';
import { Difficulty, Category } from '../Types/types'
import Axios from 'axios';


const difficulties: Difficulty[] = [
    Difficulty.EASY,
    Difficulty.MEDIUM,
    Difficulty.HARD
];
async function getCachedData(cacheName: string, url: string) {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    if (!cachedResponse || !cachedResponse.ok) {
        return false;
    }

    return await cachedResponse.json();
}

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
            // eslint-disable-next-line
            const url = 'https://opentdb.com/api_category.php';
            try {
                const {
                    data: {
                        trivia_categories
                    }
                } = await Axios.get(url);
                setcategories(trivia_categories);
            }
            catch (err) {
                console.log('Problem with fetch (Internet offline ?): ',
                    err.message);
                const data = await getCachedData('Quizee-Dynamic-Cache', url);
                const {
                    data: {
                        trivia_categories
                    }
                } = data;
                setcategories(trivia_categories);
            }
        }
        getCategories();
    },
        // eslint-disable-next-line
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
