import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import Card from "./Card";

const Header = () => {

    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    useEffect(() => {
        let arr = localStorage.getItem("taskList");
        if (arr) {
            let obj = JSON.parse(arr);
            setTaskList(obj);
        }
    }, []) //The [] Makes the useEffect run only once on the first render of the component and not on every re-render
    const toggle = () => setModal(!modal);
    const addTask = (task) => {
        let tempList = taskList;
        tempList.push(task);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(taskList);
        setModal(false);
    }
    const deleteTask = (index) => {
        let tempList = taskList
        tempList.splice(index, 1)
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }
    const updateListArray = (obj, index) => {
        let tempList = taskList
        tempList[index] = obj
        localStorage.setItem("taskList", JSON.stringify(tempList))
        setTaskList(tempList)
        window.location.reload()
    }

    return (
        <>
            <div className="header text-center">
                <h3>To-Do List</h3>
                <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>Create Task</button>
            </div>
            <div className="task-container">
                {taskList && taskList.map((obj, index) => 
                    <Card key={ index } taskObj={ obj } index={ index } deleteTask = { deleteTask } updateListArray = { updateListArray }/>
                )}
            </div>
            <CreateTask toggle={ toggle } modal={ modal } save={ addTask }/>
        </>
    );
}

export default Header;