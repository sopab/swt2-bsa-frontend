import {DsbKampfrichterDTO} from '../types/datatransfer/dsb-kampfrichter-dto.class';
import {VersionedDataTransferObject} from '../../shared/data-provider';

// export function toDO(dsbKampfrichterDTO: DsbKampfrichterDTO): DsbKampfrichterDO {
//
// }
//
// export function toDTO(dsbKampfrichterDO: DsbKampfrichterDO): DsbKampfrichterDTO {
//
// }

export function fromPayload(payload: VersionedDataTransferObject): DsbKampfrichterDTO {
  return DsbKampfrichterDTO.copyFrom(payload);
}

export function fromPayloadArray(payload: VersionedDataTransferObject[]): DsbKampfrichterDTO[] {
  const list: DsbKampfrichterDTO[] = [];
  payload.forEach(single => list.push(fromPayload(single)));
  return list;
}
