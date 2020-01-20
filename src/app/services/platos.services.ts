import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()

export class PlatoServices{
    public url: string;

    constructor(
        private _http: HttpClient,
    ){}


    getPlatos():Observable<any>{
        this.url = 'https://slowlyfood-api.herokuapp.com/api/';
        return this._http.get(this.url + 'articles');
    }

     getPlato(platoId):Observable<any>{
       this.url = 'https://slowlyfood-api.herokuapp.com/api/';
       return this._http.get(this.url + 'article/' + platoId);
     }
     
}
