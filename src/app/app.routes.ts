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
        path: 'saved-recipies', component: SavedRecipe
    },
    {
        path: 'view-recipie', component: ViewRecipe
    },
    {
        path: 'profile', component: Profile
    },
    {
        path: '**', component: Pnf
    },
];
