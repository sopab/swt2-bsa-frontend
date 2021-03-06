import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {SidebarItemComponent} from './components/sidebar/components/sidebar-item/sidebar-item.component';
import {NotificationComponent} from './components/notification';
// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {APP_REDUCERS} from './modules/shared/redux-store';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routing';
import {FormsModule} from '@angular/forms';
import {HomeModule} from './modules/home';
import {ErrorInterceptor, JwtInterceptor, SharedModule} from './modules/shared';
import {UserDropdownComponent} from './components/navbar/components/user-dropdown/user-dropdown.component';
import {SidebarSubitemComponent} from './components/sidebar/components/sidebar-subitem/sidebar-subitem.component';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    SidebarItemComponent,
    NavbarComponent,
    NotificationComponent,
    UserDropdownComponent,
    SidebarSubitemComponent,
  ],
  imports:      [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
        provide:    TranslateLoader,
        useFactory: createTranslateLoader,
        deps:       [HttpClient]
      }
    }),
    RouterModule.forRoot(ROUTES, {useHash: true, onSameUrlNavigation: 'reload'}),
    /* REDUX-STORE */
    StoreModule.forRoot(APP_REDUCERS),
    EffectsModule.forRoot([]),
    /* BOGENLIGA */
    HomeModule,
    SharedModule.forRoot(),
  ],
  exports:      [TranslateModule],
  /* HTTP INTERCEPTORS */
  providers:    [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}

  ],
  bootstrap:    [AppComponent]
})
export class AppModule {
}


