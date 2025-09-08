import { loadClassifierModel } from '../models/imageClassifier.js';
import { loadObjectDetectorModel } from '../models/objectDetector.js';
import { loadSentimentModel } from '../models/sentimentAnalyzer.js';

export async function loadModels() {
    console.log('Iniciando carga de todos los modelos...');
    await Promise.all([
        loadClassifierModel(),
        loadObjectDetectorModel(),
        loadSentimentModel()
    ]);
    console.log('Todos los modelos cargados.');
}