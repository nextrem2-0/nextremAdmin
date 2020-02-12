import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Administrador de eventos';

  userLogged(){
    if(localStorage.getItem("user_token") != null){
      return true;
    }else{
      return false;
    }
  }
}
