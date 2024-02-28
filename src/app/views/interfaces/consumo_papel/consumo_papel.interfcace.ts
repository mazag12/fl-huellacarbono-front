import { ConsumoPapelTipo } from "./consumo_papel_tipo.interface";

export interface ConsumoPapel {
  id:                 number;
  fecha_ingreso:      string;
  factura:            string;
  area:               string;
  persona_insert:     number;
  tipo_papel_id:      ConsumoPapelTipo;
  cantidad:           number;
  reciclado:          number;
  nombre_certificado: string;
  densida:            number;
}
