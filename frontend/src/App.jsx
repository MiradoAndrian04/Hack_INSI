import { useState } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState('language');
  const [language, setLanguage] = useState('fr');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  

  const quizData = {
    fr: [
      {
        id: 1,
        text: "Exemple de question 1",
        options: [
          { id: 'a', text: 'Option A', correct: false },
          { id: 'b', text: 'Option B', correct: true }
        ]
      }
    ]
  };

  const startQuiz = () => {
    setStep('quiz');
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    
    if (currentQuestion < quizData[language].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep('results');
    }
  };

  const resetQuiz = () => {
    setStep('language');
  };


  if (step === 'language') {
    return (
      <div className="app-container">
        <h1>🌍 QuizTruth Africa</h1>
        <div className="language-selection">
          <h2>Choisissez votre langue</h2>
          <div className="language-buttons">
            <button onClick={() => setLanguage('fr')} className={language === 'fr' ? 'active' : ''}>
              🇫🇷 Français
            </button>
            <button onClick={() => setLanguage('mg')} className={language === 'mg' ? 'active' : ''}>
              🇲🇬 Malagasy
            </button>
            <button onClick={() => setLanguage('en')} className={language === 'en' ? 'active' : ''}>
              🇬🇧 English
            </button>
          </div>
          <button className="start-btn" onClick={startQuiz}>
            Commencer le Quiz
          </button>
        </div>
      </div>
    );
  }

  if (step === 'quiz') {
    const question = quizData[language][currentQuestion];
    return (
      <div className="app-container">
        <div className="quiz-header">
          <h2>Question {currentQuestion + 1}</h2>
          <div className="score">Score: {score}</div>
        </div>
        <div className="question-card">
          <p className="question-text">{question.text}</p>
          <div className="options">
            {question.options.map(opt => (
              <button 
                key={opt.id} 
                className="option-btn"
                onClick={() => handleAnswer(opt.correct)}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'results') {
    return (
      <div className="app-container">
        <div className="results-card">
          <h1>🎉 Quiz Terminé !</h1>
          <div className="final-score">
            Votre score: <span>{score}</span> / {quizData[language].length}
          </div>
          <button className="restart-btn" onClick={resetQuiz}>
            🔄 Recommencer
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default App;