import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Api } from '../services/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Header, Footer, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginUser: FormGroup
  constructor(private fb: FormBuilder, private serviceApi: Api, private router: Router) {
    this.loginUser = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    })

  }

  login() {
    const email = this.loginUser.value.email
    const password = this.loginUser.value.password
    console.log(email, password);
    if (this.loginUser.valid) {
      this.serviceApi.loginApi({ email, password }).subscribe({
        next: (res: any) => {
          console.log(res);
          // set the token into local storage 
          const token = res.token
          sessionStorage.setItem("token", token)
          sessionStorage.setItem("userData",JSON.stringify(res.existingUser))
          alert(res.message)
          if (res.existingUser.role == "Admin") {
            this.router.navigateByUrl("/admin")
          } else {
            this.router.navigateByUrl("/")

          }
        },
        error: (err) => {
          console.log("Login error", err);
          alert(err.error.message)
        }
      })

    } else {
      alert('validation error')
    }

  }

}
