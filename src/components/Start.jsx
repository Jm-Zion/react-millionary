import React, { useRef } from 'react';
import useSound from 'use-sound';
import startSound from '../assets/src_end.wav';
import StartImg from '../assets/start.jpg';
export default function Start({ setUsername }) {
  const inputRef = useRef();
  const [start] = useSound(startSound);

  const handleClick = () => {
    start()

    setTimeout(() => {
      setUsername('Started');
    }, 23 * 1000)
  };

  return (
    <div className='main'>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, alignItems: 'center', height: '100%', width: '100' }}>
        <img src={StartImg} style={{ width: 600, height: 300 }} />
        <h1 style={{ marginBottom: 100, marginTop: 100 }}>Qui veut connaitre Claire & Timothée</h1>
        <button className='startButton' onClick={handleClick} style={{ width: '50%' }}>
          Démarrer
        </button>
      </div>
    </div>
  );
}
