import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ResultadoService} from "./resultado.service";
import {ResultadoDiarioDTO} from "../dto/ResultadoDiarioDTO";

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resultado.component.html',
  styleUrl: './resultado.component.sass'
})
export class ResultadoComponent implements OnInit {
  resultadosDiarios: ResultadoDiarioDTO[] = [];
  private resultadosSubscription!: Subscription;
  inputFavor: string = '';
  inputContra: string = '';

  constructor(private resultadoService: ResultadoService) {
  }

  ngOnInit() {
    this.cargarResultados();
    this.resultadosDiarios.forEach((e: ResultadoDiarioDTO) => console.log("me encanta maldita falopa: " + e.fecha));
  }

  cargarResultados() {
    /*this.resultadosSubscription = this.resultadoService
      .obtenerListaResultados()
      .subscribe(
        (data) => {
          this.resultadosDiarios = data;
        },
        (error) => {
          console.error('Error al obtener resultados:', error);
        }
      );*/
    this.resultadoService
      .obtenerListaResultados()
      .subscribe(
        (data) => {
          this.resultadosDiarios = data;
        },
        (error) => {
          console.error('Error al obtener resultados:', error);
        }
      );
  }

  agregarResultado() {
    console.log('Agregar resultado');
    var nuevoResultado=new ResultadoDiarioDTO();
    nuevoResultado.partidosGanados=parseInt(this.inputFavor);
    nuevoResultado.partidosPerdidos=parseInt(this.inputContra);

    this.resultadoService.agregarResultado(nuevoResultado).subscribe(
      (response:any) => {
        console.log('Resultado agregado exitosamente');
      },
      (error) => {
        console.error('Error al agregar resultado:', error);
      }
    );
  }

  ngOnDestroy() {
    // Importante: Desuscribirse para evitar pérdida de memoria
    //this.resultadosSubscription.unsubscribe();
  }

  // Método que se ejecutará cuando se haga clic en el botón
  onClick() {
    console.log('inputFavor:', this.inputFavor);
    console.log('inputContra:', this.inputContra);
  }
}
