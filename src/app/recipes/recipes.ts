import { Component, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Api } from '../services/api';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-recipes',
  imports: [Header, Footer, NgxPaginationModule],
  templateUrl: './recipes.html',
  styleUrl: './recipes.css',
})
export class Recipes implements OnInit {

  // 1) dependancy injection
  constructor(private serviceApi: Api, private router: Router) { }

  // create an empty array
  allRecipes: any = []
  updatedToken: any = ""
  header: any = {}
  p: number = 1; // for  pagination
  cuisineType: any = [] // array to hold cuisine Type
  NestedMealType: any = [] // array to hold meal type from the response. But it in nessted array form
  singleDuplicatedMealType: any = [] // array to hold the meal type after breake tthe nested array. it hold in single array formt but with duplicate data.
  mealtype: any = [] // array to hold data  after removing the duplicate data from the previous array.

  // temporary array to hold the data from the response  
  temparray: any = []


  ngOnInit(): void {
    const token = sessionStorage.getItem("token")
    console.log(token);
    this.updatedToken = token?.replace(/"/g, "")
    console.log(this.updatedToken);
    this.header = {
      Authorization: `Bearer ${this.updatedToken}`

    }

    console.log(this.header);

    this.getAllRecipes()

  }
  // create a method to get all recipes
  getAllRecipes() {
    this.serviceApi.getAllRecipeApi(this.header).subscribe({
      next: (res: any) => {
        // console.log(res);
        this.allRecipes = res
        this.temparray = res

        console.log("all Recipes", this.allRecipes);

        // to get all cuisine type 
        this.allRecipes.forEach((item: any) => {
          !this.cuisineType.includes(item.cuisine) && this.cuisineType.push(item.cuisine)

        });
        console.log(this.cuisineType);

        // to get meal type. but it get in the nested array form. so we need to convert it into single array
        this.allRecipes.forEach((item: any) => {
          this.NestedMealType.push(item.mealType)
        });
        console.log(this.NestedMealType);

        // we convert the nestedMealType array into a single array format using flat method. even though we get duplicated data.
        this.singleDuplicatedMealType = this.NestedMealType.flat()
        console.log(this.singleDuplicatedMealType);
        // we need to remove the duplicated data from the array. so we need to map it.
        this.singleDuplicatedMealType.map((item: any) => {
          !this.mealtype.includes(item) && this.mealtype.push(item)

        })
        console.log(this.mealtype);



      },
      error: (err) => {
        console.log(err);

      }
    })

  }

  viewARecipe(id: any) {
    console.log(id);
    this.router.navigateByUrl(`/view-recipie/${id}`)

  }

  filterRecipe(type: any, event: Event) {
    const value = (event.target as HTMLSelectElement).value
    console.log(type, value);
    this.allRecipes = this.temparray.filter((item:any)=>item[type].includes(value))
    console.log(this.allRecipes);   

  }

 
}
