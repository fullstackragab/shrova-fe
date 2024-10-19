import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { tap } from 'rxjs';
import { Category } from '../../data/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-categories-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './categories-menu.component.html',
  styleUrl: './categories-menu.component.css',
})
export class CategoriesMenuComponent implements OnInit {
  categoryId!: number;
  categories: Category[] = [];
  constructor(
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap((params) => {
          console.log(params);
          this.categoryId = params['categoryId'];
        })
      )
      .subscribe();
    this.categoriesService
      .getAllCategories()
      .subscribe((t: any) => (this.categories = t));
  }
}
