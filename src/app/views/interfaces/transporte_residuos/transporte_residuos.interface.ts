import { TransporteResiduosSeds } from "./transporte_residuos_seds.interface";
import { TransporteResiduosTipo } from "./transporte_residuos_tipo.interface";

export interface TransporteResiduos{
  id:                   number;
  factura:              string;
  area:                 string;
  persona_insert:       number;
  evidencia:            string;
  fecha_ingreso:        string;
  cantidad:             number;
  flg_alto_contenido_aceite:boolean;
  condiciones:          number;
  temperatura:          number;
  numero_recorridos:    number;
  numero_persona:       number;
  tipo_residuos:        TransporteResiduosTipo;
  tipo_seds:            TransporteResiduosSeds;
}
