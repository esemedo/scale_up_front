import React from 'react';
import { useEffect, useState } from 'react';

interface TaskData {
    id: number;
    name: string;
    createdAt: String;
    file: string;
    status: boolean; 
}

const TaskCard: React.FC<TaskData> = ({  name, createdAt, file, status }) => {
    const statusColor = status ? 'green-500' : 'red-500';   
    const icon = status ? '✅' : '⏰';

  return (
    <div className={`flex items-center p-4 m-2 border rounded-lg border-${statusColor} bg-white shadow`}>
      <div className={`text-${statusColor} text-lg mr-4`}>{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p>Date d'échéance : {createdAt}</p>
        <p>Description: {file}</p>
      </div>
    </div>
  );
};
const Dashboard: React.FC = () => {

    const [tasks, setTasks] = useState<TaskData[]>([

    { id: 1, name: 'Task:9000', createdAt: '2021-09-01', file: 'Fichier', status: true },
    { id: 2, name: 'Task:9001', createdAt: '2021-09-02', file: 'Fichier', status: false },
    { id: 3, name: 'Task:9002', createdAt: '2021-09-03', file: 'Fichier', status: true },
    { id: 4, name: 'Task:9003', createdAt: '2021-09-04', file: 'Fichier', status: false },
    { id: 5, name: 'Task:9004', createdAt: '2021-09-05', file: 'Fichier', status: true },
    { id: 6, name: 'Task:9005', createdAt: '2021-09-06', file: 'Fichier', status: false },
    { id: 7, name: 'Task:9006', createdAt: '2021-09-07', file: 'Fichier', status: true },
    { id: 8, name: 'Task:9007', createdAt: '2021-09-08', file: 'Fichier', status: false },
  

  ])


    
  
    // useEffect(() => {
    //   const fetchData = async () => {
    //     try {
    //       const response = await fetch('https://3000/tasks');//mettre bon endpoint
    //       const data: TaskData[] = await response.json();
    //       setTasks(data);
    //           } catch (error) {
    //             console.error('erreur :', error);
    //           }
    //         };
    //   fetchData();
    // }, []);
  
    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-xl font-semibold mb-6">Mes tâches</h1>
            {tasks.map(task => (
                <TaskCard
                            key={task.id}
                            name={task.name}
                            createdAt={task.createdAt}
                            file={task.file}
                            status={task.status} id={0}          />
            ))}
        </div>
    );
  };
  
  export default Dashboard;