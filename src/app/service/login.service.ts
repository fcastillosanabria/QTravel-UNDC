import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService  {

  private apiUrl = '/api';
private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  // 🧠 Método genérico para enviar una acción a tu backend
  private sendRequest(body: any): Observable<any> {
    return this.http.post(this.apiUrl, body, { headers: this.headers }).pipe(
      catchError((error) => {
        console.error('Error en la petición:', error);
        return throwError(() => error);
      })
    );
  }

  // 🟢 Métodos específicos
  obtenerHojas(): Observable<any> {
    return this.sendRequest({ action: 'obtenerHojas' });
  }

  verificarCodigo(gid: number, codigo: string): Observable<any> {
    return this.sendRequest({ action: 'verificarCodigo', gid, codigo });
  }

  guardarQR(gid: number, datos: any): Observable<any> {
    return this.sendRequest({ action: 'guardarQR', gid, datos });
  }

  login(usuario: string, contrasena: string): Observable<any> {
    return this.sendRequest({ action: 'login', usuario, contrasena });
  }
}
