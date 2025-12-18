import React, { useState } from 'react';
import { Sparkles, Globe, Brain, Trophy, ChevronRight, Lightbulb, RotateCcw, CheckCircle } from 'lucide-react';

export default function QuizApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const languages = [
    { code: 'mlg', name: 'Malagasy', flag: 'Mg' },
    { code: 'fr', name: 'Francais', flag: 'Fr' },
    { code: 'en', name: 'English', flag: 'Gb' },
  ];

  const themes = [
    { id: 'science', name: 'Sciences', color: '#22d3ee', gradient: 'from-cyan-400 to-blue-500' },
    { id: 'history', name: 'Histoire', color: '#fb923c', gradient: 'from-orange-400 to-red-500' },
    { id: 'geography', name: 'Géographie', color: '#4ade80', gradient: 'from-green-400 to-emerald-500' },
    { id: 'art', name: 'Art', color: '#f472b6', gradient: 'from-pink-400 to-rose-500' }
  ];

  const questions = [
    {
      q: "Quelle est la capitale de la France ?",
      options: ["Paris", "Londres", "Berlin", "Rome"],
      correct: 0,
      hint: "C'est la ville lumière",
      level: "Facile"
    },
    {
      q: "Combien de continents y a-t-il sur Terre ?",
      options: ["5", "6", "7", "8"],
      correct: 2,
      hint: "Il y a l'Antarctique aussi",
      level: "Moyen"
    },
    {
      q: "Quelle est la vitesse de la lumière ?",
      options: ["300 000 km/s", "150 000 km/s", "500 000 km/s", "200 000 km/s"],
      correct: 0,
      hint: "C'est un chiffre rond avec beaucoup de zéros",
      level: "Difficile"
    },
    {
      q: "Qui a peint la Joconde ?",
      options: ["Picasso", "Van Gogh", "Léonard de Vinci", "Monet"],
      correct: 2,
      hint: "C'était aussi un inventeur",
      level: "Facile"
    },
    {
      q: "Quelle est la plus grande planète du système solaire ?",
      options: ["Saturne", "Jupiter", "Neptune", "Terre"],
      correct: 1,
      hint: "Elle a une grande tache rouge",
      level: "Moyen"
    }
  ];

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleValidate = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    if (currentQuestion < 4) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowHint(false);
      }, 500);
    } else {
      setTimeout(() => {
        setCurrentPage('results');
      }, 500);
    }
  };

  const restart = () => {
    setCurrentPage('home');
    setSelectedLanguage(null);
    setSelectedTheme(null);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowHint(false);
    setIsLanguageDropdownOpen(false);
  };

  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-sky-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-pink-300/30 to-orange-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-cyan-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-emerald-300/30 to-teal-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
          <div className="text-center mb-16"> 
            <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 bg-clip-text text-transparent leading-tight">
              AIQuest
            </h1>
            <p className="text-2xl text-gray-600 font-light">Apprendre n'a jamais été aussi amusant</p>
          </div>

          {/* Sélection de langue avec dropdown */}
          <div className="mb-12 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <Globe className="text-cyan-600" size={32} />
              <h2 className="text-3xl font-bold text-gray-800">Choisissez votre langue</h2>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="w-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-xl hover:shadow-2xl rounded-2xl p-6 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  {selectedLanguage ? (
                    <div className="flex items-center">
                      <span className="text-xl">
                        {languages.find(l => l.code === selectedLanguage)?.flag}
                      </span>
                      <span className="flex text-2xl font-semibold text-gray-800 ml-[90%]">
                        {languages.find(l => l.code === selectedLanguage)?.name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-xl text-gray-500 font-medium">Sélectionnez une langue...</span>
                  )}
                  <ChevronRight 
                    className={`text-gray-600 transition-transform duration-300 ${isLanguageDropdownOpen ? 'rotate-90' : ''}`} 
                    size={28} 
                  />
                </div>
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden z-50">
                  {languages.map((lang, index) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        setIsLanguageDropdownOpen(false);
                      }}
                      className={`w-full p-5 flex items-center gap-4 transition-all duration-200 ${
                        selectedLanguage === lang.code
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      } ${index !== languages.length - 1 ? 'border-b border-gray-200' : ''}`}
                    >
                      <span className="text-lg text-black-500">{lang.flag}</span>
                      <span className="text-2xl font-semibold flex-grow text-center">{lang.name}</span>
                      {selectedLanguage === lang.code && (
                        <CheckCircle className="text-white" size={24} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {selectedLanguage && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-3xl font-bold text-gray-800 ml-[38%]">Choisissez un thème</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`group relative p-8 rounded-3xl transition-all duration-300 transform hover:scale-105 ${
                      selectedTheme === theme.id
                        ? `bg-gradient-to-br ${theme.gradient} shadow-2xl scale-105`
                        : 'bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg'
                    }`}
                  >
                    <div className="text-6xl mb-3">{theme.icon}</div>
                    <div className={`text-xl font-bold ${
                      selectedTheme === theme.id ? 'text-white' : 'text-gray-700'
                    }`}>
                      {theme.name}
                    </div>
                    {selectedTheme === theme.id && (
                      <CheckCircle className="absolute top-4 right-4 text-white" size={28} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {selectedLanguage && selectedTheme && (
            <div className="text-center">
              <button
                onClick={() => setCurrentPage('quiz')}
                className="group inline-flex items-center gap-4 bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 text-white px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <span>Commencer l'aventure</span>
                <ChevronRight className="group-hover:translate-x-2 transition-transform" size={32} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentPage === 'quiz') {
    const currentQ = questions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correct;

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-br from-indigo-300/30 to-blue-300/30 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-gray-700 font-bold">Question {currentQuestion + 1}/5</span>
                </div>
                <div className={`px-4 py-2 rounded-full shadow-lg ${
                  currentQ.level === 'Facile' ? 'bg-green-400' :
                  currentQ.level === 'Moyen' ? 'bg-orange-400' : 'bg-red-400'
                } text-white font-bold`}>
                  {currentQ.level}
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <span className="text-gray-700 font-bold">Score: {score}</span>
              </div>
            </div>
            
            <div className="w-full bg-white/50 backdrop-blur-sm rounded-full h-3 overflow-hidden shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${((currentQuestion + 1) / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 leading-relaxed">
              {currentQ.q}
            </h2>

            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-6 rounded-2xl text-left text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                    selectedAnswer === null
                      ? 'bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 shadow-md hover:shadow-xl'
                      : selectedAnswer === index
                      ? isCorrect
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-2xl scale-[1.02]'
                        : 'bg-gradient-to-r from-red-400 to-rose-500 text-white shadow-2xl scale-[1.02]'
                      : index === currentQ.correct
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-2xl'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      selectedAnswer === null
                        ? 'bg-white/50 text-gray-700'
                        : selectedAnswer === index || index === currentQ.correct
                        ? 'bg-white/30 text-white'
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Lightbulb size={24} />
              <span>{showHint ? 'Masquer l\'indice' : 'Afficher l\'indice'}</span>
            </button>
            <button
              onClick={handleValidate}
              disabled={selectedAnswer === null}
              className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold shadow-xl transition-all duration-300 ${
                selectedAnswer === null
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-2xl transform hover:scale-105'
              }`}
            >
              <span>Valider</span>
              <ChevronRight size={24} />
            </button>
          </div>

          {showHint && (
            <div className="mt-6 bg-amber-100 border-2 border-amber-400 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <Lightbulb className="text-amber-600 flex-shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-amber-900 mb-1">Indice :</h3>
                  <p className="text-amber-800">{currentQ.hint}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentPage === 'results') {
    const percentage = (score / 5) * 100;
    const grade = percentage >= 80 ? 'Excellent !' : percentage >= 60 ? 'Bien !' : percentage >= 40 ? 'Pas mal' : 'À améliorer';
    
    const strengths = score >= 4 ? [
      'Excellente concentration',
      'Très bonne mémoire',
      'Compréhension rapide'
    ] : score >= 3 ? [
      'Bonne logique',
      'Efforts constants',
      'Volonté d\'apprendre'
    ] : [
      'Curiosité évidente',
      'Persévérance',
      'Potentiel à développer'
    ];

    const improvements = score < 3 ? [
      'Revoir les bases du thème choisi',
      'Pratiquer régulièrement avec des quiz similaires',
      'Utiliser les indices pour mieux comprendre'
    ] : score < 5 ? [
      'Approfondir les sujets difficiles',
      'Réviser les réponses incorrectes',
      'Augmenter le temps de réflexion'
    ] : [
      'Explorer des niveaux plus difficiles',
      'Essayer d\'autres thèmes',
      'Partager vos connaissances'
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#22d3ee', '#fb923c', '#4ade80', '#f472b6'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative bg-white rounded-full p-8 shadow-2xl">
                <Trophy className="text-yellow-500" size={80} />
              </div>
            </div>
            <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Quiz terminé !
            </h1>
            <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl">
              <span className="text-5xl font-black text-gray-800">{score}/5</span>
              <div className="h-12 w-1 bg-gray-300"></div>
              <span className="text-2xl font-bold text-gray-600">{percentage}%</span>
            </div>
            <p className="text-3xl font-bold text-gray-700 mt-4">{grade}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl text-center transform hover:scale-105 transition-all">
              <div className="text-4xl font-black text-emerald-500 mb-2">{score}</div>
              <div className="text-gray-600 font-semibold">Réponses correctes</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl text-center transform hover:scale-105 transition-all">
              <div className="text-4xl font-black text-cyan-500 mb-2">{5 - score}</div>
              <div className="text-gray-600 font-semibold">À améliorer</div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl text-center transform hover:scale-105 transition-all">
              <div className="text-4xl font-black text-orange-500 mb-2">{percentage}%</div>
              <div className="text-gray-600 font-semibold">Réussite</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl p-8 shadow-2xl mb-6">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">✨</div>
              Vos points forts
            </h2>
            <div className="space-y-3">
              {strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <CheckCircle className="text-white flex-shrink-0" size={24} />
                  <span className="text-white text-lg font-semibold">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl p-8 shadow-2xl mb-8">
            <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl">🎯</div>
              Conseils d'amélioration
            </h2>
            <div className="space-y-3">
              {improvements.map((improvement, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <Lightbulb className="text-white flex-shrink-0 mt-0.5" size={24} />
                  <span className="text-white text-lg font-semibold">{improvement}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={restart}
              className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <RotateCcw size={28} />
              <span>Recommencer</span>
            </button>
            <button
              onClick={restart}
              className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <Trophy size={28} />
              <span>Nouveau thème</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
