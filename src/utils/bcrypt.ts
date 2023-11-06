import { genSaltSync, hashSync, compareSync } from "bcryptjs";

export const hashPassword = (plaintext: string): string => {
  const round = 12;
  const salt = genSaltSync(round);
  return hashSync(plaintext, salt);
};

export const verifyPassword = (plaintext: string, hashVal: string): boolean =>
  compareSync(plaintext, hashVal);
