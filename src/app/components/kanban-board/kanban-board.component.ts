import { Component, OnInit } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import {CdkDragDrop,CdkDrag,CdkDropList,moveItemInArray,transferArrayItem, CdkDropListGroup, } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AdminSideBarComponent } from '../admin-side-bar/admin-side-bar.component';
import { SideBarComponent } from '../side-bar/side-bar.component';

@Component({
  selector: 'app-kanban-board',
  imports: [CommonModule,CdkDrag,CdkDropList,CdkDropListGroup,AdminSideBarComponent,SideBarComponent],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.css'
})
export class KanbanBoardComponent implements OnInit{
  isAdmin:boolean=false;
  role:string='';
  To_Do:Task[]=[];
  In_Progress:Task[]=[];
  Completed:Task[]=[];
  pageNumber:number=0;
  pageSize:number=10;
  movedTask!:Task;
  private pressTimer: any; 
  private longPressThreshold = 500;
  taskColumns = ['To_Do', 'In_Progress', 'Completed'];

  constructor(private taskService:TaskService,private authService:AuthService){}

  ngOnInit(): void {
    this.loadTasks();
    this.getRole();
  }

  //to load tasks each on its array type
  loadTasks():void{
    this.taskService.getAllUserTasks(this.pageNumber,this.pageSize).subscribe({
      next:(response:any)=>{
        console.log("from kanban",response.data.content);
        const tasks = response.data.content; 
        tasks.forEach((task: any) => {
          if(task.status==="to_do"){
            this.To_Do.push(task);
            
          }
          else  if(task.status==="in_progress"){
            this.In_Progress.push(task);
            
          }
          else if(task.status==="completed"){
            this.Completed.push(task);
            
          }
        });
        console.log("to do",this.To_Do);
        console.log("in progress",this.In_Progress);
        console.log("completed",this.Completed);
       
      },
      error:(error:any)=>{

      }
    })
  }
    // to get each status tasks array
    getColumnTasks(column: string): Task[] {
      switch (column) {
        case 'To_Do':
          return this.To_Do;
        case 'In_Progress':
          return this.In_Progress;
        case 'Completed':
          return this.Completed;
        default:
          return [];
      }
    }
    //to drag and drop task within the same container of different
  drop(event: CdkDragDrop<Task[]>, column: string): void {
    if (event.previousContainer===event.container){
      moveItemInArray(event.container.data,event.previousIndex,event.currentIndex)
    }
    else if (event.previousContainer !== event.container) {
      let newStatus: string;
      if (column === 'To_Do') {
        newStatus = 'to_do';
      } else if (column === 'In_Progress') {
        newStatus = 'in_progress';
      } else if (column === 'Completed') {
        newStatus = 'completed';
      } else {
        return; 
      }      
        this.taskService.updateTaskStatus(this.movedTask.id, newStatus).subscribe({
        next: (response: any) => {
          transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
            console.log('Task status updated successfully');
        },
        error: (error: any) => {
          console.error('Error updating task status', error);
        },
      });
    }
  }
  
  //to get ckicked task
  onMouseDown(task: Task): void {
    this.pressTimer = setTimeout(() => {
    this.movedTask=task
    }, this.longPressThreshold);
  }

  onMouseUp(): void {
    clearTimeout(this.pressTimer);
  }
  //to show side bar
  getRole(){
    this.role=this.authService.getRole();
    console.log("role",this.role);
    if(this.role==="admin"){
          
      this.isAdmin=true;
      console.log("role in kanban",this.isAdmin);
      
    }
    else{
      console.log("role in kanban",this.isAdmin);

      this.isAdmin=false;
    }
}
  
}
