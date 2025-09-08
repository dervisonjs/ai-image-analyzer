import * as cocoSsd from '@tensorflow-models/coco-ssd';

let detectorModel;

export async function loadObjectDetectorModel() {
    if (!detectorModel) {
        console.log('Cargando COCO-SSD...');
        detectorModel = await cocoSsd.load();
        console.log('COCO-SSD cargado.');
    }
    return detectorModel;
}

export async function detectObjects(imageElement) {
    const model = await loadObjectDetectorModel();
    const predictions = await model.detect(imageElement);
    return predictions;
}