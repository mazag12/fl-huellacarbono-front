export interface Transportepropio {
  data: Transportepropioresponsive[];
}

export interface TipoTransportepropioResponse{
  data: TipoTransportePropio[];
}

export interface Transportepropioresponsive {
  id:                        number;
  tipo_transporte_propio:    TipoTransportePropio;
  tipo_transporte_propio_id: number;
  cantidad:                  number;
  fecha_ingreso:             string;
  area:                      string;
  evidencia_url:             string;
  createdAt:                 string;
  updatedAt:                 string;
  persona_upsert:            string;
}

export interface TipoTransportePropio {
  id:          number;
  nombre:      string;
  unidad:      string;
  factor:      number;
  valor_neto:  number;
  co2:         number;
  ch4:         number;
  n2o:         number;
  flag_activo: boolean;
}


export interface TransportePropioRegister{
  id:                         number,
  tipo_transporte_propio_id:  number,
  cantidad:                   number,
  fecha_ingreso:              string,
  area:                       string,
  evidencia_url:              string
}
