export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: Status;
    periority: Periority;
  }
  
  export enum Status {
    TO_DO = 'to_do',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed'
  }
  
  export enum Periority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
  }
  