import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Periority, Status } from '../../interfaces/task';
import { Role } from '../../interfaces/user';

@Component({
  selector: 'app-filter-data',
  imports: [NgFor,FormsModule],
  templateUrl: './filter-data.component.html',
  styleUrl: './filter-data.component.css'
})
export class FilterDataComponent {
  @Input() data:any[]=[];
  @Input() filteredFields:any[]=[];
  @Output() filteredData= new EventEmitter<any[]>();;
  periorityOptions = Object.values(Periority);
  statusOptions = Object.values(Status);
  roleOptions=Object.values(Role);
  filterValue:string='';
  selectedField: string = '';
  applyFilter(){
    console.log("selected field",this.selectedField);
    if (!this.selectedField) {
      this.filteredData.emit(this.data);
      return;
    }
    const filterValueLower=this.filterValue.toLowerCase();
    const outputFilteredData = this.data.filter(item =>
      item[this.selectedField]?.toString().toLowerCase().includes(filterValueLower)
    );
    
    this.filteredData.emit(outputFilteredData);

  }


}
