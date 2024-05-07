import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  //Injects
  #authFire = inject(AngularFireAuth);
  #fireDB = inject(AngularFirestore);
  #utilsServ = inject(UtilsService);
  constructor() {}

  /** AUTH **/

  login(user: User) {
    return this.#authFire.signInWithEmailAndPassword(user.email, user.password);
  }

  signUp(user: User) {
    return this.#authFire.createUserWithEmailAndPassword(
      user.email,
      user.password
    );
  }

  updateUser(user: any) {
    const auth = getAuth();
    return updateProfile(auth.currentUser, user);
  }

  getAuthState() {
    return this.#authFire.authState;
  }

  async signOut() {
    await this.#authFire.signOut();
    this.#utilsServ.routerLink('/auth');
    localStorage.removeItem('user');
  }
}
