import { TransporteAereoTipo } from "./transporte_aereo_tipo.interface";

export interface TransporteAereo {
  id:                   number;
  factura:              string;
  area:                 string;
  persona_insert:       number;
  evidencia:            string;
  fecha_ingreso:        string;
  transporte_tipo:      TransporteAereoTipo;
  tramo:                string;
  distancia:            number;
  numero_personas:      number;
  numero_recorridos:    number;

}
