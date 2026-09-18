export type MainKeyboardButton = {
  type: 'message';
  text: string;
};

export function buildMainKeyboard(): MainKeyboardButton[][] {
  return [
    [
      {
        type: 'message',
        text: '🎓 Открыть кружки',
      },
    ],
  ];
}