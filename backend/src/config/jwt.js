export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'fallback-secret-key',
  expiresIn: '7d',
};
