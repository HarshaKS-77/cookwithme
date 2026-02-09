import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  constructor(private http: HttpClient) { }
  serverUrl = 'https://cookbackend-eoq3.onrender.com'
  // a function to append token to the header
  appendToken() {
    let headers = new HttpHeaders
    const token = sessionStorage.getItem('token')
    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`)
    }
    return { headers }

  }

  // user side
  registerApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/api/register`, reqBody)

  }
  loginApi(reqBody: any) {
    return this.http.post(`${this.serverUrl}/api/login`, reqBody)

  }

  getAllRecipeApi(headers: HttpHeaders) {
    return this.http.get(`${this.serverUrl}/api/getALlRecipe`, { headers })
  }

  getARecipeApi(id: any, headers: HttpHeaders) {
    return this.http.get(`${this.serverUrl}/api/getARecipe/${id}`, { headers })
  }

  getRelatedRecipeApi(cuisine: any, headers: HttpHeaders) {
    return this.http.get(`${this.serverUrl}/api/getRelatedRecipe?cuisine=${cuisine}`, { headers })
  }

  saveRecipeApi(id: any, headers: HttpHeaders, reqBody: any) {
    return this.http.post(`${this.serverUrl}/api/saveRecipe/${id}`, reqBody, { headers })
  }

  getSavedRecipeApi() {
    return this.http.get(`${this.serverUrl}/api/getsavedRecipe`, this.appendToken())
  }

  deleteSavedDataApi(id: any) {
    return this.http.delete(`${this.serverUrl}/api/deleteSavedRecipe/${id}`, this.appendToken())
  }

  addToDownloadrecipeApi(id: any, reqBody: any) {
    return this.http.post(`${this.serverUrl}/api/downloadRecipe/${id}`, reqBody, this.appendToken())

  }
  getDownloadedRecipe() {
    return this.http.get(`${this.serverUrl}/api/GetDownloadRecipe`, this.appendToken())
  }

  // admin side 

  adminGetAllRecipeApi() {
    return this.http.get(`${this.serverUrl}/api/adminGetAllRecipe`, this.appendToken())
  }
  adminGetAllUserApi() {
    return this.http.get(`${this.serverUrl}/api/adminGetAllUsers`, this.appendToken())
  }
  adminDeleteRecipeApi(id: any) {
    return this.http.delete(`${this.serverUrl}/api/admindeleteRecipe/${id}`, this.appendToken())
  }


}
