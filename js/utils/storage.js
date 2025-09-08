const STORAGE_KEY = 'ai-image-analyzer-history';

export function addAnalysisToHistory(analysis) {
    const history = getAnalysisHistory();
    history.push(analysis);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function getAnalysisHistory() {
    const historyString = localStorage.getItem(STORAGE_KEY);
    return historyString ? JSON.parse(historyString) : [];
}

export function exportHistory() {
    const history = getAnalysisHistory();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "analisis_historial.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

export function clearHistory() {
    localStorage.removeItem(STORAGE_KEY);
}