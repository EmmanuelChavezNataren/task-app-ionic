import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  ModalController,
  ModalOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  //Injects
  #loadingCtrl = inject(LoadingController);
  #router = inject(Router);
  #toastCtrl = inject(ToastController);
  #alertCtrl = inject(AlertController);
  #modalCtrl = inject(ModalController);
  constructor() {}

  // ========== Loading ========== //
  /**
   * Present Loading
   * @param opts
   */
  async presentLoading(opts?: LoadingOptions) {
    const loading = await this.#loadingCtrl.create(opts);
    await loading.present();
  }

  /**
   * Dismiss Loading
   * @returns
   */
  async dismissLoading() {
    return await this.#loadingCtrl.dismiss();
  }

  // ========== LocalStorage ========== //
  /**
   * Set element in LocalStorage
   * @param key storage key name
   * @param element item to be saved in local storage
   * @returns
   */
  setElementInStorage(key: string, element: any) {
    return localStorage.setItem(key, JSON.stringify(element));
  }

  /**
   * Get element in LocalStorage
   * @param key storage key name
   * @returns Object saved in localstorage parsed
   */
  getElementFromStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  // ========== Toast ========== //
  async presentToast(opts?: ToastOptions) {
    const toast = await this.#toastCtrl.create(opts);
    toast.present();
  }

  // ========== Router ========== //
  /**
   * Navigation to page by url
   * @param url page url
   * @returns
   */
  routerLink(url: string) {
    return this.#router.navigateByUrl(url);
  }

  // ========== Alert ========== //
  async presentAlert(opts: AlertOptions) {
    const alert = await this.#alertCtrl.create(opts);
    alert.present();
  }

  // ========== Modal ========== //
  async presentModal(opts: ModalOptions) {
    const modal = await this.#modalCtrl.create(opts);
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data) {
      return data;
    }
  }

  async dismissModal(data?: any) {
    return await this.#modalCtrl.dismiss();
  }

  getPercentage(task: Task) {
    const completedItems = task.items.filter((item) => item.completed).length;
    const totalItems = task.items.length;
    const percentage = (100 / totalItems) * completedItems;

    return parseInt(`${percentage}`);
  }
}
