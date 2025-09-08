import * as use from '@tensorflow-models/universal-sentence-encoder';
import * as tf from '@tensorflow/tfjs';

let sentimentModel;
const sentimentPhrases = ['Estoy muy feliz', 'Estoy triste', 'Esto es neutral'];
const sentimentLabels = ['Positivo', 'Negativo', 'Neutral'];

export async function loadSentimentModel() {
    if (!sentimentModel) {
        console.log('Cargando Universal Sentence Encoder...');
        sentimentModel = await use.load();
        console.log('Universal Sentence Encoder cargado.');
    }
    return sentimentModel;
}

export async function analyzeSentiment(text) {
    const model = await loadSentimentModel();
    const embeddings = await model.embed([text, ...sentimentPhrases]);
    
    const textEmbedding = embeddings.slice([0, 0], [1, 512]);
    const phraseEmbeddings = embeddings.slice([1, 0], [3, 512]);

    const similarities = tf.matMul(phraseEmbeddings, textEmbedding, false, true);
    const scores = await similarities.data();
    
    const maxScoreIndex = scores.indexOf(Math.max(...scores));
    const sentiment = sentimentLabels[maxScoreIndex];
    
    return {
        sentiment: sentiment,
        scores: scores.map((score, index) => ({ label: sentimentLabels[index], score }))
    };
}