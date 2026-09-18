export function getMaxUserId(value: unknown): number | undefined {
  if (!value || typeof value !== 'object') {
    return undefined;
  }

  const source = value as {
    user_id?: unknown;
    user?: {
      user_id?: unknown;
    };
    sender?: {
      user_id?: unknown;
    };
    message?: {
      sender?: {
        user_id?: unknown;
      };
    };
  };

  const candidates = [
    source.user_id,
    source.user?.user_id,
    source.sender?.user_id,
    source.message?.sender?.user_id,
  ];

  const userId = candidates.find(
    (candidate): candidate is number =>
      typeof candidate === 'number',
  );

  return userId;
}