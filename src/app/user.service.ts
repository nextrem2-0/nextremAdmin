import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders , HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers= new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('user_token')
    
    
  });
  constructor(protected http: HttpClient) { }
  getUsers(){
      return this.http.get('http://api.nextrem.pve2.fpmislata.com/public/usuarios',{headers:this.headers});
  }
  addUser(user){
    
    //return this.http.post('http://api.nextrem.pve2.fpmislata.com/public/register',{headers:this.headers,params:user});
  }
  deleteUser(user){
    return this.http.get('http://api.nextrem.pve2.fpmislata.com/public/borrarUser'+user.id,{headers:this.headers});
  }
  updateUser(user){
    let params= new HttpParams();
    for (let data in user){
      params=params.set(data,user[data]);
    }
    return this.http.get('http://api.nextrem.pve2.fpmislata.com/public/editarPerfil',{headers:this.headers,params:params});
  }
}
