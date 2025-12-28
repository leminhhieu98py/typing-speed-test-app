import { EDuration } from '@/types/common';

const quotes_15s = [
  'The only way to do great work is to love what you do. - Steve Jobs',
  'Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer',
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
];

const quotes_30s = [
  'In the middle of every difficulty lies opportunity. - Albert Einstein',
  'The best way to predict the future is to create it. - Peter Drucker',
  'It does not matter how slowly you go as long as you do not stop. - Confucius',
  'Your time is limited, so don’t waste it living someone else’s life. - Steve Jobs',
  'The harder you work for something, the greater you’ll feel when you achieve it. - Unknown',
];

const quotes_60s = [
  'Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau',
  'Don’t be afraid to give up the good to go for the great. - John D. Rockefeller',
  'I find that the harder I work, the more luck I seem to have. - Thomas Jefferson',
  'Opportunities don’t happen. You create them. - Chris Grosser',
  'Dream big and dare to fail. - Norman Vaughan',
];

const quotes_120s = [
  'The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt',
  'Do what you can with all you have, wherever you are. - Theodore Roosevelt',
  'You are never too old to set another goal or to dream a new dream. - C.S. Lewis',
  'To succeed in life, you need two things: ignorance and confidence. - Mark Twain',
  'The way to get started is to quit talking and begin doing. - Walt Disney',
];

export const QUOTES: Record<EDuration, string[]> = {
  [EDuration['15_SECONDS']]: quotes_15s,
  [EDuration['30_SECONDS']]: quotes_30s,
  [EDuration['60_SECONDS']]: quotes_60s,
  [EDuration['120_SECONDS']]: quotes_120s,
};
