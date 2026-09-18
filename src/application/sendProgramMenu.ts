import type { Context } from '@maxhub/max-bot-api';

import { buildProgramKeyboard } from '../presentation/programKeyboard.js';
import { getAccessiblePrograms } from './getAccessiblePrograms.js';
import { getMaxUserId } from './getMaxUserId.js';
import { getUserAccess } from './getUserAccess.js';

export async function sendProgramMenu(ctx: Context): Promise<void> {
  const access = getUserAccess(getMaxUserId(ctx));

  if (!access) {
    await ctx.reply(
      'У вас нет доступа к этому боту. Обратитесь к администратору.',
    );
    return;
  }

  const accessiblePrograms = getAccessiblePrograms(access);

  if (accessiblePrograms.length === 0) {
    await ctx.reply(
      'Доступных секций пока нет. Обратитесь к администратору.',
    );
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
}