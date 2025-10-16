import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService  {

  private apiUrl = 'https://script.google.com/macros/s/AKfycbxLBzFfID-zrM7QOSNSceFAHgR7UvbjNUjldReb5otJybBg_sWaGKKCK4NQ11D2PHZATQ/exec';

 login(usuario: string, contrasena: string): Promise<any> {
    return fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, contrasena })
    })
    .then(res => res.json());
  }
}
