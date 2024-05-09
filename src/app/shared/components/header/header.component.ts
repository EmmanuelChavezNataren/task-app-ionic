import { Component, Input, OnInit, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input()
  title: string = '';

  @Input()
  backButton: string = '';

  @Input()
  isModal: boolean = false;

  @Input()
  color: string = '';

  @Input()
  hasCenterTitle: boolean = false;

  isDarkMode: BehaviorSubject<boolean>;

  //Injects
  #themeServ = inject(ThemeService);
  #utilsServ = inject(UtilsService);
  constructor() {}

  // Life Cycle Events
  ngOnInit(): void {
    this.isDarkMode = this.#themeServ.isDarkMode;
  }

  //UI Events
  setTheme(isDarkMode: boolean) {
    this.#themeServ.setTheme(isDarkMode);
  }

  dissmissModal() {
    this.#utilsServ.dismissModal();
  }
}
