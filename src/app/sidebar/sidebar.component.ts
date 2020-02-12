import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  options: any;//{"perfil","graficas","eventos"};
  //{ path: '/upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: 'active-pro' }
  logged: any;
  
  constructor() {  }

  ngOnInit() {
    this.options = [{ path: "/graficas", title: "Graficas" }, { path: "/eventos", title: "Eventos" }, { path: "/usuarios", title: "Usuarios" }];
    this.logged = localStorage.getItem('user_token');
   /*  if(this.logged==null){
      this.login();
    } */
    
 
  }

  logoutAction(){
    localStorage.removeItem('user_token');
    localStorage.removeItem('username');
    localStorage.removeItem('idUser');
    localStorage.removeItem('avatar');
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
  /* login() {
    let $token;
    //this.http.get("http://api.nextrem.pve2.fpmislata.com/public/login",httpOptions);
    $.ajax({
      url: "http://api.nextrem.pve2.fpmislata.com/public/login",
      data: { login: "monkeySL", password: "monkeySL" },
      success: function (dataResult) {
        localStorage.setItem('user_token', dataResult.token);
        $token = localStorage.getItem('user_token');
        $.ajax({
          url: "http://api.nextrem.pve2.fpmislata.com/public/userLogged",
          headers: { 'Authorization': 'Bearer ' + $token },
          success: function (dataResult) {
            localStorage.setItem('username', dataResult.user.username);
            localStorage.setItem('idUser', dataResult.user.id);
            localStorage.setItem('avatar', dataResult.user.avatar);

            location.reload();
          }
        });
      }

    });
  } */

}
