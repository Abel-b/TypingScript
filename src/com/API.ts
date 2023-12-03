import { shuffleArray } from "../utils";

export type Question = {
  category: string;
  correct_answer: string;
  diffculty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};
export type AnswerState = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
}

export type QuestionState = Question & { answers: string[] };
export enum difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
export const fetchQuizQuestions = async (
  amount: number,
  difficulty: difficulty
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`;
  const data = await (await fetch(endpoint)).json();

  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
