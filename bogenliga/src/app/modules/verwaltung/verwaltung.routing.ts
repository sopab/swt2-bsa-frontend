import {Routes} from '@angular/router';

import {DsbMitgliedDetailGuard, DsbMitgliedOverviewGuard,DsbKampfrichterOverviewGuard,DsbKampfrichterDetailGuard, VerwaltungGuard} from './guards';
import {DsbMitgliedDetailComponent, DsbMitgliedOverviewComponent,DsbKampfrichterOverviewComponent,DsbKampfrichterDetailComponent, VerwaltungComponent} from './components';


export const VERWALTUNG_ROUTES: Routes = [
  {path: '', component: VerwaltungComponent, canActivate: [VerwaltungGuard]},
  {
    path:        'dsbmitglieder',
    component:   DsbMitgliedOverviewComponent,
    pathMatch:   'full',
    canActivate: [DsbMitgliedOverviewGuard]
  },
  {path: 'dsbmitglieder/:id', component: DsbMitgliedDetailComponent, canActivate: [DsbMitgliedDetailGuard]},
  {
    path:        'dsbkampfrichter',
    component:   DsbKampfrichterOverviewComponent,
    pathMatch:   'full',
    canActivate: [DsbKampfrichterOverviewGuard]
  },
  {path: 'dsbkampfrichter/:id', component: DsbKampfrichterDetailComponent, canActivate: [DsbKampfrichterDetailGuard]}
];
