import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  hojas: any[] = [];

  constructor(private api: LoginService) {}

  ngOnInit() {
    this.cargarHojas();
  }

  cargarHojas() {
    this.api.obtenerHojas().subscribe({
      next: (res) => {
        if (res.success) {
          this.hojas = res.data;
          console.log('✅ Hojas obtenidas:', this.hojas);
        } else {
          console.error('⚠️ Error en la respuesta:', res);
        }
      },
      error: (err) => console.error('❌ Error al obtener hojas:', err)
    });
  }

  
}
