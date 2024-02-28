import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Observable, catchError, map, of } from 'rxjs';
import { TipoElectricidad, Electricidad, Refrigerante, RefrigeranteTipo, RefrigeranteEquipo, Fugas, FugasTipo, ConsumoSein, ConsumoSeinTipo, TransporteCasaTrabajo, TransporteCasaTrabajoTipo, TransporteAereo, TransporteAereoTipo, TransporteTerrestre, TransporteTerrestreTipo, ConsumoPapel, ConsumoPapelTipo, ConsumoAgua, TransporteInsumos, TransporteInsumosTipo, TransporteResiduos, TransporteResiduosTipo, TransporteResiduosSeds, TransportePropio, TransportePropioTipo } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //TODO: DIRECCIÓN DE LA API
  private readonly baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  public headers = new HttpHeaders()
  .set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  //TODO: GENERA ELECTRICIDAD

  // deleteElectricidad(id: string): Observable<boolean> {
  //   return this.http.delete(`${this.baseUrl}huellacarbono/electricida/${ id }`)
  //   .pipe(
  //     catchError( err => of(false) ),
  //     map(resp => true)
  //   );
  // }

  //TODO: TIPO GENERADOR DE ELECTRICIDAD
  tipo_electricidad(): Observable<TipoElectricidad[]> {
    return this.http.get<TipoElectricidad[]>(`${this.baseUrl}electricidad/tipo`, { headers: this.headers });
  }

  obtenerCombustibleA1A2_id(id: number): Observable<TipoElectricidad> {
    return this.http.get<TipoElectricidad>(`${this.baseUrl}huellacarbono/combustiblea1/${id}`);
  }

  //TODO: REFRIGERANTE
  obtenerRefrigerante(): Observable<Refrigerante[]> {
    return this.http.get<Refrigerante[]>(`${this.baseUrl}huellacarbono/regfrigerante`);
  }

  addRefrigerante(refrigerante : Refrigerante): Observable<Refrigerante> {
    // const electricidades =  {
    //   fecha: electricida.fecha,
    //   factura: electricida.factura,
    //   tipocombustible: electricida.tipocombustible,
    //   cantidad: electricida.cantidad,
    //   evidencia: electricida.evidencia,
    //   user: electricida.user
    // };
    return this.http.post<Refrigerante>(`${this.baseUrl}huellacarbono/electricida`,refrigerante);
  }

  updateRefrigerante(refrigerante : Refrigerante): Observable<Refrigerante> {
    if( !refrigerante.id ) throw Error('Error en Actualizar datos');
    return this.http.patch<Refrigerante>(`${this.baseUrl}huellacarbono/electricida/${refrigerante.id}`,refrigerante);
  }

  deleteRefrigerante(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}huellacarbono/electricida/${ id }`)
    .pipe(
      catchError( err => of(false) ),
      map(resp => true)
    );
  }

  //TODO: TIPO REFRIGERANTE
  obtenerTiporefrigerante(): Observable<RefrigeranteTipo[]> {
    return this.http.get<RefrigeranteTipo[]>(`${this.baseUrl}huellacarbono/combustiblea1`);
  }

  //TODO: TIPO EQUIPO REFRIGERANTE
  obtenerTipoequiporefrigerante(id: number): Observable<RefrigeranteEquipo> {
    return this.http.get<RefrigeranteEquipo>(`${this.baseUrl}huellacarbono/combustiblea1/${id}`);
  }

  //TODO: REFRIGERANTE
  obtenerFugasf6(): Observable<Fugas[]> {
    return this.http.get<Fugas[]>(`${this.baseUrl}huellacarbono/regfrigerante`);
  }

  addFugasf6(fugas : Fugas): Observable<Fugas> {
    // const electricidades =  {
    //   fecha: electricida.fecha,
    //   factura: electricida.factura,
    //   tipocombustible: electricida.tipocombustible,
    //   cantidad: electricida.cantidad,
    //   evidencia: electricida.evidencia,
    //   user: electricida.user
    // };
    return this.http.post<Fugas>(`${this.baseUrl}huellacarbono/electricida`,fugas);
  }

  updateFugasf6(fugas : Fugas): Observable<Fugas> {
    if( !fugas.id ) throw Error('Error en Actualizar datos');
    return this.http.patch<Fugas>(`${this.baseUrl}huellacarbono/electricida/${fugas.id}`,fugas);
  }

  deleteFugasf6(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}huellacarbono/electricida/${ id }`)
    .pipe(
      catchError( err => of(false) ),
      map(resp => true)
    );
  }
  //TODO: TIPO FUGAS
  obtenerTipoFugas(): Observable<FugasTipo[]> {
    return this.http.get<FugasTipo[]>(`${this.baseUrl}huellacarbono/combustiblea1`);
  }

  //TODO: CONSUMO SEIN
  obtenerConsumoSein(): Observable<ConsumoSein[]> {
    return this.http.get<ConsumoSein[]>(`${this.baseUrl}huellacarbono/regfrigerante`);
  }

  addConsumoSein(consumosein : ConsumoSein): Observable<ConsumoSein> {
    // const electricidades =  {
    //   fecha: electricida.fecha,
    //   factura: electricida.factura,
    //   tipocombustible: electricida.tipocombustible,
    //   cantidad: electricida.cantidad,
    //   evidencia: electricida.evidencia,
    //   user: electricida.user
    // };
    return this.http.post<ConsumoSein>(`${this.baseUrl}huellacarbono/electricida`,consumosein);
  }

  updateConsumoSein(consumosein : ConsumoSein): Observable<ConsumoSein> {
    if( !consumosein.id ) throw Error('Error en Actualizar datos');
    return this.http.patch<ConsumoSein>(`${this.baseUrl}huellacarbono/electricida/${consumosein.id}`,consumosein);
  }

  deleteConsumoSein(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}huellacarbono/electricida/${ id }`)
    .pipe(
      catchError( err => of(false) ),
      map(resp => true)
    );
  }

  //TODO: TIPO FUGAS
  obtenerTipoConsumoSein(): Observable<ConsumoSeinTipo[]> {
    return this.http.get<ConsumoSeinTipo[]>(`${this.baseUrl}huellacarbono/combustiblea1`);
  }

  //TODO: TRANSPORTE CASA TRABAJO
  obtenerTransporteCasaTrabajo(): Observable<TransporteCasaTrabajo[]> {
    return this.http.get<TransporteCasaTrabajo[]>(`${this.baseUrl}huellacarbono/regfrigerante`);
  }

  addTransporteCasaTrabajo(transporteCasaTrabajo : TransporteCasaTrabajo): Observable<TransporteCasaTrabajo> {
    // const electricidades =  {
    //   fecha: electricida.fecha,
    //   factura: electricida.factura,
    //   tipocombustible: electricida.tipocombustible,
    //   cantidad: electricida.cantidad,
    //   evidencia: electricida.evidencia,
    //   user: electricida.user
    // };
    return this.http.post<TransporteCasaTrabajo>(`${this.baseUrl}huellacarbono/electricida`,transporteCasaTrabajo);
  }

  updateTransporteCasaTrabajo(transporteCasaTrabajo : TransporteCasaTrabajo): Observable<TransporteCasaTrabajo> {
    if( !transporteCasaTrabajo.id ) throw Error('Error en Actualizar datos');
    return this.http.patch<TransporteCasaTrabajo>(`${this.baseUrl}huellacarbono/electricida/${transporteCasaTrabajo.id}`,transporteCasaTrabajo);
  }

  deleteTransporteCasaTrabajo(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}huellacarbono/electricida/${ id }`)
    .pipe(
      catchError( err => of(false) ),
      map(resp => true)
    );
  }

  //TODO: TIPO CASA TRABAJO
  obtenerTipoTransporteCasaTrabajo(): Observable<TransporteCasaTrabajoTipo[]> {
    return this.http.get<TransporteCasaTrabajoTipo[]>(`${this.baseUrl}huellacarbono/combustiblea1`);
  }

  //TODO: TRANSPORTE AEREO
  obtenerTransporteAereo(): Observable<TransporteAereo[]> {
    return this.http.get<TransporteAereo[]>(`${this.baseUrl}huellacarbono/regfrigerante`);
  }

  addTransporteAereo(transporteCasaTrabajo : TransporteAereo): Observable<TransporteAereo> {
    // const electricidades =  {
    //   fecha: electricida.fecha,
    //   factura: electricida.factura,
    //   tipocombustible: electricida.tipocombustible,
    //   cantidad: electricida.cantidad,
    //   evidencia: electricida.evidencia,
    //   user: electricida.user
    // };
    return this.http.post<TransporteAereo>(`${this.baseUrl}huellacarbono/electricida`,transporteCasaTrabajo);
  }

  updateTransporteAereo(transporteAereo : TransporteAereo): Observable<TransporteAereo> {
    if( !transporteAereo.id ) throw Error('Error en Actualizar datos');
    return this.http.patch<TransporteAereo>(`${this.baseUrl}huellacarbono/electricida/${transporteAereo.id}`,transporteAereo);
  }

  deleteTransporteAereo(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}huellacarbono/electricida/${ id }`)
    .pipe(
      catchError( err => of(false) ),
      map(resp => true)
    );
  }

  //TODO: TIPO TRABAJO AEREO
  obtenerTipoTransporteAereo(): Observable<TransporteAereoTipo[]> {
    return this.http.get<TransporteAereoTipo[]>(`${this.baseUrl}huellacarbono/combustiblea1`);
  }

  //TODO: TRANSPORTE TERRESTRE
  obtenerTransporteTerrestre(): Observable<TransporteTerrestre[]> {
    return this.http.get<TransporteTerrestre[]>(`${this.baseUrl}huellacarbono/regfrigerante`);
  }

  addTransporteTerrestre(transporteTerrestre : TransporteTerrestre): Observable<TransporteTerrestre> {
    // const electricidades =  {
    //   fecha: electricida.fecha,
    //   factura: electricida.factura,
    //   tipocombustible: electricida.tipocombustible,
    //   cantidad: electricida.cantidad,
    //   evidencia: electricida.evidencia,
    //   user: electricida.user
    // };
    return this.http.post<TransporteTerrestre>(`${this.baseUrl}huellacarbono/electricida`,transporteTerrestre);
  }

  updateTransporteTerrestre(transporteTerrestre : TransporteTerrestre): Observable<TransporteTerrestre> {
    if( !transporteTerrestre.id ) throw Error('Error en Actualizar datos');
    return this.http.patch<TransporteTerrestre>(`${this.baseUrl}huellacarbono/electricida/${transporteTerrestre.id}`,transporteTerrestre);
  }

  deleteTransporteTerrestre(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}huellacarbono/electricida/${ id }`)
    .pipe(
      catchError( err => of(false) ),
      map(resp => true)
    );
  }

  //TODO: TIPO TRABAJO AEREO
  obtenerTipoTransporteTerrestre(): Observable<TransporteTerrestreTipo[]> {
    return this.http.get<TransporteTerrestreTipo[]>(`${this.baseUrl}huellacarbono/combustiblea1`);
  }

  //TODO: CONSUMO PAPEL
  obtenerConsumoPapel(): Observable<ConsumoPapel[]> {
    return this.http.get<ConsumoPapel[]>(`${this.baseUrl}huellacarbono/regfrigerante`);
  }

  addConsumoPapel(consumoPapel : ConsumoPapel): Observable<ConsumoPapel> {
    // const electricidades =  {
    //   fecha: electricida.fecha,
    //   factura: electricida.factura,
    //   tipocombustible: electricida.tipocombustible,
    //   cantidad: electricida.cantidad,
    //   evidencia: electricida.evidencia,
    //   user: electricida.user
    // };
    return this.http.post<ConsumoPapel>(`${this.baseUrl}huellacarbono/electricida`,consumoPapel);
  }

  updateConsumoPapel(consumoPapel : ConsumoPapel): Observable<ConsumoPapel> {
    if( !consumoPapel.id ) throw Error('Error en Actualizar datos');
    return this.http.patch<ConsumoPapel>(`${this.baseUrl}huellacarbono/electricida/${consumoPapel.id}`,consumoPapel);
  }

  deleteConsumoPapel(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}huellacarbono/electricida/${ id }`)
    .pipe(
      catchError( err => of(false) ),
      map(resp => true)
    );
  }

  //TODO: TIPO CONSUMO PAPEL
  obtenerTipoConsumoPapel(): Observable<ConsumoPapelTipo[]> {
    return this.http.get<ConsumoPapelTipo[]>(`${this.baseUrl}huellacarbono/combustiblea1`);
  }

  //TODO: CONSUMO AGUA
  obtenerConsumoAgua(): Observable<ConsumoAgua[]> {
    return this.http.get<ConsumoAgua[]>(`${this.baseUrl}huellacarbono/regfrigerante`);
  }

  addConsumoAgua(consumoAgua : ConsumoAgua): Observable<ConsumoAgua> {
    // const electricidades =  {
    //   fecha: electricida.fecha,
    //   factura: electricida.factura,
    //   tipocombustible: electricida.tipocombustible,
    //   cantidad: electricida.cantidad,
    //   evidencia: electricida.evidencia,
    //   user: electricida.user
    // };
    return this.http.post<ConsumoAgua>(`${this.baseUrl}huellacarbono/electricida`,consumoAgua);
  }

  updateConsumoAgua(consumoAgua : ConsumoAgua): Observable<ConsumoAgua> {
    if( !consumoAgua.id ) throw Error('Error en Actualizar datos');
    return this.http.patch<ConsumoAgua>(`${this.baseUrl}huellacarbono/electricida/${consumoAgua.id}`,consumoAgua);
  }

  deleteConsumoAgua(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}huellacarbono/electricida/${ id }`)
    .pipe(
      catchError( err => of(false) ),
      map(resp => true)
    );
  }

  //TODO: TRANSPORTE INSUMO
  obtenerTransporteInsumo(): Observable<TransporteInsumos[]> {
    return this.http.get<TransporteInsumos[]>(`${this.baseUrl}huellacarbono/regfrigerante`);
  }

  addTransporteInsumo(transporteInsumos : TransporteInsumos): Observable<TransporteInsumos> {
    // const electricidades =  {
    //   fecha: electricida.fecha,
    //   factura: electricida.factura,
    //   tipocombustible: electricida.tipocombustible,
    //   cantidad: electricida.cantidad,
    //   evidencia: electricida.evidencia,
    //   user: electricida.user
    // };
    return this.http.post<TransporteInsumos>(`${this.baseUrl}huellacarbono/electricida`,transporteInsumos);
  }

  updateTransporteInsumo(transporteInsumos : TransporteInsumos): Observable<TransporteInsumos> {
    if( !transporteInsumos.id ) throw Error('Error en Actualizar datos');
    return this.http.patch<TransporteInsumos>(`${this.baseUrl}huellacarbono/electricida/${transporteInsumos.id}`,transporteInsumos);
  }

  deleteTransporteInsumo(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}huellacarbono/electricida/${ id }`)
    .pipe(
      catchError( err => of(false) ),
      map(resp => true)
    );
  }

  //TODO: TIPO TRANSPORTE INSUMOS
  obtenerTipoTransporteInsumo(): Observable<TransporteInsumosTipo[]> {
    return this.http.get<TransporteInsumosTipo[]>(`${this.baseUrl}huellacarbono/combustiblea1`);
  }

  //TODO: TRANSPORTE RESIDUOS
  obtenerTransporteResiduos(): Observable<TransporteResiduos[]> {
    return this.http.get<TransporteResiduos[]>(`${this.baseUrl}huellacarbono/regfrigerante`);
  }

  addTransporteResiduos(transporteResiduos : TransporteResiduos): Observable<TransporteResiduos> {
    // const electricidades =  {
    //   fecha: electricida.fecha,
    //   factura: electricida.factura,
    //   tipocombustible: electricida.tipocombustible,
    //   cantidad: electricida.cantidad,
    //   evidencia: electricida.evidencia,
    //   user: electricida.user
    // };
    return this.http.post<TransporteResiduos>(`${this.baseUrl}huellacarbono/electricida`,transporteResiduos);
  }

  updateTransporteResiduos(transporteResiduos : TransporteResiduos): Observable<TransporteResiduos> {
    if( !transporteResiduos.id ) throw Error('Error en Actualizar datos');
    return this.http.patch<TransporteResiduos>(`${this.baseUrl}huellacarbono/electricida/${transporteResiduos.id}`,transporteResiduos);
  }

  deleteTransporteResiduos(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}huellacarbono/electricida/${ id }`)
    .pipe(
      catchError( err => of(false) ),
      map(resp => true)
    );
  }

  //TODO: TIPO TRANSPORTE RESIDUOS
  obtenerTipoTransporteResiduos(): Observable<TransporteResiduosTipo[]> {
    return this.http.get<TransporteResiduosTipo[]>(`${this.baseUrl}huellacarbono/combustiblea1`);
  }

  //TODO: SEDS TRANSPORTE RESIDUOS
  obtenerSedsTransporteResiduos(): Observable<TransporteResiduosSeds[]> {
    return this.http.get<TransporteResiduosSeds[]>(`${this.baseUrl}huellacarbono/combustiblea1`);
  }

  //TODO: TRANSPORTE PROPIO
  obtenerTransportePropio(): Observable<TransportePropio[]> {
    return this.http.get<TransportePropio[]>(`${this.baseUrl}huellacarbono/regfrigerante`);
  }

  addTransportePropio(transportePropio : TransportePropio): Observable<TransportePropio> {
    // const electricidades =  {
    //   fecha: electricida.fecha,
    //   factura: electricida.factura,
    //   tipocombustible: electricida.tipocombustible,
    //   cantidad: electricida.cantidad,
    //   evidencia: electricida.evidencia,
    //   user: electricida.user
    // };
    return this.http.post<TransportePropio>(`${this.baseUrl}huellacarbono/electricida`,transportePropio);
  }

  updateTransportePropio(transportePropio : TransportePropio): Observable<TransportePropio> {
    if( !transportePropio.id ) throw Error('Error en Actualizar datos');
    return this.http.patch<TransportePropio>(`${this.baseUrl}huellacarbono/electricida/${transportePropio.id}`,transportePropio);
  }

  deleteTransportePropio(id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}huellacarbono/electricida/${ id }`)
    .pipe(
      catchError( err => of(false) ),
      map(resp => true)
    );
  }

  //TODO: TIPO TRANSPORTE PROPIO
  obtenerTipoTransportePropio(): Observable<TransportePropioTipo[]> {
    return this.http.get<TransportePropioTipo[]>(`${this.baseUrl}huellacarbono/combustiblea1`);
  }

}
