import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { RecoveryPasswordPageComponent } from './components/recovery-password-page/recovery-password-page.component';
import { ResultPageComponent } from './components/result-page/result-page.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { ThemePageComponent } from "./components/theme-page/theme-page.component";

const routes: Routes = [

  { path: '', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: 'auth', pathMatch: 'full' },
      { path: 'auth', component: AuthPageComponent, data: {depth: 1} },
      { path: 'recovery-password', component: RecoveryPasswordPageComponent, data: {depth: 2} },
      { path: 'registration', component: RegistrationPageComponent, data: {depth: 3} },
    ]
  },
  { path: '', component: MainLayoutComponent, children: [
      { path: 'search', component: SearchPageComponent, data: {depth: 1} },
      { path: 'result/query/:searchQuery', component: ResultPageComponent, data: {depth: 2} },
      { path: 'question/:id/:link', component: ThemePageComponent, data: {depth: 3} },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
 })
export class AppRoutingModule { }
