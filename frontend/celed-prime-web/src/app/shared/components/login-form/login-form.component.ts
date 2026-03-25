import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'cp-login-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {

  private fb = inject(FormBuilder)

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  getErrorMessage(fieldName: string): string {
    const control = this.registerForm.get(fieldName);

    if (control?.errors) {
      if (control.hasError('email')) return 'E-mail inválido';
      if (control.hasError('minlength')) return `Mínimo de ${control.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      console.log('Formulário de registro válido:', this.registerForm.value);
    } else {
      console.log('Formulário de registro inválido');
    }
  }


  @Output() aoVoltar = new EventEmitter<void>();
  voltarPortal() {
    this.aoVoltar.emit();
  }

}
