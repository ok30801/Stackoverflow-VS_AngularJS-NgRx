import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResultPageComponent } from './components/result-page/result-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MaterialExampleModule } from '../material.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { RecoveryPasswordPageComponent } from './components/recovery-password-page/recovery-password-page.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { DialogAuthorComponent } from './dialog/dialog-author/dialog-author.component';
import { DialogTagComponent } from './dialog/dialog-tag/dialog-tag.component';
import { ThemePageComponent } from './components/theme-page/theme-page.component';
import { metaReducers, reducers } from "./store";
import { LoaderComponent } from './components/loader/loader.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { NetworkInterceptor } from './shared/services/network.interceptor';

const maskConfig: Partial<IConfig> = {
  validation: false,
};


@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    SearchPageComponent,
    ResultPageComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    RegistrationPageComponent,
    RecoveryPasswordPageComponent,
    DialogAuthorComponent,
    DialogTagComponent,
    ThemePageComponent,
    LoaderComponent,
    NotFoundPageComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(maskConfig),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects])
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: NetworkInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
