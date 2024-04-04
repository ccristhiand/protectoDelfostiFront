
export interface UsuarioList {
    idPersona: number,
    Correo: string,
    telefono: string,
    puesto:string,
    idRol:number,
    Rol:string
}
export interface ProductoList {
    sku : number,
    nombre: string,
    stock: number,
    idTipoProducto:number,
    etiquetas:number,
    precio:string,
    idUnidadMedida:number,
    tipo:string
    unidadMedida:string
}