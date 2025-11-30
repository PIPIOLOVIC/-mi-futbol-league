import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Jugador {
    id?: number;
    nombre: string;
    apellido: string;
    posicion: string;
    edad: number;
    numero_camiseta: number;
    equipo_id: number;
    equipo_nombre?: string;
}

@Injectable({
    providedIn: 'root'
})
export class JugadorService {
    private apiUrl = 'http://localhost:3000/api/jugadores';

    constructor(private http: HttpClient) { }

    getJugadores(): Observable<Jugador[]> {
        return this.http.get<Jugador[]>(this.apiUrl);
    }

    getJugador(id: number): Observable<Jugador> {
        return this.http.get<Jugador>(`${this.apiUrl}/${id}`);
    }

    createJugador(jugador: Jugador): Observable<any> {
        return this.http.post(this.apiUrl, jugador);
    }
}
