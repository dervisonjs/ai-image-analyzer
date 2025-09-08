import { analyzeSentiment } from '../models/sentimentAnalyzer.js';

export function setupCommentsSection() {
    const commentBox = document.getElementById('comment-box');
    const submitBtn = document.getElementById('submit-comment-btn');
    const commentList = document.getElementById('comment-list');

    submitBtn.addEventListener('click', async () => {
        const commentText = commentBox.value.trim();
        if (commentText === '') return;

        const analysis = await analyzeSentiment(commentText);
        
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        commentItem.innerHTML = `
            <p>${commentText}</p>
            <span class="sentiment sentiment-${analysis.sentiment.toLowerCase()}">Sentimiento: ${analysis.sentiment}</span>
        `;
        commentList.prepend(commentItem);
        
        commentBox.value = '';
    });
}