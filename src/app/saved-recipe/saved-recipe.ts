import { Component, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Api } from '../services/api';

@Component({
  selector: 'app-saved-recipe',
  imports: [Header, Footer],
  templateUrl: './saved-recipe.html',
  styleUrl: './saved-recipe.css',
})
export class SavedRecipe implements OnInit {
  constructor(private serviceApi: Api) { }
  updatedToken: any = ""
  reqHeader: any = {}
  recipeSaved: any = {}

  ngOnInit(): void {
    const token = sessionStorage.getItem("token")
    console.log(token);
    // this.updatedToken = token
    this.reqHeader = {
      Authorization: `Bearer ${token}`
    }
    console.log(this.reqHeader);

    this.viewSavedRecipe()
  }

  viewSavedRecipe() {
    console.log("inside viewSavedRecipe");
    this.serviceApi.getSavedRecipeApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.recipeSaved = res
      },
      error: (err) => {
        console.log("error While fetching Data", err);

      }
    })

  }

  deleteSavedRecipe(id: any) {
    console.log(id);
    this.serviceApi.deleteSavedDataApi(id).subscribe({
      next: (res: any) => {
        console.log(res);
        alert(res.message)
        this.viewSavedRecipe()

      },
      error: (err) => {
        console.log(err);

      }
    })


  }

}
