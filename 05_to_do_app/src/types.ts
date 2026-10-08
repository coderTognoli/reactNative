// Definir os tipos de dados das tarefas (Task)
export type Task = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
}

// Tipos de filtros (todas, pendentes, completas)
export type Filter = 'all' | 'pending' | 'completed'

