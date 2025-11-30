import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PartidoService, Partido } from '../../services/partido.service';
import { EquipoService, Equipo } from '../../services/equipo.service';

@Component({
  selector: 'app-agregar-partido',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agregar-partido.html',
  styleUrls: ['./agregar-partido.css']
})
export class AgregarPartidoComponent implements OnInit {
  partido: Partido = {
    fecha: '',
    hora: '',
    equipo_local_id: 0,
    equipo_visitante_id: 0,
    goles_local: 0,
    goles_visitante: 0,
    estado: 'programado'
  };
  equipos: Equipo[] = [];

  constructor(
    private partidoService: PartidoService,
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
    this.partidoService.createPartido(this.partido).subscribe(
      (response) => {
        console.log('Partido creado:', response);
        this.router.navigate(['/partidos']);
      },
      (error) => {
        console.error('Error al crear partido:', error);
      }
    );
  }
}
