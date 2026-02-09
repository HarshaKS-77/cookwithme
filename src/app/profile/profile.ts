import { Component, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Api } from '../services/api';

@Component({
  selector: 'app-profile',
  imports: [Header, Footer],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  token: any = ""
  downloadedRecipes: any = []
  constructor(private serviceApi: Api) { }
  ngOnInit(): void {
    this.token = sessionStorage.getItem("token")
    console.log(this.token);
    this.getDownloadedRecipe()
  }

  getDownloadedRecipe() {
    console.log("inside getDownloadedRecipe");
    this.serviceApi.getDownloadedRecipe().subscribe({
      next: (res: any) => {

        this.downloadedRecipes = res
        console.log(this.downloadedRecipes);
      },
      error: (err) => {
        console.log("error while gat recipes....", err);
      }
    })
  }


}
