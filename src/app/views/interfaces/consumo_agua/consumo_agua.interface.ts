export interface ConsumoAgua {
  id:                 number;
  fecha_ingreso:      string;
  factura:            string;
  area:               string;
  persona_insert:     number;
  codigo_medidor:     string;
  cantidad:           number;
}
// Generated by https://quicktype.io

export interface ConsumoaguaResponsive {
  data: Agua[];
}

export interface Agua {
  id:             number;
  medidor:        number;
  cantidad:       number;
  fecha_ingreso:  string;
  area:           string;
  evidencia_url:  string;
  createdAt:      string;
  updatedAt:      null;
  persona_upsert: string;
}

export interface ConsumoaguaRegister {
  id:             number;
  medidor:        number;
  cantidad:       number;
  fecha_ingreso:  string;
  area:           string;
  evidencia_url:  string;
}
