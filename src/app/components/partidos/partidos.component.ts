import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartidoService, Partido } from '../../services/partido.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-partidos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './partidos.html',
  styleUrls: ['./partidos.css']
})
export class PartidosComponent implements OnInit {
  partidos: Partido[] = [];

  constructor(private partidoService: PartidoService) { }

  ngOnInit(): void {
    this.obtenerPartidos();
  }

  obtenerPartidos(): void {
    this.partidoService.getPartidos().subscribe(
      (data) => {
        this.partidos = data;
      },
      (error) => {
        console.error('Error al obtener partidos:', error);
      }
    );
  }
}
