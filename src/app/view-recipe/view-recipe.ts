import { Component, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Api } from '../services/api';
import { HttpHeaders } from '@angular/common/http';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'



@Component({
  selector: 'app-view-recipe',
  imports: [Header, Footer, RouterLink],
  templateUrl: './view-recipe.html',
  styleUrl: './view-recipe.css',
})
export class ViewRecipe implements OnInit {
  //ActivatedRoute for take id from the url 
  constructor(private ar: ActivatedRoute, private serviceApi: Api, private router: Router) { }

  recipeId: any = ""
  recipe: any = {}
  relatedRecipe: any = []
  reqHeader: any = {}
  updatedToken: any = ""



  ngOnInit(): void {
    this.ar.params.subscribe(res => {
      console.log(res);
      const { id } = res
      this.recipeId = id
      console.log(id);
      const token = sessionStorage.getItem("token")
      console.log(token);
      this.updatedToken = token?.replace(/"/g, "")
      this.reqHeader = {
        Authorization: `Bearer ${this.updatedToken}`
      }


      this.viewRecipe()
    })

  }
  viewRecipe() {
    this.serviceApi.getARecipeApi(this.recipeId, this.reqHeader).subscribe({
      next: (res: any) => {
        console.log(res);
        this.recipe = res
        console.log(res.cuisine);
        this.viewRelatedRecipe(res.cuisine)
      },
      error: err => {
        console.log("error", err);

      }
    })


  }

  viewRelatedRecipe(cuisine: any) {
    this.serviceApi.getRelatedRecipeApi(cuisine, this.reqHeader).subscribe({
      next: (res: any) => {
        console.log(res);
        this.relatedRecipe = res
        console.log(this.relatedRecipe);

      },
      error: err => {
        console.log("error", err);

      }
    })
  }

  viewARelatedRecipe(id: any) {
    console.log(id);
    this.router.navigateByUrl(`/view-recipie/${id}`)

  }

  saveRecipe(id: any, name: any, image: any) {
    console.log(id);
    const reqBody = {
      name,
      image
    }

    this.reqHeader = new HttpHeaders({
      Authorization: `Bearer ${this.updatedToken}`

    })
    console.log(reqBody);
    this.serviceApi.saveRecipeApi(id, this.reqHeader, reqBody).subscribe({
      next: (res: any) => {
        console.log(res);
        alert(res.message)
      },
      error: (err) => {
        console.log("error While Saving", err);
        alert(err.error.error)

      }
    })
  }

  addToDownloadRecipe(id: any, recipe: any) {
    console.log(id, recipe);
    this.serviceApi.addToDownloadrecipeApi(id, recipe).subscribe({
      next: (res: any) => {
        console.log(res);
        alert("recipe downloaded....")
        this.generatePdf()

      },
      error: (err) => {
        console.log("error while add to downloads", err);

      }
    })

  }
  generatePdf() {
    const pdf = new jsPDF()
    //For styling
    pdf.setFontSize(16)
    pdf.setTextColor("red")
    pdf.text(this.recipe.name, 10, 10)
    pdf.setFontSize(12)
    pdf.setTextColor("black")
    //pdf contents
    pdf.text(`Cuisine : ${this.recipe.cuisine}`, 10, 20)
    pdf.text(`Servings : ${this.recipe.servings}`, 10, 25)
    pdf.text(`Mode of Cooking : ${this.recipe.difficulty}`, 10, 30)
    pdf.text(`Total Preparation Time : ${this.recipe.prepTimeMinutes} Minutes`, 10, 35)
    pdf.text(`Total Cooking Time : ${this.recipe.cookTimeMinutes} Minutes`, 10, 40)
    pdf.text(`Total Calorie Per Servings : ${this.recipe.caloriesPerServing}`, 10, 45)
    //Table creation
    let head = [['Ingredients Needed', 'Cooking Instructions']]
    let body = []

    body.push([this.recipe.ingredients, this.recipe.instructions])
    //table generation
    autoTable(pdf, { head, body, startY: 50 })

    pdf.output('dataurlnewwindow')
    pdf.save('download-recipe.pdf')
  }


}



