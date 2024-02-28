import { TransportePropioTipo } from "./transporte_propio_tipo.interface";

export interface TransportePropio{
  id:                   number;
  factura:              string;
  area:                 string;
  persona_insert:       number;
  evidencia:            string;
  fecha_ingreso:        string;
  tramo:                number;
  tipo_combustible_id:  TransportePropioTipo;
  cantidad:             number;
}
