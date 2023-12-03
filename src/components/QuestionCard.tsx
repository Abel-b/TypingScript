import React from "react";
import { AnswerState } from "../com/API";
type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerState | undefined;
  questionNo: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNo,
  totalQuestions,
}) => {
  return (
    <>
      <div>
        Question Card
        <p className="q_number">
          Question: {questionNo} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {answers.map((answer, i) => (
            <div key={i}>
              <button disabled={!!userAnswer} value={answer} onClick={callback}>
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
