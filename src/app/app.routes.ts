import { Routes } from '@angular/router';
import { LandigPage } from './landig-page/landig-page';
import { Pnf } from './pnf/pnf';
import { Register } from './register/register';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Recipes } from './recipes/recipes';
import { SavedRecipe } from './saved-recipe/saved-recipe';
import { ViewRecipe } from './view-recipe/view-recipe';
import { Profile } from './profile/profile';
import { Login } from './login/login';

export const routes: Routes = [

    //lazy loadded module :  // http://localhost:4200/admin/
    {
        path: 'admin',loadChildren:()=>import('./admin/admin-module').then(m=>m.AdminModule)
    },

    {
        path: '', component: LandigPage
    },
    {
        path: 'login', component: Login
    },
    {
        path: 'register', component: Register
    },
    {
        path: 'about', component: About
    },
    {
        path: 'contact', component: Contact
    },
    {
        path: 'all-recipes', component: Recipes
    },
    {
        path: 'Saved-recipies', component: SavedRecipe
    },
    {
        path: 'view-recipie/:id', component: ViewRecipe
    },
    {
        path: 'profile', component: Profile
    },
    {
        path: '**', component: Pnf
    },
];
