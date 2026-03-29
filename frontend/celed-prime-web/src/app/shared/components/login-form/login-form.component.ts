import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'cp-login-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  loading = false;


  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  getErrorMessage(fieldName: string): string {
    const control = this.loginForm.get(fieldName);

    if (control?.errors) {
      if (control.hasError('required')) return 'Este campo é obrigatório';
      if (control.hasError('email')) return 'E-mail inválido';
      if (control.hasError('minlength')) return `Mínimo de ${control.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.loading= true;
      const dados = this.loginForm.getRawValue() as LoginRequest;

      this.authService.login(dados).subscribe({
        next: (response) => {
          localStorage.setItem('cp_token', response.token);
          console.log('Bem-vindo ao Celed Prime!', response);
          this.router.navigate(['/home']);
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro no login:', err);
          alert('E-mail ou senha incorretos. Tente novamente.');
          this.loading = false;
        }
      });
    }
  }


  @Output() aoVoltar = new EventEmitter<void>();
  voltarPortal() {
    this.aoVoltar.emit();
  }

}
