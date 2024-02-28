import { FugasTipo } from "./fugas_tipo.interface";

export interface Fugas {
  id:                 number;
  fecha_ingreso:      string;
  factura:            string;
  area:               string;
  persona_insert:     number;
  descripcion_equipo: string;
  cantidad:           number;
  tipo_fuga_sf6_id:   FugasTipo;
  capacidad_carga:    number;
  tiempo_uso:         number;
  fuga_instalacion:   number;
  fraccion_disposicion:number;
  fraccion_recuperado:number;
}
