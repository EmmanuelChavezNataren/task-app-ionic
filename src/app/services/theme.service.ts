import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {}

  setInitialTheme() {
    let isDarkMode = JSON.parse(localStorage.getItem('darkMode'));
    this.setTheme(isDarkMode);
  }

  setTheme(isDarkMode: boolean) {
    if (isDarkMode) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
    this.isDarkMode.next(isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }
}
