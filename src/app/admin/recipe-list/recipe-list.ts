import { Component, OnInit } from '@angular/core';
import { Sidebar } from "../sidebar/sidebar";
import { Api } from '../../services/api';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module

@Component({
  selector: 'app-recipe-list',
  imports: [Sidebar, NgxPaginationModule],  // <-- include it in your app module
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList implements OnInit {
  constructor(private serviceApi: Api) { }
  // array to store recipe deta
  recipes: any = []
  p: number = 1;

  ngOnInit(): void {
    this.getAllRecipe()

  }

  // function for get all recipes
  getAllRecipe() {
    console.log('inside get all reacipes');
    this.serviceApi.adminGetAllRecipeApi().subscribe({
      next: (res: any) => {
        this.recipes = res
        console.log(this.recipes);



      },
      error: err => {
        console.log(err);

      }
    })
  }

  // function for delete Recipe
  deleteRecipe(id: any) {
    console.log(id);
    this.serviceApi.adminDeleteRecipeApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.getAllRecipe()


      },
      error: err => {
        console.log(err);

      }
    })

  }
}
