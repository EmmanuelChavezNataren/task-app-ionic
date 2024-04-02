import { Input, inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeService } from 'src/app/services/theme.service';

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

  #themeServ = inject(ThemeService);

  constructor() {}

  ngOnInit(): void {
      this.isDarkMode = this.#themeServ.isDarkMode;
  }

  setTheme(isDarkMode: boolean) {
    this.#themeServ.setTheme(isDarkMode);
  }
}
