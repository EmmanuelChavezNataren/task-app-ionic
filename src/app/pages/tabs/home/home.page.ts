import { Component, OnInit, inject } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tasks: Task[] = [
    {
      id: '1',
      title: 'Autenticación con Google',
      description:
        'Crear una función que permita autenticar al usuario con Google',
      items: [
        { name: 'Actividad 1', completed: true },
        { name: 'Actividad 2', completed: false },
        { name: 'Actividad 3', completed: false },
      ],
    },
    {
      id: '2',
      title: 'Autenticación con Google',
      description:
        'Crear una función que permita autenticar al usuario con Google',
      items: [
        { name: 'Actividad 1', completed: true },
        { name: 'Actividad 2', completed: true },
        { name: 'Actividad 3', completed: false },
      ],
    },
    {
      id: '3',
      title: 'Autenticación con Google',
      description:
        'Crear una función que permita autenticar al usuario con Google',
      items: [
        { name: 'Actividad 1', completed: true },
        { name: 'Actividad 2', completed: true },
        { name: 'Actividad 3', completed: true },
      ],
    },
  ];

  //Injects
  #firebaseServ = inject(FirebaseService);
  #utilsServ = inject(UtilsService);
  constructor() {}

  ngOnInit() {}

  //UI Events

  getPercentage(task: Task) {
    return this.#utilsServ.getPercentage(task);
  }
}
