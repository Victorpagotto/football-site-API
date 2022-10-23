import * as bcrypt from 'bcryptjs';

export default class bcryptEncrypter {
  // public static encode(password: string, cycles?: number): string {
  //   return bcrypt.hashSync(password, cycles || 10);
  // }
  public static read(codedPassword: string, password: string): boolean {
    return bcrypt.compareSync(password, codedPassword);
  }
}
