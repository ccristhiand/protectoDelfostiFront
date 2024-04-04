export class Login {
    correo?: string;
    password?: string
}
export class Usuario {
    idRol?: number;
    nombre?: string;
    rol?: string;
    correo?: string;
    telefono?: string;
    puesto?: string;
    result?: string;
    idUsuario?: number;
    token?: string;
}
export class Token {
    typeResponse?: number;
    message?: string;
    access_token?: string;
}
