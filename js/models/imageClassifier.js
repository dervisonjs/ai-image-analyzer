import * as mobilenet from '@tensorflow-models/mobilenet';

let classifierModel;

export async function loadClassifierModel() {
    if (!classifierModel) {
        console.log('Cargando MobileNet...');
        classifierModel = await mobilenet.load();
        console.log('MobileNet cargado.');
    }
    return classifierModel;
}

export async function classifyImage(imageElement) {
    const model = await loadClassifierModel();
    const predictions = await model.classify(imageElement);
    return predictions;
}