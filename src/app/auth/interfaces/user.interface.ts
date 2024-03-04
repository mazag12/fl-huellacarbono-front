export interface User {
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
