import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-login',
  imports: [Header, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
