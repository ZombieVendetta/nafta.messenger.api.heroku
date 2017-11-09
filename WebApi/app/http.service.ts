import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CONFIGURATION } from "./app.constants";

@Injectable()
export class HttpService {
    headers = new Headers({
        'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')
    });

    constructor(private http: Http) { }

    get(url: string): Observable<any> {
        return this.http.get(CONFIGURATION.baseUrls.server + url, { headers: this.headers })
            .map((resp: Response) => resp.json())
            .catch((error: any) => { return Observable.throw(error); });
    }

    post(url: string, body: string, head: string = null) {
        if (head != null)
            this.headers.set('Content-Type', head);
        return this.http.post(CONFIGURATION.baseUrls.server + url, body, { headers: this.headers })
            .map((resp: Response) => resp.json()).subscribe();
    }

    put(url: string, body: string) {
        return this.http.put(CONFIGURATION.baseUrls.server + url, body, { headers: this.headers })
            .map((resp: Response) => resp.json()).subscribe();
    }

    delete(url: string) {
        this.http.delete(CONFIGURATION.baseUrls.server + url, { headers: this.headers })
            .map((resp: Response) => resp.json()).subscribe();
    }
}