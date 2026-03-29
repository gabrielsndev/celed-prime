import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserRegistration } from '../../../core/models/user.model';


@Component({
  selector: 'cp-register-form',
  imports: [
    ReactiveFormsModule,
  ],

  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {

  private fb = inject(FormBuilder);
  private service = inject(AuthService);
  loading = false;

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,11}$/)]]
  });

  
  @Output() aoVoltar = new EventEmitter<void>();
  
  voltarPortal() {
    this.aoVoltar.emit();
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      const novoUsuario = this.registerForm.getRawValue() as UserRegistration;

      this.service.register(novoUsuario).subscribe({
        next: (res) => {
          console.log('Usuário Prime criado com sucesso!', res);
          alert('Conta criada! Agora é só fazer o login.');
          this.loading = false;
          this.voltarPortal(); 
        },
        error: (err) => {
          console.error('Erro no cadastro:', err);
          alert('Ocorreu um erro ao criar sua conta. Verifique os dados.');
          this.loading = false;
        }
      });
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

  getErrorMessage(fieldName: string): string {
    const control = this.registerForm.get(fieldName);

    if (control?.errors) {
      if (control.hasError('required')) return 'Este campo é obrigatório';
      if (control.hasError('email')) return 'E-mail inválido';
      if (control.hasError('minlength')) return `Mínimo de ${control.errors['minlength'].requiredLength} caracteres`;
      if (control.hasError('pattern')) return 'Formato inválido (apenas números)';
    }
  
    return '';
  }

}
