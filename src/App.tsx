import React, { useState } from "react";
import { fetchQuizQuestions } from "./com/API";
import "./App.css";
//components
import QuestionCard from "./components/QuestionCard";
//types
import { QuestionState, AnswerState, difficulty } from "./com/API";
const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerState[]>([]);
  const [score, setScore] = useState(0);
  const [endQuiz, setEndQuiz] = useState(true);
  const [chooseDiff, setChooseDiff] = useState<difficulty>(difficulty.EASY);

  const startQuiz = async () => {
    setLoading(true);
    setEndQuiz(false);
    setUserAnswers([]);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, chooseDiff);

    setQuestions(newQuestions);
    setScore(0);
    setNumber(0);
    setLoading(false);

    console.log(newQuestions);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!endQuiz) {
      const answer = e.currentTarget.value;
      //check if correct
      const correct = questions[number].correct_answer === answer;

      if (correct) setScore((prev) => prev + 1); //keep score
      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObj]);
    }
  };

  const nextQuestion = () => {
    const nextNo = number + 1;
    if (nextNo == TOTAL_QUESTIONS) {
      setEndQuiz(true);
    } else {
      setNumber(nextNo);
    }
  };

  return (
    <div className="App">
      <h2>Quiz by Typescript</h2>
      {endQuiz || userAnswers.length == TOTAL_QUESTIONS ? (
        <div>
          <label htmlFor="difficulty">Choose Difficulty</label>
          <select name="difficulty" id="difficulty">
            <option value={difficulty.EASY}>Easy</option>
            <option value={difficulty.MEDIUM}>Medium</option>
            <option value={difficulty.HARD}>Hard</option>
          </select>
          <button className="startBtn" onClick={startQuiz}>
            Start
          </button>
        </div>
      ) : null}
      {!endQuiz ? <p className="score">Score:{score}</p> : null}
      {loading ? <p> Loading Questions, please wait... </p> : null}
      {!loading && !endQuiz ? (
        <QuestionCard
          questionNo={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      ) : null}
      {!endQuiz &&
      !loading &&
      userAnswers.length == number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="nextBtn" onClick={nextQuestion}>
          Next
        </button>
      ) : null}
    </div>
  );
};

export default App;
