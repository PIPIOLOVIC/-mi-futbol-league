import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Partido {
    id?: number;
    fecha: string;
    hora: string;
    equipo_local_id: number;
    equipo_visitante_id: number;
    goles_local: number;
    goles_visitante: number;
    estado: string;
    equipo_local_nombre?: string;
    equipo_visitante_nombre?: string;
}

@Injectable({
    providedIn: 'root'
})
export class PartidoService {
    private apiUrl = 'http://localhost:3000/api/partidos';

    constructor(private http: HttpClient) { }

    getPartidos(): Observable<Partido[]> {
        return this.http.get<Partido[]>(this.apiUrl);
    }

    getPartido(id: number): Observable<Partido> {
        return this.http.get<Partido>(`${this.apiUrl}/${id}`);
    }

    createPartido(partido: Partido): Observable<any> {
        return this.http.post(this.apiUrl, partido);
    }
}
