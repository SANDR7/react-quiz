import React from "react";

interface QuestionCardProps {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNr: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answers,
  callback: callbakc,
  userAnswer,
  questionNr,
  totalQuestions,
}) => {
  return (
    <div>
      <p>
        Question: {questionNr} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer) => (
          <div className="wrapper" key={answer}>
            <button className={"choose"} value={answer} disabled={userAnswer ? true : false} onClick={callbakc}>
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default QuestionCard;
