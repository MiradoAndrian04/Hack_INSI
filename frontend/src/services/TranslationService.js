import axios from 'axios';

class TranslationService {
  constructor() {
    // Clés d'API - À stocker dans .env en production
    this.apiKey = process.env.REACT_APP_DEEPL_API_KEY || 'YOUR_DEEPL_API_KEY';
    this.baseURL = 'https://api-free.deepl.com/v2';
    
    // Cache des traductions
    this.translationCache = new Map();
  }

  async translate(text, targetLang) {
    const cacheKey = `${text}_${targetLang}`;
    
    // Vérifier le cache
    if (this.translationCache.has(cacheKey)) {
      return this.translationCache.get(cacheKey);
    }

    try {
      const response = await axios.post(`${this.baseURL}/translate`, null, {
        params: {
          auth_key: this.apiKey,
          text: text,
          target_lang: targetLang.toUpperCase(),
        },
      });

      const translation = response.data.translations[0].text;
      
      // Mettre en cache
      this.translationCache.set(cacheKey, translation);
      
      return translation;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Retourner le texte original en cas d'erreur
    }
  }

  async translateMultiple(texts, targetLang) {
    return Promise.all(
      texts.map(text => this.translate(text, targetLang))
    );
  }

  // Nettoyer le cache
  clearCache() {
    this.translationCache.clear();
  }
}

export default new TranslationService();