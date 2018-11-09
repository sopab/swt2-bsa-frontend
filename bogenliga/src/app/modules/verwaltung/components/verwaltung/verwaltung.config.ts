import {NavigationDialogConfig} from '../../../shared/components/dialogs';

export const VERWALTUNG_CONFIG: NavigationDialogConfig = {
  moduleTranslationKey:    'MANAGEMENT',
  pageTitleTranslationKey: 'MANAGEMENT.VERWALTUNG.TITLE',
  navigationCardsConfig:   {
    navigationCards: [
      {
        labelKey:       'MANAGEMENT.VERWALTUNG.NAVIGATION.DSBMITGLIEDER.LABEL',
        descriptionKey: 'MANAGEMENT.VERWALTUNG.NAVIGATION.DSBMITGLIEDER.DESCRIPTION',
        icon:           'users',
        route:          'dsbmitglieder'

      },
      {
        labelKey:       'MANAGEMENT.VERWALTUNG.NAVIGATION.DSBKAMPFRICHTER.LABEL',
        descriptionKey: 'MANAGEMENT.VERWALTUNG.NAVIGATION.DSBKAMPFRICHTER.DESCRIPTION',
        icon:           'users',
        route:          'dsbkampfrichter'

      }
    ]
  }
};
