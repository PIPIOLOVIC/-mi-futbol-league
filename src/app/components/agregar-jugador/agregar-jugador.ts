import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { JugadorService, Jugador } from '../../services/jugador.service';
import { EquipoService, Equipo } from '../../services/equipo.service';

@Component({
  selector: 'app-agregar-jugador',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agregar-jugador.html',
  styleUrls: ['./agregar-jugador.css']
})
export class AgregarJugadorComponent implements OnInit {
  jugador: Jugador = {
    nombre: '',
    apellido: '',
    posicion: '',
    edad: 18,
    numero_camiseta: 0,
    equipo_id: 0
  };
  equipos: Equipo[] = [];

  constructor(
    private jugadorService: JugadorService,
    private equipoService: EquipoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.equipoService.getEquipos().subscribe(
      (data) => this.equipos = data,
      (error) => console.error('Error al cargar equipos:', error)
    );
  }

  onSubmit(): void {
    this.jugadorService.createJugador(this.jugador).subscribe(
      (response) => {
        console.log('Jugador creado:', response);
        this.router.navigate(['/jugadores']);
      },
      (error) => {
        console.error('Error al crear jugador:', error);
      }
    );
  }
}
