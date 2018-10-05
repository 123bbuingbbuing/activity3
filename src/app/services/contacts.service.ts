import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contacts } from '../models/Contacts';

const httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})

export class ContactsService {
  userUrl: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contacts[]> {
    return this.http.get<Contacts[]>(this.userUrl);
  }

  removePost(contact: Contacts | number): Observable<Contacts> {
    const id = typeof contact === 'number' ? contact : contact.id;
    const url = `${this.userUrl}/${id}`;
    return this.http.delete<Contacts>(url, httpOptions);
  }

  viewContactInfo(id: number): Observable<Contacts> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<Contacts>(url);
  }

  savePost (contact: Contacts): Observable<Contacts> {
    return this.http.post<Contacts>(this.userUrl, contact, httpOptions);
  }
}
