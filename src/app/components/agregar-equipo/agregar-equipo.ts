import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EquipoService, Equipo } from '../../services/equipo.service';

@Component({
  selector: 'app-agregar-equipo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agregar-equipo.html',
  styleUrls: ['./agregar-equipo.css']
})
export class AgregarEquipoComponent {
  equipo: Equipo = {
    nombre: '',
    ciudad: '',
    entrenador: '',
    fundacion: new Date().getFullYear()
  };

  constructor(private equipoService: EquipoService, private router: Router) { }

  onSubmit(): void {
    this.equipoService.createEquipo(this.equipo).subscribe(
      (response) => {
        console.log('Equipo creado:', response);
        this.router.navigate(['/equipos']);
      },
      (error) => {
        console.error('Error al crear equipo:', error);
      }
    );
  }
}
