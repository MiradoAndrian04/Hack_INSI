const translationService = require('../services/translationService');

class TranslationController {
  // Traduire un texte simple
  async translateText(req, res) {
    try {
      const { text, targetLang = 'en' } = req.body;
      
      if (!text) {
        return res.status(400).json({ 
          error: 'Le paramètre "text" est requis' 
        });
      }
      
      console.log(`Traduction demandée: "${text.substring(0, 50)}..." → ${targetLang}`);
      
      const translated = await translationService.translate(text, targetLang);
      
      res.json({
        original: text,
        translated,
        targetLang,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erreur dans translateText:', error);
      res.status(500).json({ 
        error: 'Erreur lors de la traduction',
        details: error.message 
      });
    }
  }

  // Traduire plusieurs textes en une seule requête
  async translateBatch(req, res) {
    try {
      const { texts, targetLang = 'en' } = req.body;
      
      if (!texts || !Array.isArray(texts)) {
        return res.status(400).json({ 
          error: 'Le paramètre "texts" doit être un tableau' 
        });
      }
      
      console.log(`Traduction batch: ${texts.length} textes → ${targetLang}`);
      
      const translations = await Promise.all(
        texts.map(text => translationService.translate(text, targetLang))
      );
      
      res.json({
        originals: texts,
        translations,
        targetLang,
        count: texts.length,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erreur dans translateBatch:', error);
      res.status(500).json({ 
        error: 'Erreur lors de la traduction batch',
        details: error.message 
      });
    }
  }

  // Traduire un quiz complet (spécifique à votre app)
  async translateQuiz(req, res) {
    try {
      const { quiz, targetLang = 'en' } = req.body;
      
      if (!quiz) {
        return res.status(400).json({ 
          error: 'Le paramètre "quiz" est requis' 
        });
      }
      
      console.log(`Traduction quiz → ${targetLang}`);
      
      // Traduire chaque partie du quiz
      const translatedQuiz = {
        ...quiz,
        title: await translationService.translate(quiz.title || '', targetLang),
        description: await translationService.translate(quiz.description || '', targetLang),
        questions: await Promise.all(
          (quiz.questions || []).map(async (question) => ({
            ...question,
            text: await translationService.translate(question.text, targetLang),
            hint: await translationService.translate(question.hint || '', targetLang),
            options: await Promise.all(
              (question.options || []).map(opt => 
                translationService.translate(opt, targetLang)
              )
            ),
            explanation: question.explanation ? 
              await translationService.translate(question.explanation, targetLang) : 
              null
          }))
        )
      };
      
      res.json({
        originalLang: 'fr',
        targetLang,
        quiz: translatedQuiz,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Erreur dans translateQuiz:', error);
      res.status(500).json({ 
        error: 'Erreur lors de la traduction du quiz',
        details: error.message 
      });
    }
  }
}

module.exports = new TranslationController();