import { Component } from '@angular/core';
import { Sidebar } from "../sidebar/sidebar";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  imports: [Sidebar,RouterLink],
  templateUrl: './dashbord.html',
  styleUrl: './dashbord.css',
})
export class Dashbord {

}
