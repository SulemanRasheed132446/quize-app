import axios from 'axios'
import { Input, Question, QuestionState } from '../Types/types';
import { shuffleArray } from '../util/util';

export const getQuestions = async ({ amount, difficulty, category }: Input): Promise<QuestionState[]> => {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
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




