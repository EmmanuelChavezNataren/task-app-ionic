import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

    form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    })

    //Injects
  #firebaseServ = inject(FirebaseService);
  #utilsServ = inject(UtilsService);
  constructor() { }

  get email(){
    return this.form.controls.email;
  }
  get password(){
    return this.form.controls.password;
  }

  ngOnInit() {
  }

  onLogin() {
    if (this.form.valid) {
      this.#utilsServ.presentLoading({ message: 'Autenticando...' });
      this.#firebaseServ
        .login(this.form.value as User)
        .then(async (res) => {
          console.log(res);

          let user: User = {
            uid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
          };

          this.#utilsServ.setElementInStorage('user', user);
          this.#utilsServ.routerLink('/tabs/home');

          this.#utilsServ.dismissLoading();
          this.#utilsServ.presentToast({
            message: `Te damos la bienvenida ${user.name}`,
            duration: 1500,
            color: 'primary',
            icon: 'person-outline',
          });

          this.form.reset();
        })
        .catch((error) => {
          console.error(error);
          this.#utilsServ.dismissLoading();
          this.#utilsServ.presentToast({
            message: error,
            duration: 5000,
            color: 'warning',
            icon: 'alert-circle-outline',
          });
        });
    }
  }


}
