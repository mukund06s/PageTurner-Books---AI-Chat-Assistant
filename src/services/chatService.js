// ============================================
// PageTurner Books - Chat Service
// ============================================
// Handles: Webhook calls to n8n, timeout,
// abort controller, context passing, fallback
// to mock responses when n8n unavailable
// Restored from original chat.js
// ============================================

import { getMockResponse } from './mockResponseEngine';

// n8n Webhook URL - Update this to your n8n instance
const WEBHOOK_URL = 'http://localhost:5678/webhook-test/bookstore-chat';

// Timeout for webhook calls (30 seconds)
const TIMEOUT_MS = 30000;

// ==========================================
// MAIN: Send message to n8n webhook
// ==========================================
export async function sendToWebhook(message, sessionId, context) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const requestBody = {
    message: message,
    sessionId: sessionId,
    timestamp: new Date().toISOString(),
    context: {
      lastIntent: context.lastIntent,
      lastBookMentioned: context.lastBookMentioned,
      lastGenreViewed: context.lastGenreViewed,
      lastOrderChecked: context.lastOrderChecked,
      questionsAsked: context.questionsAsked,
      topicsDiscussed: (context.topicsDiscussed || []).slice(-5),
      preferences: context.preferences,
      conversationDuration: context.conversationDuration || 0
    }
  };

  console.log('📤 Sending request with context:', requestBody);

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log('📥 Received response:', data);

    // Normalize response format — handle reply/message/response keys
    return {
      message: data.message || data.reply || data.response || '',
      intent: data.intent || 'unknown',
      data: data.data || null,
      bookMentioned: data.bookMentioned || null
    };
  } catch (err) {
    clearTimeout(timeout);
    console.warn('Webhook call failed:', err.message);

    // Fallback to local mock response when n8n not available
    if (
      err.name === 'TypeError' ||
      err.name === 'AbortError' ||
      err.message.includes('Failed to fetch') ||
      err.message.includes('NetworkError')
    ) {
      console.log('🔄 Using local mock response (n8n not available)');
      return getMockResponse(message, context);
    }

    throw err;
  }
}

// ==========================================
// TYPING SIMULATION DELAY
// ==========================================
export function getTypingDelay(responseLength) {
  const baseDelay = 500;
  const charDelay = Math.min(responseLength * 5, 2500);
  const randomness = Math.random() * 400 - 200;
  const totalDelay = Math.max(600, baseDelay + charDelay + randomness);
  console.log(`⏱️ Simulating typing for ${Math.round(totalDelay)}ms (${responseLength} chars)`);
  return totalDelay;
}

// ==========================================
// ANALYTICS LOGGING
// ==========================================
export function logAnalytics(sessionId, userMessage, botResponse, intent, context) {
  try {
    const logs = JSON.parse(localStorage.getItem('chatLogs') || '[]');

    logs.push({
      sessionId,
      userMessage,
      botResponse: botResponse.substring(0, 500),
      intent: intent || 'unknown',
      timestamp: new Date().toISOString(),
      messageNumber: context.questionsAsked || 0,
      context: {
        lastIntent: context.lastIntent,
        favoriteGenre: context.preferences?.favoriteGenre
      }
    });

    // Keep last 1000 logs
    while (logs.length > 1000) {
      logs.shift();
    }

    localStorage.setItem('chatLogs', JSON.stringify(logs));
    console.log('📊 Analytics logged:', intent);
  } catch (e) {
    console.error('Analytics logging failed:', e);
  }
}

export default sendToWebhook;