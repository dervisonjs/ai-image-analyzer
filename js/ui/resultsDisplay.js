export function displayResults(image, classificationResults, detectionResults) {
    const imagePreview = document.getElementById('image-preview');
    const classificationList = document.getElementById('classification-list');
    const detectionList = document.getElementById('detection-list');
    const canvas = document.getElementById('object-detection-canvas');

    // Muestra la imagen y el canvas
    imagePreview.src = image.src;
    imagePreview.style.display = 'block';
    canvas.width = image.width;
    canvas.height = image.height;
    
    // Muestra resultados de clasificación
    classificationList.innerHTML = '';
    classificationResults.forEach(result => {
        const li = document.createElement('li');
        li.textContent = `${result.className}: ${(result.probability * 100).toFixed(2)}%`;
        classificationList.appendChild(li);
    });

    // Muestra resultados de detección de objetos en el canvas
    detectionList.innerHTML = '';
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    ctx.font = '16px Arial';
    ctx.lineWidth = 2;

    detectionResults.forEach(prediction => {
        const [x, y, width, height] = prediction.bbox;
        ctx.strokeStyle = '#00FFFF';
        ctx.fillStyle = '#00FFFF';
        ctx.strokeRect(x, y, width, height);
        ctx.fillText(`${prediction.class}: ${(prediction.score * 100).toFixed(2)}%`, x, y > 10 ? y - 5 : 10);
        
        const li = document.createElement('li');
        li.textContent = `${prediction.class}: ${(prediction.score * 100).toFixed(2)}%`;
        detectionList.appendChild(li);
    });
}

export function clearResults() {
    const imagePreview = document.getElementById('image-preview');
    const classificationList = document.getElementById('classification-list');
    const detectionList = document.getElementById('detection-list');
    const canvas = document.getElementById('object-detection-canvas');

    imagePreview.src = '#';
    imagePreview.style.display = 'none';
    classificationList.innerHTML = '';
    detectionList.innerHTML = '';
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}