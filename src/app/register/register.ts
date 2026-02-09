import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { Api } from '../services/api';
// ReactiveFormsModule : 1) import
// form validation : 1) import Validators
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// routeImplimentation : 1 ) import Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  // ReactiveFormsModule : 1) import
  imports: [Header, Footer, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  // ReactiveFormsModule : 3)Creation of form Group
  registerForm: FormGroup

  // ReactiveFormsModule : 2) Dependancy injection of FormBuilder -  private fb: FormBuilder
  // routeImplimentation : 2) dependancy injection of router

  constructor(private serviceApi: Api, private fb: FormBuilder, private route: Router) {

    // ReactiveFormsModule : 4) creation of form Array
    //  (it must be inside the constructor or onInit method)

    this.registerForm = this.fb.group({
      // form validation : 2) applay it into form array Validators
      username: ["", [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    })
    // this.registerForm = this.fb.group({
    //   username: ['Harsha'],
    //   email: ['dkgdgu'],
    //   password: ['dfhfh']
    // })

  }
  // ReactiveFormsModule : 5) controll passes through Html page



  register() {

    const username = this.registerForm.value.username
    const email = this.registerForm.value.email
    const password = this.registerForm.value.password
    console.log(username, email, password);
    if (this.registerForm.valid) {
      this.serviceApi.registerApi({ username, email, password }).subscribe({
        next: (res: any) => {
          console.log(res);
          alert(res.message)
          // routeImplimentation : 3 ) set the navigation
          this.route.navigateByUrl('/login')

        },
        error: (err) => {
          console.log('registration error', err);
          alert(err.error.error)
        }
      })
    } else {
      alert('validation error')

    }



  }
}
