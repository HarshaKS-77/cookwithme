import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-register',
  imports: [Header, Footer],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

}
