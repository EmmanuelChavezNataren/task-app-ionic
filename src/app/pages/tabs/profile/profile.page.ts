import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user = {} as User;

  //Injects
  #firebaseServ = inject(FirebaseService);
  #utilsServ = inject(UtilsService);
  constructor() {}

  // Life Cycle Events
  ngOnInit() {}

  ionViewWillEnter() {
    this.getUser();
  }

  //UI Events
  getUser() {
    return (this.user = this.#utilsServ.getElementFromStorage('user'));
  }

  onSignOut() {
    this.#utilsServ.presentAlert({
      header: 'Cerrar Sesión',
      message: '¿Quieres cerrar sesión?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí, cerrar',
          handler: () => {
            this.#firebaseServ.signOut();
          },
        },
      ],
    });
  }
}
