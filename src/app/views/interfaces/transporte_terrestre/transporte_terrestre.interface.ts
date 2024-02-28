import { TransporteTerrestreTipo } from "./transporte_terrestre_tipo.interface";

export interface TransporteTerrestre{
  id:                   number;
  factura:              string;
  area:                 string;
  persona_insert:       number;
  evidencia:            string;
  fecha_ingreso:        string;
  tramo:                number;
  tipo_transporte_id:   TransporteTerrestreTipo;
  distancia:            number;
  ida_vuelta:           number;
  numero_recorridos:    number;
  numero_persona:       number;
}
