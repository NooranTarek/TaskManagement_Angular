import { Component } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  imports: [RouterLink],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
tasks:Task []=[];

constructor(private taskService:TaskService ){}
ngOnInit(){
  this.loadTasks();
}

loadTasks():void{
this.taskService.getAllTasks().subscribe((response:any)=>{
console.log(response);
this.tasks=response.data;

})
}
}
