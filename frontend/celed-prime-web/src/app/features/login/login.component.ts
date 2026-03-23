import { Component } from '@angular/core';
import { LoginFormComponent } from '../../shared/components/login-form/login-form.component';
import { RegisterFormComponent } from '../../shared/components/register-form/register-form.component';

type AuthViewMode = 'portal' | 'login' | 'register';

@Component({
  selector: 'cp-login',
  imports: [
    LoginFormComponent,
    RegisterFormComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  viewMode: AuthViewMode = 'portal';

  setView(mode: AuthViewMode) {
    this.viewMode = mode;
  }

  goBack() {
    this.viewMode = 'portal';
  }

}
