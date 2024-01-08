import { Component, EventEmitter } from '@angular/core';
import {Router} from "@angular/router";
import {Category} from "../../../shared/models/category.model";
import {CategoryService} from "../../../services/category.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.scss']
})
export class ManageCategoriesComponent {
  categoriesChanged = new EventEmitter<Category[]>();
  categories: Category[] = [];
  editMode: boolean;
  categoryId: string;

  constructor(private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  public getCategories() {
    this.categoryService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      }
    );
  }


  addCategory(form: NgForm) {
    this.categoryService.makeNewCategory(form.value).subscribe(
      (res) => {
        this.ngOnInit();
      }
    );
    this.ngOnInit()
  }

  onDeletionCategory(categoryId: string) {
    this.categoryService.deleteCategory(categoryId).subscribe(
      (res) => {
        this.ngOnInit();
      }
  );
  }

  editCategory(categoryId: string, form: NgForm) {
    this.categoryService.updateCategory(categoryId, form.value).subscribe(
      (res) => {
        this.ngOnInit()
        this.editMode = false;
      }
    );
  }
}
