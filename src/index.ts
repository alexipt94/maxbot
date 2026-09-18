import { Bot } from '@maxhub/max-bot-api';
import 'dotenv/config';

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error(
    'Не найден BOT_TOKEN. Проверьте файл .env в корневой папке проекта.',
  );
}

const bot = new Bot(token);

bot.command('start', (ctx) => {
  return ctx.reply(
    'Здравствуйте! Бот дополнительного образования запущен.',
  );
});

bot.start();

console.log('Бот запущен и ожидает команду /start');