import React, { useState } from "react";
import { fetchQuizQuestions } from "./com/API";
import "./App.css";
//components
import QuestionCard from "./components/QuestionCard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import TodoList from "./components/TodoList";
import { Button, Image } from "react-bootstrap";
//types
import { QuestionState, AnswerState, difficulty } from "./com/API";
//images
import bgImageQuiz from "./images/quiz_landing_time.jpg";
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
    <div className="App" style={{ width: "100%", height: "100%" }}>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "wrap",
          marginBottom: 100,
        }}
      >
        <div
          className="todoContainer"
          style={{
            minWidth: "400px",
            padding: 7,
            maxWidth: "400px",
          }}
        >
          <TodoList />
        </div>
        <div
          className="quizContianer"
          style={{
            width: "400px",
            borderRadius: 10,
            backgroundColor: "#f2f2f2",
            minHeight: "500px",
            padding: 7,
          }}
        >
          <Image thumbnail src={bgImageQuiz} />
          {endQuiz || userAnswers.length == TOTAL_QUESTIONS ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <label htmlFor="difficulty">Choose Difficulty</label>
              <select name="difficulty" id="difficulty">
                <option value={difficulty.EASY}>Easy</option>
                <option value={difficulty.MEDIUM}>Medium</option>
                <option value={difficulty.HARD}>Hard</option>
              </select>
              <Button
                style={{ marginTop: 10 }}
                variant="success"
                className="startBtn"
                onClick={startQuiz}
              >
                Start
              </Button>
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {loading ? <p> Loading Questions, please wait... </p> : null}
            {!loading && !endQuiz ? (
              <div
                style={{
                  display: "flex",
                  padding: 7,
                  justifyContent: "center",
                }}
              >
                <QuestionCard
                  questionNo={number + 1}
                  totalQuestions={TOTAL_QUESTIONS}
                  question={questions[number].question}
                  answers={questions[number].answers}
                  userAnswer={userAnswers ? userAnswers[number] : undefined}
                  callback={checkAnswer}
                  score={score}
                />
              </div>
            ) : null}
          </div>
          <div>
            {!endQuiz &&
            !loading &&
            userAnswers.length == number + 1 &&
            number !== TOTAL_QUESTIONS - 1 ? (
              <>
                <Button className="nextBtn" onClick={nextQuestion}>
                  Next
                </Button>
              </>
            ) : null}
            {!endQuiz && !loading ? (
              <Button
                style={{ marginLeft: 5 }}
                variant="danger"
                className="nextBtn"
                onClick={() => {
                  setEndQuiz(true);
                }}
              >
                Quit
              </Button>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
