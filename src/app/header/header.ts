import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  isLoggin: Boolean = false
  constructor(private router: Router) { }
  logUser: any = {}
  ngOnInit(): void {
    if (sessionStorage.getItem('token') && JSON.parse(sessionStorage.getItem('userData') || "")) {
      this.isLoggin = true
      this.logUser = JSON.parse(sessionStorage.getItem("userData") || '')
    }
  }

  logOut() {
    sessionStorage.clear()
    this.router.navigateByUrl('/')
  }

}
