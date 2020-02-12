import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Evento } from "./classes/evento";
//import { EVENTOS } from "./mock-events";
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EventoService {
  headers= new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('user_token')
  });
   

  constructor(protected http: HttpClient) { }
  getEvents(){
      return this.http.get('http://api.nextrem.pve2.fpmislata.com/public/eventos',{headers:this.headers});
  }
  addEvent(event){
    let params= new HttpParams();
    for (let data in event){
      params=params.set(data,event[data]);
    }
    return this.http.get('http://api.nextrem.pve2.fpmislata.com/public/addEvento',{headers:this.headers,params:params});
  }
  deleteEvent(event){
    return this.http.get('http://api.nextrem.pve2.fpmislata.com/public/borrarEvento/'+event.id,{headers:this.headers});
  }
  updateEvent(event){
    let params= new HttpParams();
    for (let data in event){
      params=params.set(data,event[data]);
    }
    
    return this.http.patch('http://api.nextrem.pve2.fpmislata.com/public/editarEvento',{headers:this.headers,params:params});
  }
  getEventsUser(userId){
      return this.http.get('http://api.nextrem.pve2.fpmislata.com/public/user/'+userId+'/eventosCreados',{headers:this.headers});
  }
}
