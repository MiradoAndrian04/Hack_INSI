const axios = require('axios');

const API_URL = 'http://localhost:5000/api/translate';

async function testTranslations() {
  console.log('🚀 Début des tests de traduction...\n');

  try {
    // Test 1: Santé du serveur
    console.log('1. Test santé du serveur:');
    const healthResponse = await axios.get('http://localhost:5000/health');
    console.log(`✅ ${healthResponse.data.message}\n`);

    // Test 2: Traduction Français → Anglais
    console.log('2. Test traduction FR → EN:');
    const translation1 = await axios.post(`${API_URL}/text`, {
      text: "Bonjour le monde, comment allez-vous aujourd'hui ?",
      targetLang: 'en'
    });
    console.log(`   Original: ${translation1.data.original}`);
    console.log(`   Traduit : ${translation1.data.translated}\n`);

    // Test 3: Traduction Français → Malgache
    console.log('3. Test traduction FR → MLG:');
    const translation2 = await axios.post(`${API_URL}/text`, {
      text: "Bonjour, je m'appelle Jean",
      targetLang: 'mlg'
    });
    console.log(`   Original: ${translation2.data.original}`);
    console.log(`   Traduit : ${translation2.data.translated}\n`);

    // Test 4: Traduction multiple
    console.log('4. Test traduction multiple:');
    const batchTranslation = await axios.post(`${API_URL}/batch`, {
      texts: [
        "Bonjour",
        "Merci beaucoup",
        "Au revoir"
      ],
      targetLang: 'en'
    });
    
    console.log('   Textes originaux:');
    batchTranslation.data.originals.forEach((text, i) => {
      console.log(`   - ${text} → ${batchTranslation.data.translations[i]}`);
    });
    console.log('');

    // Test 5: Traduction quiz
    console.log('5. Test traduction quiz complet:');
    const quizData = {
      title: "Quiz de Géographie",
      description: "Testez vos connaissances en géographie",
      questions: [
        {
          text: "Quelle est la capitale de la France ?",
          options: ["Paris", "Londres", "Berlin", "Madrid"],
          hint: "C'est la ville lumière",
          correct: 0
        }
      ]
    };

    const quizTranslation = await axios.post(`${API_URL}/quiz`, {
      quiz: quizData,
      targetLang: 'en'
    });

    console.log(`   Titre: ${quizTranslation.data.quiz.title}`);
    console.log(`   Question: ${quizTranslation.data.quiz.questions[0].text}`);
    console.log(`   Options: ${quizTranslation.data.quiz.questions[0].options.join(', ')}\n`);

    console.log('✅ Tous les tests ont réussi !');

  } catch (error) {
    console.error('❌ Erreur lors des tests:', error.message);
    if (error.response) {
      console.error('Détails:', error.response.data);
    }
  }
}

// Lancer les tests
testTranslations();