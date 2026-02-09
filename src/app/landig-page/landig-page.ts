import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-landig-page',
  imports: [MatButtonModule, MatDividerModule, MatIconModule, Header, Footer, RouterLink],
  templateUrl: './landig-page.html',
  styleUrl: './landig-page.css',
})
export class LandigPage {

}
