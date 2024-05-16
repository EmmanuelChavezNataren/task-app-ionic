import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Item, Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-task',
  templateUrl: './add-update-task.component.html',
  styleUrls: ['./add-update-task.component.scss'],
})
export class AddUpdateTaskComponent implements OnInit {
  @Input() task: Task;

  user = {} as User;
  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    items: new FormControl([], [Validators.required, Validators.minLength(1)]),
  });

  //Injects
  #firebaseServ = inject(FirebaseService);
  #utilsServ = inject(UtilsService);
  constructor() {}

  //Getters and Setters
  get title() {
    return this.form.controls.title;
  }
  get description() {
    return this.form.controls.description;
  }
  get items() {
    return this.form.controls.items;
  }

  //Life Cycle Events
  ngOnInit() {
    this.user = this.#utilsServ.getElementFromStorage('user');

    if (this.task) {
      this.form.setValue(this.task);
      this.form.updateValueAndValidity();
    }
  }

  //UI Events
  submit() {
    if (this.form.value) {
      if (this.task) {
        this.updateTask();
      } else {
        this.createTask();
      }
    }
  }

  createTask() {
    const path = `users/${this.user.uid}`;

    this.#utilsServ.presentLoading();
    delete this.form.value.id;

    this.#firebaseServ
      .addToSubcollection(path, 'tasks', this.form.value)
      .then((res) => {
        this.#utilsServ.dismissModal({ success: true });
        this.#utilsServ.presentToast({
          message: 'Tarea creada exitosamente',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });
        this.#utilsServ.dismissLoading();
      })
      .catch((error) => {
        this.#utilsServ.presentToast({
          message: error,
          color: 'warning',
          icon: 'alert-circle-outline',
          duration: 5000,
        });
        this.#utilsServ.dismissLoading();
      });
  }

  updateTask() {
    const path = `users/${this.user.uid}/tasks/${this.task.id}`;

    this.#utilsServ.presentLoading();
    delete this.form.value.id;

    this.#firebaseServ
      .updateDocument(path, this.form.value)
      .then((res) => {
        this.#utilsServ.dismissModal({ success: true });
        this.#utilsServ.presentToast({
          message: 'Tarea actualizada exitosamente',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });
        this.#utilsServ.dismissLoading();
      })
      .catch((error) => {
        this.#utilsServ.presentToast({
          message: error,
          color: 'warning',
          icon: 'alert-circle-outline',
          duration: 5000,
        });
        this.#utilsServ.dismissLoading();
      });
  }

  getPercentage() {
    return this.#utilsServ.getPercentage(this.form.value as Task);
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.form.value.items = ev.detail.complete(this.form.value.items);
    this.form.updateValueAndValidity();
  }

  trackItems(index: number, id: string) {
    return id;
  }

  removeItem(index: number) {
    this.form.value.items.splice(index, 1);
    this.items.updateValueAndValidity();
  }

  createItem() {
    this.#utilsServ.presentAlert({
      header: 'Nueva Actividad',
      backdropDismiss: false,
      inputs: [
        {
          name: 'name',
          type: 'textarea',
          placeholder: 'Hacer algo...',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Agregar',
          handler: (res) => {
            let item: Item = {
              name: res.name,
              completed: false,
            };
            this.form.value.items.push(item);
            this.items.updateValueAndValidity();
          },
        },
      ],
    });
  }
}
