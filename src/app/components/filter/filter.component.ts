import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { TreeModule } from 'primeng/tree';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { first } from 'rxjs';
import { DEBOUNCE_TIME } from '../../data/constants';
import { CategoriesService } from '../../services/categories.service';

export interface Filter {
  title: string;
  description: string;
  categories: number[];
}

export const EmptyFilter: Filter = {
  title: '',
  description: '',
  categories: [],
};

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CheckboxModule,
    DividerModule,
    TreeModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  filterObj: Filter = { ...EmptyFilter };
  @Output() filter = new EventEmitter<Filter>();
  @Output() close = new EventEmitter<void>();
  categories: any[] = [];
  selectedCategories: any;

  constructor(
    private searchService: SearchService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    console.log('[FilterComponent] ngOnInit() at ' + new Date());
    this.categoriesService.getAllCategories().subscribe((t: any) => {
      this.categories = t?.map((a: any) => ({ key: a.id, label: a.title }));
    });
    this.searchService.search.pipe(first()).subscribe((t) => {
      switch (t.key) {
        case 'title':
          this.filterObj.title = t.value;
          break;

        case 'description':
          this.filterObj.description = t.value;
          break;
      }

      if (t) this.filter.next(this.filterObj);
    });
  }

  onCategoryChange() {
    this.filterObj.categories = this.selectedCategories?.map((t: any) => t.key);
    this.filter.next(this.filterObj);
  }

  onDone() {
    this.close.next();
  }

  titleTOH: any;
  onTitleIncludes() {
    if (this.titleTOH) clearTimeout(this.titleTOH);
    this.titleTOH = setTimeout(() => {
      this.filter.next(this.filterObj);
    }, DEBOUNCE_TIME);
  }

  descriptionTOH: any;
  onDescriptionIncludes() {
    if (this.descriptionTOH) clearTimeout(this.descriptionTOH);
    this.descriptionTOH = setTimeout(() => {
      this.filter.next(this.filterObj);
    }, DEBOUNCE_TIME);
  }

  categoriesTOH: any;
  onCategoriesIncludes() {
    if (this.categoriesTOH) clearTimeout(this.categoriesTOH);
    this.categoriesTOH = setTimeout(() => {
      this.filter.next(this.filterObj);
    }, DEBOUNCE_TIME);
  }

  onClearTitle() {
    (this.filterObj.title = ''), this.filter.next(this.filterObj);
  }

  onClearDescription() {
    (this.filterObj.description = ''), this.filter.next(this.filterObj);
  }

  onClearCategories() {
    (this.filterObj.categories = []), this.filter.next(this.filterObj);
  }

  onClearFilter() {
    this.selectedCategories = undefined;
    this.filterObj = { ...EmptyFilter };
    this.filter.next(this.filterObj);
  }
}
