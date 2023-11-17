import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ResultadoService} from "./resultado.service";
import {ResultadoDiarioDTO} from "../dto/ResultadoDiarioDTO";
import Swal from 'sweetalert2';
import {NgZone} from '@angular/core';
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './resultado.component.html',
  styleUrl: './resultado.component.sass'
})
export class ResultadoComponent implements OnInit, OnDestroy {
  resultadosDiarios: ResultadoDiarioDTO[] = [];
  private resultadosSubscription!: Subscription;
  currentPage = 0; // Página inicial
  inputFavor: string = '';
  inputContra: string = '';

  constructor(private resultadoService: ResultadoService, private ngZone: NgZone, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.cargarResultados();
    this.resultadosSubscription = this.resultadoService.getResultadosActualizadosObservable().subscribe(() => {
      this.cargarResultados();
    });
  }

  cargarResultados() {
    this.resultadoService
      .getListaResultados(this.currentPage)
      .subscribe(
        (data) => {
          this.resultadosDiarios = data.content as ResultadoDiarioDTO[];
        },
        (error) => {
          console.error('Error al obtener resultados:', error);
        }
      );
  }

  agregarResultado() {
    var nuevoResultado = new ResultadoDiarioDTO();
    nuevoResultado.partidosGanados = parseInt(this.inputFavor);
    nuevoResultado.partidosPerdidos = parseInt(this.inputContra);

    // Validar que los campos no estén vacíos
    if (nuevoResultado.partidosGanados >= 0 && nuevoResultado.partidosPerdidos >= 0) {
      this.resultadoService.agregarResultado(nuevoResultado).subscribe(
        (response: any) => {
          console.log('Resultado agregado exitosamente');
        },
        (error) => {
          console.error('Error al agregar resultado:', error);
        }
      );
    } else {
      //       Mostrar SweetAlert con un mensaje de error
      this.mostrarAlertaError('Por favor, completa ambos campos.');
      return;
    }
  }

  cambiarPagina(pagina: number) {
    this.currentPage = pagina;
    this.cargarResultados();
  }

  ngOnDestroy() {
    // Importante: Desuscribirse para evitar pérdida de memoria
    this.resultadosSubscription.unsubscribe();
  }

  private mostrarAlertaError(mensaje: string) {
    // Utilizar SweetAlert para mostrar un mensaje de error
    this.ngZone.run(() => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: mensaje,
      });
    });
  }
}
