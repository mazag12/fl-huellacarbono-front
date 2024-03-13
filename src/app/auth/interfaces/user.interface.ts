
export interface UserDataList {
  data: UserData;
}

export interface UserData {
  count: number;
  rows:  Row[];
}

export interface Row {
  id:       string;
  code:     string;
  email:    string;
  nombre:   string;
  apellido: string;
  isActive: boolean;
  role:     string;
  accesos:  any[];
}

export interface Token {
  sub:      number;
  code:     string;
  email:    string;
  nombre:   string;
  apellido: string;
  role:     string;
  iat:      number;
  exp:      number;
  aud:      string;
}

export interface UserRegister {
  id: number,
  code: string,
  email: string,
  password: string,
  nombre: string,
  apellido: string,
  isActive: boolean,
  accesos?: any,
  role: string,
}


export interface UserbyID {
  data: UserbyIDData;
}

export interface UserbyIDData {
  id:       string;
  code:     string;
  email:    string;
  nombre:   string;
  apellido: string;
  isActive: boolean;
  role:     string;
  accesos:  any[];
}


//recuperacion de contraseña
export interface Userverificar {
  data: UserverificatorData;
}

export interface UserverificatorData {
  id:       string;
  code:     string;
  email:    string;
  nombre:   string;
  apellido: string;
  isActive: boolean;
  accesos:  any[];
}

export interface Email {
  data: Data;
}

export interface Data {
  message: string;
}
