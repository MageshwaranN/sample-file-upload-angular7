import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  public uploadToRemote(file): Observable<any> {
    return this.http.post('http://www.mocky.io/v2/5d7b8922350000b2593cac67', file, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
