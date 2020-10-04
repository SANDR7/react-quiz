import React, { useState } from "react";
import { Difficulty, fetchQuizQuestions } from "./API";
import QuestionCard from "./components/QuestionCard";
import './style/style.scss';

const TOTAL_QUESTIONS = 10;


export const App: React.FC = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestion] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  // console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestion(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      //users answer
      const answer = e.currentTarget.value;
      // check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // add score if answer is corect
      if(correct) setScore((prev) => prev + 1);
      // save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }

  };

  const nextQuestion = () => {
    // move on the next question if not the last question
    const nextQuestion = number + 1;
    
    if(nextQuestion === TOTAL_QUESTIONS) {
    setGameOver(true);
    } else {
      setNumber(nextQuestion)
    }
  };

  return (
    <div className="quiz">
      <h1>React Quiz</h1>
      <div>General Knowledge</div>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && <p className="loading">Loading Qestion...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null }
    </div>
  );
};

export default App;
