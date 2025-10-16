import { CommonModule } from '@angular/common';
import { Component, importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  mensaje = '';

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    this.loginService.login(this.email, this.password)
      .then(res => {
        if (res.success) {
          // Opcional: mostrar mensaje de bienvenida
          this.mensaje = `Bienvenido ${res.data.nombre}`;

          // Redirigir a Home
          this.router.navigate(['/home']);
        } else {
          this.mensaje = res.error;
        }
      })
      .catch(err => {
        this.mensaje = 'Error al conectar con el servidor';
        console.error(err);
      });
  }
}
