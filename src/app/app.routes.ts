import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    }
    ,
    {
        path:"tasks",
        component:TasksComponent
    },
    {
        path:"register",
        component:SignUpComponent
    },
    {
        path:"login",
        component:SignInComponent
    }
];
