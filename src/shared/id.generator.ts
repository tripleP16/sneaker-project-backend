import { uuid } from 'uuidv4';

//Clase que genera los uuid necesarios para las entidades
export default class UuidGenerator {
  public static generateUuid(): string {
    return uuid();
  }
}
