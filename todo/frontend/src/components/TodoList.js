import React, {useState} from 'react';
import CreateTask from '../modals/CreateTask'
import TodoCard from './TodoCard'
const TodoList = ({itemList}) => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState(itemList);

    const baseURL = 'http://localhost:8000/api/todos';

    const POST = (task) => {
        const isCompleted = task['TaskCompleted'] === 'True' ? true : false
        console.log(task)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                TaskId: 9,
                TaskName: task["TaskName"],
                TaskCompleted: isCompleted,
                TaskDescription: task["TaskDescription"]
            })
        };
        fetch(`${baseURL}`, requestOptions)
            .then(() => window.location.reload())
    }

    const PUT = (title, id, taskCompleted, description) => {
        console.log(taskCompleted)

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                TaskId: id,
                TaskName: title,
                TaskCompleted: taskCompleted,
                TaskDescription: description,
            })
        };
        fetch(`${baseURL}`, requestOptions)
             .then((result) => window.location.reload())
    }

    const DELETE = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`${baseURL}/${id}`, requestOptions)
            .then((result) => window.location.reload())
    }

    const completeTask = (item) => {
        let title = item.TaskName
        let id = item.TaskId
        let completed = !item.TaskCompleted
        let description = item.TaskDescription
        PUT(title, id, completed, description)
      }

    
    const deleteTask = (id) => {
        DELETE(id);
    }

    const toggle = () => {
        setModal(!modal);
    }

    const addTask = (taskObj) => {
        let tempList = taskList
        tempList.push(taskObj)
        POST(taskObj)
        setTaskList(tempList)
        setModal(false)
    }

    const updateTask = (item) => {
        let id = item.TaskId
        let title = item.TaskName
        let completed = item.TaskCompleted
        let description = item.TaskDescription
        PUT(title, id, completed, description)
    }



    return (
        <>
            <div className="header text-center">
                <h3>Todo List</h3>
                <button className="btn btn-primary mt-2" onClick= {() => setModal(true)}>Create Task</button>
            </div>
            <div className="task-container">
                {taskList.map((item) => (
                    <div key={item.TaskId}>
                        {console.log(item.TaskName)}
                        <TodoCard updateTask={updateTask} addTask={addTask} completeTask={completeTask} deleteTask={deleteTask} item={item} />
                    </div>
                ))}
            </div>
            <CreateTask addTask={addTask} toggle = {toggle} modal = {modal}/> 
        </>

    );
};

export default TodoList;