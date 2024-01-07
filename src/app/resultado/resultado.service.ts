import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';
import {ResultadoDiarioDTO} from "../dto/ResultadoDiarioDTO";

@Injectable({
  providedIn: 'root',
})
export class ResultadoService {
  private apiUrl = 'https://chano-lovers-app.rj.r.appspot.com/resultados';
  private resultadosSubject = new Subject<ResultadoDiarioDTO[]>();

  constructor(private http: HttpClient) {}

  getListaResultados(page:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listar/page/${page}`);
  }

  agregarResultado(resultado: ResultadoDiarioDTO): Observable<ResultadoDiarioDTO> {
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
