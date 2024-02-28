import { TransporteCasaTrabajoTipo } from "./transporte_casa_trabajo_tipo.interface";

export interface TransporteCasaTrabajo{
  id:                   number;
  factura:              string;
  area:                 string;
  persona_insert:       number;
  evidencia:            string;
  fecha_ingreso:        string;
  descripcion_personal: string;
  numero_trabajadores:  number;
  tipo_transporte:      TransporteCasaTrabajoTipo;
  viajes_semana:        number;
  dias_laborables:      number;
  distancia_primedio:   number;
}
