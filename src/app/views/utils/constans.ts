export enum Localizacion {
    ofina = 'CD principal - Oficina',
    tienda = 'Tiendas'
}

export const permisosDisponibles: any[] = [
  { id: 1, nombre: 'Generación electricidad', alcance: 1, cantidad: 0},
  { id: 2, nombre: 'Transporte propio', alcance: 1, cantidad: 0 },
  { id: 3, nombre: 'Refrigerantes', alcance: 1, cantidad: 0 },
  { id: 4, nombre: 'Fugas de SF6', alcance: 1, cantidad: 0 },
  { id: 5, nombre: 'Consumo de electricidad del SEIN (en KWh)', alcance: 2, cantidad: 0 },
  { id: 6, nombre: 'Transporte casa-trabajo', alcance: 3, cantidad: 0 },
  { id: 7, nombre: 'Transporte aéreo', alcance: 3, cantidad: 0 },
  { id: 8, nombre: 'Transporte terrestre', alcance: 3, cantidad: 0 },
  { id: 9, nombre: 'Consumo de papel', alcance: 3, cantidad: 0 },
  { id: 10, nombre: 'Consumo de agua potable de la red pública (en m3)', alcance: 3, cantidad: 0 },
  { id: 11, nombre: 'Transporte de insumos por terceros', alcance: 3, cantidad: 0 },
  { id: 12, nombre: 'Generación de residuos sólidos', alcance: 3, cantidad: 0 }
];


export const tablafna: any[] = [
  { id: 0, nombre: 'Alcance 1', alcance: 1, background: '#E9B7B1'},
  { id: 1, nombre: 'Generación electricidad', alcance: 1, background: '#FFFFFF'},
  { id: 2, nombre: 'Transporte propio', alcance: 1, background: '#FFFFFF' },
  { id: 3, nombre: 'Refrigerantes', alcance: 1, background: '#FFFFFF' },
  { id: 4, nombre: 'Fugas de SF6', alcance: 1, background: '#FFFFFF' },
  { id: 5, nombre: 'Alcance 2', alcance: 2, background: '#FFFABB'},
  { id: 6, nombre: 'Consumo de electricidad del SEIN (en KWh)', alcance: 2, background: '##FFFFFF' },
  { id: 5, nombre: 'Alcance 3', alcance: 3, background: '#B0DAF7'},
  { id: 7, nombre: 'Transporte casa-trabajo', alcance: 3, background: '#FFFFFF' },
  { id: 8, nombre: 'Transporte aéreo', alcance: 3, background: '#FFFFFF' },
  { id: 9, nombre: 'Transporte terrestre', alcance: 3, background: '#FFFFFF' },
  { id: 10, nombre: 'Consumo de papel', alcance: 3, background: '#FFFFFF' },
  { id: 11, nombre: 'Consumo de agua potable de la red pública (en m3)', alcance: 3, background: '#FFFFFF' },
  { id: 12, nombre: 'Transporte de insumos por terceros', alcance: 3, background: '#FFFFFF' },
  { id: 13, nombre: 'Generación de residuos sólidos', alcance: 3, background: '#FFFFFF' }
];

export const meses: string[] = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];

export const cabecera: string[] = [
  'Alcances',
  'Dioxido de carbono [tCO2]',
  'Metano [tCH4]',
  'Óxido Nitroso [tN2O]',
  'Hexafluoruro de azufre [tSF6]',
  'Hidrofluorocarbonos [tHFC]',
  'Perfluorocarbonos [tPFC]',
  'Trifluoruro de nitrógeno [tNF3]',
  'Emisiones GEI [tCO2e]',
  'Participación general [%]'
]
