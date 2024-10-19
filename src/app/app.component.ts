import {
  Component,
  Inject,
  Injector,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { SidenavService } from './services/sidenav.service';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AuthService } from './services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ACCESS_TOKEN, USER } from './data/constants';
import { UsersService } from './services/users.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TopBarComponent,
    SidenavComponent,
    FooterComponent,
    ToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;
  opened = false;
  fullname = '';
  sidenavService!: SidenavService;
  constructor(
    private injector: Injector,
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem(ACCESS_TOKEN)) {
        this.authService.isLoggedIn.next(true);
        const fObj = localStorage.getItem(USER);
        if (fObj) {
          const user = JSON.parse(fObj);
          this.authService.user.next(user);
          this.authService.isAdmin.next(user.isAdmin);
        }
      }
    }
    this.router = this.injector.get(Router);
    this.sidenavService = this.injector.get(SidenavService);
    this.sidenavService.opened.subscribe((opened) => {
      this.opened = opened;
    });
    this.authService.isLoggedIn.subscribe((r) => {
      this.isLoggedIn = r;
    });
    this.authService.isAdmin.subscribe((a) => {
      this.isAdmin = a;
    });
    this.authService.user.subscribe((u) => {
      this.fullname = u.fullname;
    });
    this.usersService
      .getProfile()
      .pipe(first())
      .subscribe((p: any) => {
        this.fullname = p.firstname + ' ' + p.lastname;
      });
  }
  onItemClicked(path: string) {
    if (path) this.router.navigate([path]);
    this.sidenavService.close();
  }
  onLogout() {
    this.authService.logout();
    this.sidenavService.close();
  }
  onLogin() {
    this.router.navigate(['/', 'login']);
    this.sidenavService.close();
  }
}
