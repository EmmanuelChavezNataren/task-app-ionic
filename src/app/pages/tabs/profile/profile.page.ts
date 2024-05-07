import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  //Injects
  #firebaseServ = inject(FirebaseService);
  constructor() {}

  ngOnInit() {}

  onSignOut() {
    this.#firebaseServ.signOut();
  }
}
