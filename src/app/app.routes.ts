import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { UserTasksComponent } from './components/user-tasks/user-tasks.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { AdminSideBarComponent } from './components/admin-side-bar/admin-side-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent
    }
    ,
    {
        path:"user-tasks",
        component:UserTasksComponent
    },
    {
        path:"register",
        component:SignUpComponent
    },
    {
        path:"login",
        component:SignInComponent
    },
    {
        path:"add-task",
        component:AddTaskComponent
    },
    {
        path:"admin",
        component:AdminSideBarComponent
    },
    {
        path:"**",
        component:NotFoundComponent
    }
];
