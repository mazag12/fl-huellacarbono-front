// Generated by https://quicktype.io

export interface ElectricidadAll {
  data: ElectrividadData;
}

export interface ElectrividadData {
  count: number;
  rows:  ElectricidadRow[];
}

export interface ElectricidadRow {
  id:                   string;
  tipo_electricidad_id: string;
  cantidad:             number;
  fecha_ingreso:        string;
  factura:              string;
  area:                 string;
  evidencia_url:        string;
  createdAt:            string;
  updatedAt:            null;
  persona_upsert:       string;
  tipo_electricidad:    TipoElectricidad;
}

export interface Electricidad {
  data: ElectricidadResponse[];
}

export interface TipoElectricidadResponse{
  data: TipoElectricidad[];
}

export interface ElectricidadById {
  data: ElectricidadResponse;
}

export interface ElectricidadResponse {
  id:                   string;
  tipo_electricidad_id: string;
  cantidad:             number;
  fecha_ingreso:        string;
  factura:              string;
  area:                 string;
  evidencia_url:        string;
  createdAt:            string;
  updatedAt:            null;
  persona_upsert:       string;
  tipo_electricidad:    TipoElectricidad;
}

export interface TipoElectricidad {
  id?:         string;
  nombre:      string;
  unidad:      string;
  factor:      number;
  valor_neto:  number;
  co2:         number;
  ch4:         number;
  n2o:         number;
  flag_activo?: boolean;
}

export interface ElectricidadRegister{
  id:                   string,
  tipo_electricidad_id: string,
  cantidad:             number,
  fecha_ingreso:        string,
  factura:              string,
  area:                 string,
  evidencia_url:        string
}

export interface ElectricidadReporteData{
  data: ElectricidadReporte[];
}

export interface ElectricidadReporte{
  id: string;
  nombre: string;
  unidad: string;
  area: string;
  cantidad: number;
  factor: number;
  valor_neto: number;
  co2: number;
  n2o: number;
  ch4: number;
}

export interface ElectricidadAgrupada {
  id: string;
  nombre: string;
  unidad: string;
  cantidad: number;
  a: number;
  neto: number;
  c: number;
  co2: number;
  e: number;
  ch4: number;
  g: number;
  n2o: number;
  i: number;
  j: number;
}

export interface ElectricidadVerificacion {
  data: Datum[];
}

export interface Datum {
  "": number;
}
