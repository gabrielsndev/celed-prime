import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'cp-login-form',
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {

  private fb = inject(FormBuilder)

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })



  @Output() aoVoltar = new EventEmitter<void>();
  voltarPortal() {
    this.aoVoltar.emit();
  }

}
