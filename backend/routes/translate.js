const { Translate } = require('@google-cloud/translate').v2;
const express = require('express');
const router = express.Router();

// Configurez vos clés d'API
const translate = new Translate({
  key: process.env.GOOGLE_TRANSLATE_API_KEY,
  projectId: process.env.GOOGLE_PROJECT_ID
});

router.post('/translate', async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;
    
    // Si le texte est un tableau, traduisez chaque élément
    if (Array.isArray(text)) {
      const translations = await Promise.all(
        text.map(async (item) => {
          const [translation] = await translate.translate(item, targetLanguage);
          return translation;
        })
      );
      res.json({ translations });
    } else {
      // Traduction simple
      const [translation] = await translate.translate(text, targetLanguage);
      res.json({ translation });
    }
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

module.exports = router;