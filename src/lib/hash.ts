import bcrypt from 'bcryptjs';

//passwords must be stored as one-way hashes (never plain text) so a breached DB doesn’t reveal password
// creates a secure hash of the plain password before saving.
export async function hashPassword(password: string) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}
