import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';
import {ResultadoDiarioDTO} from "../dto/ResultadoDiarioDTO";

@Injectable({
  providedIn: 'root',
})
export class ResultadoService {
  private apiUrl = 'http://localhost:8080/resultados'; // TODO: ver al subir a host
  private resultadosSubject = new Subject<ResultadoDiarioDTO[]>();

  constructor(private http: HttpClient) {}

  getListaResultados(page:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listar/page/${page}`);
  }

  agregarResultado(resultado: any): Observable<ResultadoDiarioDTO> {
    return this.http.post<any>(`${this.apiUrl}/agregar`, resultado)
      .pipe(
        // Después de agregar, notifica a los suscriptores que los resultados han sido actualizados.
        tap(() => this.resultadosSubject.next([]))
      );
  }
  getResultadosActualizadosObservable(): Observable<ResultadoDiarioDTO[]> {
    return this.resultadosSubject.asObservable();
  }
}
