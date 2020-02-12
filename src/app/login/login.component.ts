import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
  }

  loginAction() {
    let $user = $("#adminUser").val();
    let $pwd = $("#adminPwd").val();
    let $token;
    let self = this;
    $.ajax({
      url: "http://api.nextrem.pve2.fpmislata.com/public/login",
      data: { login: $user, password: $pwd },
      success: function (dataResult) {
        localStorage.setItem('user_token', dataResult.token);
        $token = localStorage.getItem('user_token');
        $.ajax({
          url: "http://api.nextrem.pve2.fpmislata.com/public/userLogged",
          headers: { 'Authorization': 'Bearer ' + $token },
          success: function (dataResult) {
            if (dataResult.user.isbusiness == 1) {
              localStorage.setItem('username', dataResult.user.username);
              localStorage.setItem('idUser', dataResult.user.id);
              localStorage.setItem('avatar', dataResult.user.avatar);

              self.router.navigate(['/graficas'])

            } else {
              localStorage.removeItem('user_token');
            }
          }
        });
      }

    });

  }
}
