import { Bot } from '@maxhub/max-bot-api';
import 'dotenv/config';
import { canAccessProgram } from './application/canAccessProgram.js';
import { getAccessiblePrograms } from './application/getAccessiblePrograms.js';
import { getMaxUserId } from './application/getMaxUserId.js';
import { getUserAccess } from './application/getUserAccess.js';
import { buildProgramsKeyboard } from './infrastructure/max/buildProgramKeyboard.js';
import { renderEnrollments } from './infrastructure/max/renderEnrollments.js';
import { enrollments } from './infrastructure/repositories/inMemoryEnrollments.js';
import { programs } from './infrastructure/repositories/inMemoryPrograms.js';
import { buildProgramKeyboard } from './presentation/programKeyboard.js';

const token = process.env.BOT_TOKEN;

if (!token) {
  throw new Error(
    'Не найден BOT_TOKEN. Проверьте файл .env в корневой папке проекта.',
  );
}

const bot = new Bot(token);

bot.command('start', (ctx) => {
  return ctx.reply(
    '🎓 Секции и кружки\n\nВыберите нужную секцию:',
    {
      attachments: [
        {
          type: 'inline_keyboard',
          payload: {
            buttons: buildProgramsKeyboard(programs),
          },
        },
      ],
    },
  );
});

bot.command('кружки', (ctx) => {
  return ctx.reply(
    '🎓 Секции и кружки\n\nВыберите нужную секцию:',
    {
      attachments: [
        {
          type: 'inline_keyboard',
          payload: {
            buttons: buildProgramsKeyboard(programs),
          },
        },
      ],
    },
  );
});

bot.command('меню', async (ctx) => {
  const access = getUserAccess(getMaxUserId(ctx));

  if (!access) {
    await ctx.reply('У вас нет доступа к этому боту.');
    return;
  }

  const accessiblePrograms = getAccessiblePrograms(access);

  if (accessiblePrograms.length === 0) {
    await ctx.reply('Для вас пока не настроены доступные секции.');
    return;
  }

  await ctx.reply('Выберите секцию:', {
    attachments: [
      {
        type: 'inline_keyboard',
        payload: buildProgramKeyboard(accessiblePrograms),
      },
    ],
  });
});

bot.action(/^program:(.+)$/, async (ctx) => {
  const access = getUserAccess(ctx.user?.user_id);

if (!access) {
  await ctx.answerOnCallback({
    message: {
      text: 'У вас нет доступа к этому разделу.',
    },
  });

  return;
}

  const programId = ctx.match?.[1];

  if (!programId) {
    await ctx.reply('Не удалось определить выбранную секцию.');
    return;
  }
  if (!canAccessProgram(access, programId)) {
    await ctx.answerOnCallback({
      message: {
        text: 'У вас нет доступа к этой секции.',
      },
    });
  
    return;
  }
  const program = programs.find(
    (item) => item.id === programId,
  );

  if (!program) {
    await ctx.reply('Такая секция не найдена.');
    return;
  }

  const programEnrollments = enrollments.filter(
    (enrollment) => enrollment.programId === programId,
  );

  await ctx.answerOnCallback({
    message: {
      text: 'Список секции открыт',
    },
  });
  
  await ctx.reply(
    renderEnrollments(program.title, programEnrollments),
  );
});

bot.command('мойid', async (ctx) => {
  const userId = getMaxUserId(ctx);

  if (userId === undefined) {
    await ctx.reply('Не удалось определить ваш MAX User ID.');
    return;
  }

  await ctx.reply(
    [
      'Ваш MAX User ID:',
      String(userId),
      '',
      'Передайте этот ID администратору для настройки доступа.',
    ].join('\n'),
  );
});

bot.start();

console.log('Бот запущен и ожидает команды /start');