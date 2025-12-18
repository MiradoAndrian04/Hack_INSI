const { HfInference } = require('@huggingface/hub');

class TranslationService {
  constructor() {
    this.hf = new HfInference(process.env.HUGGINGFACE_TOKEN);
  }

  async translate(text, targetLang) {
    if (!text || targetLang === 'fr') return text;
    
    try {
      let model;
      switch(targetLang) {
        case 'mlg':
          model = 'Helsinki-NLP/opus-mt-fr-mg';
          break;
        case 'en':
          model = 'Helsinki-NLP/opus-mt-fr-en';
          break;
        default:
          return text;
      }
      
      const result = await this.hf.translation({
        model: model,
        inputs: text,
      });
      
      return result.translation_text;
    } catch (error) {
      console.error(`Erreur traduction ${targetLang}:`, error.message);
      return text;
    }
  }
}

module.exports = new TranslationService();