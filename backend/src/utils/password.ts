import bcrypt from 'bcryptjs';

export const hashPassword = (password: string): string => {
    const hashed = bcrypt.hashSync(password, 10);
    console.log(hashed);
    return hashed;
}

export const comparePasswords = (password: string, hashedPassword: string): boolean => {
    return bcrypt.compareSync(password, hashPassword(hashedPassword));
}
