import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditosPreAprobadosService {

  constructor(private _httpClient: HttpClient) { }

  obtenerListaCreditos(datos) {
    return this._httpClient.post<any>(`${environment.apiUrl}/corp/creditoPreaprobados/list/`, datos);
  }
  obtenerListaConvenios(datos) {
    return this._httpClient.post<any>(`${environment.apiUrl}/corp/empresas/list/convenio/`, datos);
  }
  actualizarCredito(datos) {
    return this._httpClient.post<any>(`${environment.apiUrl}/corp/creditoPreaprobados/update/${datos.id}`, datos);
  }
  // obtenerListaEmpresasIfis(datos) {
  //   return this._httpClient.post<any>(`${environment.apiUrl}/corp/empresas/list/ifis`, datos);
  // }
  // obtenerDatosRuc(id) {
  //   return this._httpClient.get<any>(`${environment.apiUrl}/personas/rucPersonas/listOne/${id}`);
  // }
  // actualizarDatosRuc(datos) {
  //   return this._httpClient.post<any>(`${environment.apiUrl}/personas/rucPersonas/update/${datos.user_id}`, datos);
  // }
  // obtenerEmpresa(id){
  //   return this._httpClient.get<any>(`${environment.apiUrl}/corp/empresas/listOne/${id}` );
  // }
  // guardarInformacion(datos) {
  //   return this._httpClient.post<any>(`${environment.apiUrl}/personas/personas/updateSinImagen/${datos.user_id}`, datos);
  // }
  // obtenerInformacion(id) {
  //   return this._httpClient.get<any>(`${environment.apiUrl}/personas/personas/listOne/${id}`,);
  // }
  // crearCredito(datos){
  //   return this._httpClient.post<any>(`${environment.apiUrl}/corp/creditoPersonas/create/`, datos);
  // }


}
