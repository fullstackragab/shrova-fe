import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { Category } from '../../data/category';
import { CategoriesService } from '../../services/categories.service';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, DividerModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnInit {
  @Input() fullname = '';
  @Input() isLoggedIn = false;
  @Input() isAdmin = false;
  @Input() opened = false;
  @Output() itemClicked = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();
  @Output() login = new EventEmitter<void>();

  categories: Category[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private categoriesService: CategoriesService
  ) {}

  onItemClicked(path: string) {
    this.itemClicked.next(path);
  }
  onLogout() {
    this.logout.next();
  }
  onLogin() {
    this.login.next();
  }

  ngOnInit(): void {
    this.categoriesService
      .getAllCategories()
      .subscribe((t: any) => (this.categories = t));
  }
}
