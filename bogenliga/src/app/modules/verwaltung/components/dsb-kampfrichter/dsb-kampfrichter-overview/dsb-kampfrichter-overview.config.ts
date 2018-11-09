import {OverviewDialogConfig} from '../../../../shared/components/dialogs';
import {TableColumnSortOrder} from '../../../../shared/components/tables/types/table-column-sort-order.enum';
import {TableActionType} from '../../../../shared/components/tables/types/table-action-type.enum';
import {TableColumnType} from '../../../../shared/components/tables/types/table-column-type.enum';

export const DSB_KAMPFRICHTER_OVERVIEW_CONFIG: OverviewDialogConfig = {
  moduleTranslationKey:    'MANAGEMENT',
  pageTitleTranslationKey: 'MANAGEMENT.DSBKAMPFRICHTER.TITLE',

  tableConfig: {
    columns: [
      {
        translationKey:   'MANAGEMENT.DSBKAMPFRICHTER.TABLE.HEADERS.BENUTZER_ID',
        propertyName:     'id',
        width:            7,
        type:             TableColumnType.NUMBER,
        currentSortOrder: TableColumnSortOrder.ASCENDING
      },
      {
        translationKey: 'MANAGEMENT.DSBKAMPFRICHTER.TABLE.HEADERS.WETTKAMPF_ID',
        propertyName:   'vorname',
        width:          20,
      },
      {
        translationKey: 'MANAGEMENT.DSBKAMPFRICHTER.TABLE.HEADERS.LEITEND',
        propertyName:   'nachname',
        width:          20,
      }
    ],
    actions: {
      actionTypes: [TableActionType.EDIT, TableActionType.DELETE],
      width:       6
    },
  }
};
