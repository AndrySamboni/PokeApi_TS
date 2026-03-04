export interface RickapiResponse {
    id:        number;
    name:    string;
    status:    string;
    species:   string;
    tipo:      string;
    género:    string;
    origen:    location;
    ubicación: location;
    image:    string;
    episodio:  string[];
    url:       string;
    creado:    Date;
}


export interface location {
    nombre: string;
    url:    string;
}

export interface HttpAdapter {
    get<T>(url:string):Promise<T>;
}