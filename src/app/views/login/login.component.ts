import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 IMPORTANTE
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
email = '';
  password = '';

  login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    // Aquí podrías agregar lógica de autenticación o redirección
  }
}
