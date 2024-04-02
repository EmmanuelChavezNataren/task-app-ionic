import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

  get email(){
    return this.form.controls.email;
  }

  get password(){
    return this.form.controls.password;
  }

  ngOnInit() {
  }

  onLogin(){
    if(this.form.valid){
            console.log('Form Values: ', this.form.value);
    }
  }

}
