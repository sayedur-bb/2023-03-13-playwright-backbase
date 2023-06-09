import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './core/header/header.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidemenuComponent } from './core/sidemenu/sidemenu.component';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './core/loader/loader.component';

@Component({
  selector: 'eternal-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    LoaderComponent,
    SidemenuComponent,
    MatToolbarModule,
    MatSidenavModule,
    RouterOutlet,
    HeaderComponent
  ]
})
export class AppComponent {}
