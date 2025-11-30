
import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio';
import { EquiposComponent } from './components/equipos/equipos.component';
import { JugadoresComponent } from './components/jugadores/jugadores.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { AgregarEquipoComponent } from './components/agregar-equipo/agregar-equipo';
import { AgregarJugadorComponent } from './components/agregar-jugador/agregar-jugador';
import { AgregarPartidoComponent } from './components/agregar-partido/agregar-partido';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'equipos', component: EquiposComponent },
  { path: 'jugadores', component: JugadoresComponent },
  { path: 'partidos', component: PartidosComponent },
  { path: 'agregar-equipo', component: AgregarEquipoComponent },
  { path: 'agregar-jugador', component: AgregarJugadorComponent },
  { path: 'agregar-partido', component: AgregarPartidoComponent },
  { path: '**', redirectTo: '' } 
];
