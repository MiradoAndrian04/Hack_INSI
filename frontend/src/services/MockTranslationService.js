class MockTranslationService {
  constructor() {
    this.translationCache = new Map();
    this.delay = 1000; // 1 seconde de délai pour simuler l'API
  }

  // Traductions prédéfinies pour le test
  translations = {
    en: {
      "Apprendre n'a jamais été aussi amusant": "Learning has never been so fun",
      "Choisissez votre langue": "Choose your language",
      "Sélectionnez une langue...": "Select a language...",
      "Choisissez un thème": "Choose a theme",
      "Commencer l'aventure": "Start the adventure",
      "Sciences": "Science",
      "Histoire": "History",
      "Géographie": "Geography",
      "Art": "Art",
      "Question": "Question",
      "Score": "Score",
      "Facile": "Easy",
      "Moyen": "Medium",
      "Difficile": "Hard",
      "Afficher l'indice": "Show hint",
      "Masquer l'indice": "Hide hint",
      "Indice": "Hint",
      "Valider": "Validate",
      "Quiz terminé !": "Quiz completed!",
      "Réponses correctes": "Correct answers",
      "À améliorer": "To improve",
      "Réussite": "Success rate",
      "Vos points forts": "Your strengths",
      "Conseils d'amélioration": "Improvement tips",
      "Recommencer": "Restart",
      "Nouveau thème": "New theme",
    },
    mg: {
      "Apprendre n'a jamais été aussi amusant": "Ny fianarana tsy mbola nanao fialamboly toy izao",
      "Choisissez votre langue": "Safidio ny fiteninao",
      "Sélectionnez une langue...": "Safidio fiteny...",
      "Choisissez un thème": "Safidio lohahevitra",
      "Commencer l'aventure": "Atombohy ny adventure",
      "Sciences": "Siyansa",
      "Histoire": "Tantara",
      "Géographie": "Jeografia",
      "Art": "Kanto",
      "Question": "Fanontaniana",
      "Score": "Isan-javatra",
      "Facile": "Mora",
      "Moyen": "Antonony",
      "Difficile": "Sarotra",
      "Afficher l'indice": "Asehoy ny fanoroana",
      "Masquer l'indice": "Afeno ny fanoroana",
      "Indice": "Fanoroana",
      "Valider": "Hamarinina",
      "Quiz terminé !": "Quiz vita!",
      "Réponses correctes": "Valiny marina",
      "À améliorer": "Hatsaraina",
      "Réussite": "Fahombiazana",
      "Vos points forts": "Ny toetra tsara anao",
      "Conseils d'amélioration": "Torolalana fanatsarana",
      "Recommencer": "Avereno",
      "Nouveau thème": "Lohahevitra vaovao",
    }
  };

  async translate(text, targetLang) {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, this.delay));
    
    const cacheKey = `${text}_${targetLang}`;
    
    if (this.translationCache.has(cacheKey)) {
      return this.translationCache.get(cacheKey);
    }

    const langCode = targetLang.toLowerCase();
    
    // Retourner la traduction simulée ou le texte original
    const translation = this.translations[langCode]?.[text] || `${text} [${targetLang}]`;
    
    this.translationCache.set(cacheKey, translation);
    return translation;
  }

  async translateMultiple(texts, targetLang) {
    return Promise.all(texts.map(text => this.translate(text, targetLang)));
  }

  clearCache() {
    this.translationCache.clear();
  }
}

export default new MockTranslationService();