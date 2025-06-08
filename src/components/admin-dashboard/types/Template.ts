export interface Template {
    id?: number;
    nombre: string;
    tipo: 'Email' | 'SMS' | 'Push';
    contenido: string;
    fecha?: string;
    estado: 'Borrador' | 'Publicado';
  }
  