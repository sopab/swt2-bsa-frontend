import {DataTransferObject} from '../../../shared/data-provider';

export class DsbKampfrichterDTO implements DataTransferObject {
  id: number;
  vorname: string;
  nachname: string;
  userId: number;
  version: number;

  static copyFrom(optional: {
    id?: number,
    vorname?: string,
    nachname?: string,
    userId?: number,
    version?: number
  } = {}): DsbKampfrichterDTO {
    const copy = new DsbKampfrichterDTO();
    copy.id = optional.id || null;
    copy.vorname = optional.vorname || '';
    copy.nachname = optional.nachname || '';
    copy.userId = optional.userId || null;
    copy.version = optional.version || null;

    return copy;
  }
}
