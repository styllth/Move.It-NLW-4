import { User } from "../auth/userInterface";

export const serializeUser = (user: User) => {
  return btoa(JSON.stringify(user));
};

export const deserializeUser = (user?: string) => {
  if (!user) return null;

  try {
    return (JSON.parse(
      Buffer.from(user, "base64").toString("ascii")
    ) as unknown) as User;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const sendErrorResponse = (statusCode: number, message: string) => {
  return { statusCode: statusCode, message: message };
};
