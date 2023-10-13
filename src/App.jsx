import { useState, useEffect, useMemo } from 'react';
import Timer from './components/Timer';
import useSound from 'use-sound';
import Questions from './components/Questions';
import './App.css';
import startSound from './assets/src_end.wav';
import Start from './components/Start';
import Fifty from './assets/src_jocker_50_50.wav';

function App() {
  const [hideHalf, setHideHalf] = useState(false);
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState('$ 0');
  const [runFiftySound] = useSound(Fifty)
  const [runEnd] = useSound(startSound)

  const data = [
    {
      id: 1,
      question: 'Claire avait 6 ans, elle l\'a perdu, c\'était vraiment difficile pour elle, de quoi s\'agit il ? ',
      answers: [
        {
          text: 'Son doudou',
          correct: true,
        },
        {
          text: 'Sa première dent de lait',
          correct: false,
        },
        {
          text: 'Son gouter',
          correct: false,
        },
        {
          text: 'Sa tétine',
          correct: false,
        },
      ],
    },
    {
      id: 13,
      question: 'Quel était le déguisement préféré de Timothée quand il était petit ?',
      answers: [
        {
          text: 'Davy Crockett',
          correct: true,
        },
        {
          text: 'Lucky Luke',
          correct: false,
        },
        {
          text: 'Asterix',
          correct: false,
        },
        {
          text: 'Tintin',
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: 'Claire aime chanter, pour ça elle utilise un outil très spécial, duquel s\'agi-t il ?',
      answers: [
        {
          text: 'Un micro karaoké',
          correct: false,
        },
        {
          text: 'La queue de son cheval',
          correct: false,
        },
        {
          text: 'Un fouet de cuisine',
          correct: true,
        },
        {
          text: 'Un balai',
          correct: false,
        },
      ],
    },
    {
      id: 11,
      question: 'Quelle est l\'invention de Timothée qui a faillit l\'envoyer à l\'hopital ?',
      answers: [
        {
          text: 'Un Parachute',
          correct: true,
        },
        {
          text: 'Des Skis cloutés',
          correct: true,
        },
        {
          text: 'Un Poêle Rocket',
          correct: false,
        },
        {
          text: 'Un vélo éléctrique',
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: 'Comment s\'organise Claire lorsqu\'elle part en voyage ? ',
      answers: [
        {
          text: 'Très organisée, elle fait ses valises 2 semaines avant',
          correct: false,
        },
        {
          text: 'Elle ne prépare rien et prendra tout sur place',
          correct: false,
        },
        {
          text: 'LastMinute.com, elle fait ses valises au dernier moment',
          correct: true,
        },
        {
          text: '1 semaine avant c\'est très bien',
          correct: false,
        },
      ],
    },
    {
      id: 14,
      question: 'Ou Timothée à t\'il fait son master ?',
      answers: [
        {
          text: 'Lille',
          correct: false,
        },
        {
          text: 'Grenoble',
          correct: true,
        },
        {
          text: 'Montpellier',
          correct: false,
        },
        {
          text: 'Perpignan',
          correct: false,
        },
      ],
    },
    {
      id: 4,
      question: 'Quels diplômes Claire a t\'elle obtenu ?',
      answers: [
        {
          text: 'Master en logistique',
          correct: false,
        },
        {
          text: 'Certification Marie Kondo de niveau II',
          correct: false,
        },
        {
          text: 'Diplôme d\'animatrice équestre',
          correct: true,
        },
        {
          text: 'licence pro métiers de l\'information : métiers du journalisme et de la presse',
          correct: false,
        },
      ],
    },
    {
      id: 5,
      question: 'Quel est le rêve de claire ?',
      answers: [
        {
          text: 'Transformer sa voiture en van pour camper',
          correct: false,
        },
        {
          text: 'Faire le tour du monde en vélo',
          correct: false,
        },
        {
          text: 'Ouvrir un centre équestre',
          correct: true,
        },
        {
          text: 'Vivre à disneyland',
          correct: false,
        },
      ],
    },
    {
      id: 10,
      question: 'Il a quelques années, montrer une vidéo à sensation fortes à Timothée comportait un risque, lequel ?',
      answers: [
        {
          text: 'Il va essayer de le reproduire à sa manière à un moment improbable',
          correct: true,
        },
        {
          text: 'Il va le faire en plus intense encore',
          correct: false,
        },
        {
          text: 'Il tombe dans les pommes, c\'est trop pour lui',
          correct: false,
        },
        {
          text: 'Il n\'y a aucun risque',
          correct: false,
        },
      ],
    },

    {
      id: 6,
      question: 'Quand Claire était étudiante, quelle genre de plat se préparait elle ?',
      answers: [
        {
          text: 'Des pâtes à toute les sauces',
          correct: false,
        },
        {
          text: 'KFC, c\'est très bien',
          correct: false,
        },
        {
          text: 'Des plats 3 étoiles',
          correct: true,
        },
        {
          text: 'Repas rapide, fast-food',
          correct: false,
        },
      ],
    },
    {
      id: 16,
      question: 'Comment Timothée s\'est rééduqué les poignets après une double fracture ?',
      answers: [
        {
          text: 'En faisait du vélo',
          correct: false,
        },
        {
          text: 'En Jouant du Volley',
          correct: false,
        },
        {
          text: 'Chez le Kiné ( Avec Jauffrey )',
          correct: false,
        },
        {
          text: 'En jouant au babyfoot',
          correct: true,
        },
      ],
    },
    {
      id: 7,
      question: 'Parmi les continents suivants, quel est le continent qu\'elle n\'a pas visité ?',
      answers: [
        {
          text: 'Amérique',
          correct: false,
        },
        {
          text: 'L\'Europe',
          correct: false,
        },
        {
          text: 'L\'Océanie',
          correct: true,
        },
        {
          text: 'L\'Asie',
          correct: false,
        },
      ],
    },
    {
      id: 9,
      question: 'Comment Timothée prend il soin de sa voiture ?',
      answers: [
        {
          text: 'Il la brûle',
          correct: false,
        },
        {
          text: 'Il fais méticuleusement tous les entretiens chez le constructeur',
          correct: false,
        },
        {
          text: 'Il fait l\'entretien lui-même',
          correct: true,
        },
        {
          text: 'Un coup de scotch par-ci par là.',
          correct: false,
        },
      ],
    },
    {
      id: 8,
      question: 'A quoi ressemble la voiture de Claire ?',
      answers: [
        {
          text: 'Sa Maison',
          correct: true,
        },
        {
          text: 'Un centre d\'équitation',
          correct: true,
        },
        {
          text: 'Un studio d\'enregistrment',
          correct: true,
        },
        {
          text: 'Un garde-manger',
          correct: true,
        },
      ],
    },
    {
      id: 15,
      question: 'Timothée ne monte que des sommets qui font plus de :',
      answers: [
        {
          text: 'Pas de minimum',
          correct: true,
        },
        {
          text: '1000m',
          correct: false,
        },
        {
          text: '2000m',
          correct: false,
        },
        {
          text: '3000m',
          correct: false,
        },
      ],
    },
  ];

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: '$ 100' },
        { id: 2, amount: '$ 200' },
        { id: 3, amount: '$ 300' },
        { id: 4, amount: '$ 500' },
        { id: 5, amount: '$ 1,000' },
        { id: 6, amount: '$ 2,000' },
        { id: 7, amount: '$ 4,000' },
        { id: 8, amount: '$ 8,000' },
        { id: 9, amount: '$ 16,000' },
        { id: 10, amount: '$ 32,000' },
        { id: 11, amount: '$ 64,000' },
        { id: 12, amount: '$ 125,000' },
        { id: 13, amount: '$ 250,000' },
        { id: 14, amount: '$ 500,000' },
        { id: 15, amount: '$ 1,000,000' },
      ].reverse(),
    []
  );

  useEffect(() => {
    setHideHalf(false);
    // Show the previous question's amount unless user is on the first question
    questionNumber > 1 &&
      setEarned(moneyPyramid.find(m => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  useEffect(() => {
    if (questionNumber === data.length) {
      runEnd()
    }
  }, [questionNumber])
  return (
    <div className='App'>
      {username ? (
        <>
          <div className='main'>
            {questionNumber === data.length ? (
              <h1 className='endText'>Merci à tous !</h1>
            ) : (
              <>
                <div className='top'>
                  <div className='timer'>
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                  <div className="question-title">
                    Question n°{questionNumber}
                  </div>
                  <div className="fifty-fifty" onClick={() => { setHideHalf(prev => !prev); runFiftySound() }}>
                    50/50
                  </div>
                </div>
                <div className='bottom'>
                  <Questions
                    hideHalf={hideHalf}
                    data={data}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <button onClick={() => { if (questionNumber > 1) { setQuestionNumber(prev => prev - 1) } }}>Question Précédente</button>
                  <button onClick={() => { if (questionNumber <= data.length) { setQuestionNumber(prev => prev + 1) } }}>Question Suivante</button>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
