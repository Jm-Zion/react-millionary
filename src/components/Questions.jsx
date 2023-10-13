import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
import './questions.css';
import play from '../assets/src_sounds_play.mp3';
import correct from '../assets/src_sounds_correct.mp3';
import wrong from '../assets/src_sounds_wrong.mp3';

const TIMEOUT = 3000;

export default function Questions({
  hideHalf,
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
}) {
  const didClick = React.useRef({ value: false });
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
    if (didClick.current.value === false) {
      didClick.current.value = true;
      setSelectedAnswer(a);
      setClassName('answer active');
      delay(TIMEOUT, () => {
        setClassName(a.correct ? 'answer correct' : 'answer wrong');
        didClick.current.value = false;

      });
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
    }
  };

  const letters = ['A', 'B', 'C', 'D'];


  let shuffled = React.useMemo(() => {
    // Remove 2 answers randomly from question.answers if hideHalf is true The answers must contains the correct answer plus another random answer
    if (hideHalf) {
      return data[questionNumber - 1].answers.filter(a => !a.correct).sort(() => Math.random() - 0.5);
      // const correctAnswer = question.answers.find(a => a.correct);
      // Pick random element from shuffled 
      // shuffled.splice(shuffled.indexOf(correctAnswer), 1);
      // const answers = [...shuffled, correctAnswer];
      // shuffle answers
      // answers.sort(() => Math.random() - 0.5);
    }
    return [];

  }, [hideHalf, data, questionNumber])

  // Randomly hide two answers
  return (
    <div className='Questions'>
      <div className='question'>{question?.question}</div>
      <div className='answers'>
        {question?.answers.map((answer, i) => (
          <div
            style={{ display: shuffled.length > 0 ? shuffled[0].text === answer.text || shuffled[1].text === answer.text ? 'none' : undefined : undefined }}
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
