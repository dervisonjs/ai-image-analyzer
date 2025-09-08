import { setupImageUploader } from './ui/imageUploader.js';
import { displayResults, clearResults } from './ui/resultsDisplay.js';
import { setupCommentsSection } from './ui/commentsSection.js';
import { classifyImage } from './models/imageClassifier.js';
import { detectObjects } from './models/objectDetector.js';
import { loadModels } from './utils/modelManager.js';
import { addAnalysisToHistory, getAnalysisHistory, exportHistory, clearHistory } from './utils/storage.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Muestra un mensaje de carga inicial
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.classList.remove('hidden');

    try {
        await loadModels();
        console.log("Modelos de IA cargados correctamente.");
        loadingOverlay.classList.add('hidden');
    } catch (error) {
        console.error("Error al cargar los modelos de IA:", error);
        loadingOverlay.innerHTML = '<p style="color:red;">Error al cargar los modelos. Intenta recargar la página.</p>';
        return;
    }

    // Configurar la funcionalidad de arrastrar y soltar la imagen
    setupImageUploader(async (image) => {
        clearResults();
        loadingOverlay.classList.remove('hidden');
        document.getElementById('results-section').classList.remove('hidden');
        
        const [classificationResults, detectionResults] = await Promise.all([
            classifyImage(image),
            detectObjects(image)
        ]);
        
        displayResults(image, classificationResults, detectionResults);
        
        loadingOverlay.classList.add('hidden');
        document.getElementById('comments-section').classList.remove('hidden');

        // Guardar el análisis en el historial
        addAnalysisToHistory({
            imageSrc: image.src,
            classification: classificationResults,
            detection: detectionResults,
            date: new Date().toISOString()
        });
        
        renderHistory();
    });

    // Configurar la sección de comentarios
    setupCommentsSection();

    // Configurar los botones de exportar y borrar historial
    document.getElementById('export-btn').addEventListener('click', () => {
        exportHistory();
    });
    
    document.getElementById('clear-history-btn').addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres borrar todo el historial?')) {
            clearHistory();
            renderHistory();
        }
    });

    // Renderizar el historial de análisis al cargar la página
    function renderHistory() {
        const history = getAnalysisHistory();
        const historyList = document.getElementById('history-list');
        historyList.innerHTML = '';
        history.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <p>Análisis #${index + 1} (${new Date(item.date).toLocaleDateString()})</p>
                <small>Clasificación: ${item.classification[0].className} (${(item.classification[0].probability * 100).toFixed(2)}%)</small>
            `;
            historyList.appendChild(li);
        });
    }

    renderHistory();
});