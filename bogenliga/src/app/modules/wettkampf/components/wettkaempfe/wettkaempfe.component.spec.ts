import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WettkaempfeComponent} from './wettkaempfe.component';
import {RouterTestingModule} from '@angular/router/testing';
import {ROUTES} from '../../../../app.routing';
import {HomeModule} from '../../../home/home.module';
import {TranslateModule} from '@ngx-translate/core';
import {StoreModule} from '@ngrx/store';
import {APP_REDUCERS} from '../../../shared/redux-store';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../../../shared/shared.module';

describe('WettkaempfeComponent', () => {
  let component: WettkaempfeComponent;
  let fixture: ComponentFixture<WettkaempfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WettkaempfeComponent],
      imports:      [
        RouterTestingModule.withRoutes(ROUTES),
        HomeModule,
        TranslateModule.forRoot(),
        StoreModule.forRoot(APP_REDUCERS),
        HttpClientModule,
        SharedModule
      ]
    })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WettkaempfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
