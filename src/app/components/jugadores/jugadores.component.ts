import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JugadorService, Jugador } from '../../services/jugador.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './jugadores.html',
  styleUrls: ['./jugadores.css']
})
export class JugadoresComponent implements OnInit {
  jugadores: Jugador[] = [];

  constructor(private jugadorService: JugadorService) { }

  ngOnInit(): void {
    this.obtenerJugadores();
  }

  obtenerJugadores(): void {
    this.jugadorService.getJugadores().subscribe(
      (data) => {
        this.jugadores = data;
      },
      (error) => {
        console.error('Error al obtener jugadores:', error);
      }
    );
  }
}
