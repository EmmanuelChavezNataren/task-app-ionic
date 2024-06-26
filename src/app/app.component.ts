import { Component, inject } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  #themeServ = inject(ThemeService);

  constructor() {
    this.#themeServ.setInitialTheme();
  }
}
