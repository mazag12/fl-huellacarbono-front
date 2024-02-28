import { ConsumoSeinTipo } from "./consumo_sein_tipo.interface";

export interface ConsumoSein {
  id:                 number;
  fecha_ingreso:      string;
  factura:            string;
  area:               string;
  persona_insert:     number;
  tipo_consumo_sein_id:ConsumoSeinTipo;
  suministro:         string;
  cantidad:           number;
}
