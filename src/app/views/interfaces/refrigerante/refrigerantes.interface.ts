
import { RefrigeranteEquipo } from "./refrigerantes_equipo.interface";

export interface Refrigerante {
  id:              number;
  factura:         string;
  area:            string;
  persona_insert:  number;
  evidencia:       string;
  fecha_ingreso:   string;
  tipo_refrigerante:RefrigeranteEquipo;
  tipo_equipo:      RefrigeranteEquipo;
  Tipo_operacion:  string;
  cantidad:        number;
  capacidad_carga: number;
  fuga_instalacion:number;
  tiempo_uso:      number;
  porcentaje_fuga: number;
  fraccion_disposicion: number;
  fraccion_recuperacion: number;
}
