import React from "react";
import { Button, Alert } from "react-bootstrap";
import { ButtonWrapper } from "./QuestionCard.styles";
import { AnswerState } from "../com/API";
type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerState | undefined;
  questionNo: number;
  totalQuestions: number;
  score: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNo,
  totalQuestions,
  score,
}) => {
  return (
    <>
      <div>
        <h2>Quiz by TypeScript</h2>
        <p className="q_number">Total Questions: {totalQuestions}</p>
        <p className="score">Score: {score}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h6>Question {questionNo}.</h6>
          <p dangerouslySetInnerHTML={{ __html: question }} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {answers.map((answer, i) => (
            <div key={i}>
              <ButtonWrapper
                key={answer}
                correct={userAnswer?.correctAnswer === answer}
                userClicked={userAnswer?.answer === answer}
              >
                <Button
                  variant={
                    userAnswer?.correctAnswer === answer
                      ? "success"
                      : !(userAnswer?.correctAnswer === answer) &&
                        userAnswer?.answer === answer
                      ? "danger"
                      : "info"
                  }
                  disabled={!!userAnswer}
                  value={answer}
                  onClick={callback}
                >
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </Button>
              </ButtonWrapper>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
