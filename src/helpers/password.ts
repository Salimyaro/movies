import crypto from "node:crypto";

export const getHashPassword = (password: string): string => {
  return crypto
    .pbkdf2Sync(password, "some-password-salt", 1000, 64, "sha512")
    .toString("hex");
};

export function verifyPassword({
  candidatePassword,
  hash
}: {
  candidatePassword: string;
  hash: string;
}): boolean {
  const candidateHash = getHashPassword(candidatePassword);
  return candidateHash === hash;
}
