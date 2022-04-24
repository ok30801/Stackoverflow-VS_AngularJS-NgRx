import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { ResultPageComponent } from './pages/result-page/result-page.component';
import { FormComponent } from './components/form/form.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialExampleModule } from '../material.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { RecoveryPasswordPageComponent } from './pages/recovery-password-page/recovery-password-page.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HeaderComponent,
    HomePageComponent,
    AuthPageComponent,
    SearchPageComponent,
    ResultPageComponent,
    RegistrationPageComponent,
    RecoveryPasswordPageComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatFormFieldModule, // добавил
    MatInputModule, // добавил
    ReactiveFormsModule,
    MaterialExampleModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
