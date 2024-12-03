import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { UserTasksComponent } from './components/user-tasks/user-tasks.component';
import { UpdateTaskComponent } from './components/update-task/update-task.component';
import { AdminSideBarComponent } from './components/admin-side-bar/admin-side-bar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AllTasksComponent } from './components/all-tasks/all-tasks.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { routesGuard } from './guards/routes.guard';

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
        path:"all-tasks",
        component:AllTasksComponent,
        canActivate:[routesGuard]
    },
    {
        path:"all-users",
        component:AllUsersComponent,
        canActivate:[routesGuard]

    },
    {
        path:"forbidden",
        component:ForbiddenComponent
    },
    {
        path:"**",
        component:NotFoundComponent
    }
];
