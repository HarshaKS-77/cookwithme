import { Component, OnInit } from '@angular/core';
import { Sidebar } from "../sidebar/sidebar";
import { Api } from '../../services/api';

@Component({
  selector: 'app-user-list',
  imports: [Sidebar],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  constructor(private serviceApi: Api) { }
  // empty array to hold user data
  users: any = []
  ngOnInit(): void {
    this.getAllUser()
  }

  getAllUser() {
    console.log("inside getAllUser");
    this.serviceApi.adminGetAllUserApi().subscribe({
      next: (res: any) => {
        console.log(res);
        this.users = res

      },
      error: err => {
        console.log(err);

      }
    })


  }

}
