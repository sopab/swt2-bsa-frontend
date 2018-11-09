import {VersionedDataObject} from '../../shared/data-provider/models/versioned-data-object.interface';

export class DsbKampfrichterDO implements VersionedDataObject {
  id: number;
  version: number;

  vorname: string;
  nachname: string;
  userId: number;
}
