export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: Status;
    periority: Priority;
  }
  
  export enum Status {
    TO_DO = 'to_do',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed'
  }
  
  export enum Priority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
  }
  