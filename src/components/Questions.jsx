import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import './questions.css';
import play from '../assets/src_sounds_play.mp3';
import correct from '../assets/src_sounds_correct.mp3';
import wrong from '../assets/src_sounds_wrong.mp3';

const TIMEOUT = 3000;

export default function Questions({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
}) {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState('answer');
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = a => {
    setSelectedAnswer(a);
    setClassName('answer active');
    delay(TIMEOUT, () =>
      setClassName(a.correct ? 'answer correct' : 'answer wrong')
    );
    delay(TIMEOUT, () => {
      if (a.correct) {
        correctAnswer();
        delay(TIMEOUT, () => {
          setQuestionNumber(prev => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(TIMEOUT, () => {
          setQuestionNumber(prev => prev + 1);
          setSelectedAnswer(null);
          // setStop(true);
        });
      }
    });
  };

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className='Questions'>
      <div className='question'>{question?.question}</div>
      <div className='answers'>
        {question?.answers.map((answer, i) => (
          <div
            className={selectedAnswer === answer ? className : 'answer'}
            onClick={() => handleClick(answer)}
          >
            {letters[i]}. {answer.text}
          </div>
        ))}
      </div>
    </div>
  );
}
