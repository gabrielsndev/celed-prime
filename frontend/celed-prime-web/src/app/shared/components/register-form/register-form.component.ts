import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cp-register-form',
  imports: [],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {

   @Output() aoVoltar = new EventEmitter<void>();
  
  voltarPortal() {
    this.aoVoltar.emit();
  }

}
