import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { myHeaders } from '../common/Config';
import { Deezer } from '../common/Song';

@Injectable({
  providedIn: 'root'
})
export class DeezerService {

  baseUrl: string = 'https://deezerdevs-deezer.p.rapidapi.com';
  

  constructor(
    private http: HttpClient
  ) { }

  getCatalogueBySongOrArtist(keyword: string): Observable<Deezer>{
    return this.http.get<Deezer>(`${this.baseUrl}/search?q=${keyword}&limit=10`, { 'headers': myHeaders });
  }
}
