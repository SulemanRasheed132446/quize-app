import axios from 'axios'
import { Input, Question, QuestionState } from '../Types/types';
import { shuffleArray } from '../util/util';



async function getCachedData(cacheName: string, url: string) {
    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    if (!cachedResponse || !cachedResponse.ok) {
        return false;
    }
    console.log(cachedResponse);

    return await cachedResponse.json();
}

export const getQuestions = async ({ difficulty }: Input): Promise<QuestionState[]> => {
    const url = `https://opentdb.com/api.php?amount=5&category=12&difficulty=${difficulty}&type=multiple`;
    try {
        const { data: {
            results
        } } = await axios.get(url);

        return results.map((question: Question): QuestionState => {
            return {
                question: question.question,
                correct_answer: question.correct_answer,
                answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
            }
        })
    }
    catch (err) {
        const data = await getCachedData('Quizee-Dynamic-Cache', url);
        const { results } = data;
        return results.map((question: Question): QuestionState => {
            return {
                question: question.question,
                correct_answer: question.correct_answer,
                answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
            }
        })
    }

}




