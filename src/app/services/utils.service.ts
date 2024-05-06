import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  LoadingController,
  LoadingOptions,
  ToastController,
  ToastOptions,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  //Injects
  #loadingCtrl = inject(LoadingController);
  #router = inject(Router);
  #toastCtrl = inject(ToastController);
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
}
