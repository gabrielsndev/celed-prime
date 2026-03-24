import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'cp-register-form',
  imports: [
    ReactiveFormsModule,
  ],

  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {

  private fb = inject(FormBuilder)

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]]
  });

  submitForm(): void {
    if (this.registerForm.valid) {
      console.log('Formulário de registro válido:', this.registerForm.value);
    } else {
      console.log('Formulário de registro inválido');
    }
  }

  limparTelefone() {

    const controle = this.registerForm.get('phone');
    const valorAtual = controle?.value ?? '';

    if (controle) {
      const apenasNumeros = valorAtual.replace(/\D/g, '');
      controle.setValue(apenasNumeros, { emitEvent: false });
    }
  }

  @Output() aoVoltar = new EventEmitter<void>();
      
  voltarPortal() {
    this.aoVoltar.emit();
  }

}
