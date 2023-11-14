import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {ResultadoDiarioDTO} from "../dto/ResultadoDiarioDTO";

@Injectable({
  providedIn: 'root',
})
export class ResultadoService {
  private apiUrl = 'http://localhost:8080/resultados'; // TODO: ver al subir a host
  constructor(private http: HttpClient) {}

  obtenerListaResultados(): Observable<ResultadoDiarioDTO[]> {
    return this.http.get<ResultadoDiarioDTO[]>(`${this.apiUrl}/listar`);
  }

  agregarResultado(resultado: any): Observable<ResultadoDiarioDTO> {
    return this.http.post<any>(`${this.apiUrl}/agregar`, resultado);
  }
}
