import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()

export class PlatoServices{
    public url: string;

    constructor(
        private _http: HttpClient,
    ){

    }

    pruebas(){
        return "Holaa desde service"
    }

    getPlatos():Observable<any>{
        this.url = 'http://localhost:3900/api/';
        return this._http.get(this.url + 'articles');
    }

     getPlato(platoId):Observable<any>{
       this.url = 'http://localhost:3900/api/';
       return this._http.get(this.url + 'article/' + platoId);
     }
}
