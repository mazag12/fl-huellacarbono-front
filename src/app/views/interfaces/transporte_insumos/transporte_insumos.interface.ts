import { TransporteInsumosTipo } from "./transporte_insumos_tipo.interface";

export interface TransporteInsumos{
  id:                   number;
  factura:              string;
  area:                 string;
  persona_insert:       number;
  evidencia:            string;
  fecha_ingreso:        string;
  descripcion_carga:    string;
  viajes_totales:       number;
  tramo_viaje:          number;
  peso:                 number;
  distancia:            number;
  tipo_transporte_id:   TransporteInsumosTipo;
}
