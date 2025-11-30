import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipoService, Equipo } from '../../services/equipo.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './equipos.html',
  styleUrls: ['./equipos.css']
})
export class EquiposComponent implements OnInit {
  equipos: Equipo[] = [];

  constructor(private equipoService: EquipoService) { }

  ngOnInit(): void {
    this.obtenerEquipos();
  }

  obtenerEquipos(): void {
    this.equipoService.getEquipos().subscribe(
      (data) => {
        this.equipos = data;
      },
      (error) => {
        console.error('Error al obtener equipos:', error);
      }
    );
  }
}
