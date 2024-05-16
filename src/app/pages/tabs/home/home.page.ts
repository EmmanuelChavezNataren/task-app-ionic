import { Component, OnInit, inject } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateTaskComponent } from 'src/app/shared/components/add-update-task/add-update-task.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tasks: Task[] = [];
  user = {} as User;
  loading: boolean = false;

  //Injects
  #firebaseServ = inject(FirebaseService);
  #utilsServ = inject(UtilsService);
  constructor() {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getTasks();
    this.getUser();
  }

  //UI Events
  getUser() {
    return (this.user = this.#utilsServ.getElementFromStorage('user'));
  }

  getPercentage(task: Task) {
    return this.#utilsServ.getPercentage(task);
  }

  async addOrUpdateTask(task?: Task) {
    const res = await this.#utilsServ.presentModal({
      component: AddUpdateTaskComponent,
      componentProps: { task },
      cssClass: 'add-update-modal',
    });

    if (res && res.success) {
      this.getTasks();
    }
  }

  getTasks() {
    const user: User = this.#utilsServ.getElementFromStorage('user');
    const path = `users/${user.uid}`;

    this.loading = true;
    const sub = this.#firebaseServ.getSubcollection(path, 'tasks').subscribe({
      next: (res: Task[]) => {
        console.log(res);
        this.tasks = res;
        sub.unsubscribe();
        this.loading = false;
      },
    });
  }

  confirmDeleteTask(task: Task) {
    this.#utilsServ.presentAlert({
      header: 'Eliminar Tarea',
      message: '¿Quieres eliminar esta tarea?',
      mode: 'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sí, eliminar',
          handler: () => {
            this.deleteTask(task);
          },
        },
      ],
    });
  }

  deleteTask(task: Task) {
    const path = `users/${this.user.uid}/tasks/${task.id}`;

    this.#utilsServ.presentLoading();

    this.#firebaseServ
      .deleteDocument(path)
      .then((res) => {
        this.#utilsServ.presentToast({
          message: 'Tarea eliminada exitosamente',
          color: 'success',
          icon: 'checkmark-circle-outline',
          duration: 1500,
        });

        this.getTasks();
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
}
