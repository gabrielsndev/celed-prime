import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cp-login-form',
  imports: [],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {

  @Output() aoVoltar = new EventEmitter<void>();
  
  voltarPortal() {
    this.aoVoltar.emit();
  }

}
