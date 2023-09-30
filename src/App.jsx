import { useState, useEffect, useMemo } from 'react';
import Questions from './components/Questions';
import './App.css';
import Timer from './components/Timer';
import Start from './components/Start';

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState('$ 0');

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
          correct: true,
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
          text: 'Un fouet',
          correct: true,
        },
        {
          text: 'Un balai',
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: 'Comment s\'organise claire lorsqu\'elle parle en voyage ? ',
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
      id: 6,
      question: 'Quand Claire étudiante, quelle genre de plat se préparait elle ?',
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
      id: 7,
      question: 'Parmi les continents suivants, quels est le continent qu\'elle n\'a pas visité ?',
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
      id: 10,
      question: 'Pourquoi ne faut-il pas montrer de vidéo à sensation à Timothée ?',
      answers: [
        {
          text: 'Il va éssayer de le faire à sa manière à un moment improbable',
          correct: true,
        },
        {
          text: 'Ca le stress, il ne supporte pas les sensations fortes',
          correct: false,
        },
        {
          text: 'Il tombe dans les pommes, c\'est trop pour lui',
          correct: false,
        },
        {
          text: 'Il va être jaloux de la personne qui effectue la vidéo',
          correct: false,
        },
      ],
    },
    {
      id: 11,
      question: 'Quelle est l\'invention de Timothée qui a faillit l\'envoyer à l\'hopital ?',
      answers: [
        {
          text: 'Un parachute',
          correct: true,
        },
        {
          text: 'Des Skis',
          correct: true,
        },
        {
          text: 'Un Poêle Rocket',
          correct: true,
        },
        {
          text: 'Il va être jaloux de la personne qui effectue la vidéo',
          correct: true,
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
      id: 14,
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
    {
      id: 15,
      question: 'Comment Timothée s\'est rééduqué les poignets après une double fracture ?',
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
    }



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
    // Show the previous question's amount unless user is on the first question
    questionNumber > 1 &&
      setEarned(moneyPyramid.find(m => m.id === questionNumber - 1).amount);
  }, [moneyPyramid, questionNumber]);

  return (
    <div className='App'>
      {username ? (
        <>
          <div className='main'>
            {stop ? (
              <h1 className='endText'>You earned: {earned}</h1>
            ) : (
              <>
                <div className='top'>
                  <div className='timer'>
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className='bottom'>
                  <Questions
                    data={data}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className='pyramid'>
            <ul className='moneyList'>
              {moneyPyramid.map(money => (
                <li
                  className={
                    questionNumber === money.id
                      ? 'moneyListItem active'
                      : 'moneyListItem'
                  }
                >
                  <span className='moneyListItemNumber'>{money.id}</span>
                  <span className='moneyListItemNumber'>{money.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <Start setUsername={setUsername} />
      )}
    </div>
  );
}

export default App;
