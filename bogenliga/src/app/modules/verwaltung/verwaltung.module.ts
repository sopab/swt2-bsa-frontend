import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared';
import {FormsModule} from '@angular/forms';
import {VERWALTUNG_ROUTES} from './verwaltung.routing';
import {DsbMitgliedDetailGuard, DsbMitgliedOverviewGuard,DsbKampfrichterDetailGuard, DsbKampfrichterOverviewGuard, VerwaltungGuard} from './guards';
import {DsbMitgliedDetailComponent, DsbMitgliedOverviewComponent,DsbKampfrichterOverviewComponent, DsbKampfrichterDetailComponent, VerwaltungComponent} from './components';

@NgModule({
  imports:      [
    CommonModule,
    RouterModule.forChild(VERWALTUNG_ROUTES),
    SharedModule,
    FormsModule
  ],
  declarations: [VerwaltungComponent, DsbMitgliedOverviewComponent, DsbMitgliedDetailComponent,DsbKampfrichterOverviewComponent, DsbKampfrichterDetailComponent],
  providers:    [VerwaltungGuard, DsbMitgliedOverviewGuard, DsbMitgliedDetailGuard,DsbKampfrichterOverviewGuard, DsbKampfrichterDetailGuard]
})
export class VerwaltungModule {
}
