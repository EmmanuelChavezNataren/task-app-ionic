import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CustomValidators } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl(''),
  });

  //Injects
  #firebaseServ = inject(FirebaseService);
  #utilsServ = inject(UtilsService);
  constructor() {}

  get name() {
    return this.form.controls.name;
  }
  get email() {
    return this.form.controls.email;
  }
  get password() {
    return this.form.controls.password;
  }
  get confirmPassword() {
    return this.form.controls.confirmPassword;
  }

  ngOnInit() {
    this.confirmPasswordValidator();
  }

  confirmPasswordValidator() {
    this.confirmPassword.setValidators([
      Validators.required,
      CustomValidators.matchValues(this.password),
    ]);

    this.confirmPassword.updateValueAndValidity();
  }

  onSignUp() {
    if (this.form.valid) {
      this.#utilsServ.presentLoading({ message: 'Registrando...' });
      this.#firebaseServ
        .signUp(this.form.value as User)
        .then(async (res) => {
          console.log(res);
          await this.#firebaseServ.updateUser({ displayName: this.name.value });

          let user: User = {
            uid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
          };

          this.#utilsServ.setElementInStorage('user', user);
          this.#utilsServ.routerLink('/tabs');

          this.#utilsServ.dismissLoading();
          this.#utilsServ.presentToast({
            message: `Te damos la bienvenida ${user.name}`,
            duration: 1500,
            color: 'primary',
            icon: 'person-outline',
          });
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
