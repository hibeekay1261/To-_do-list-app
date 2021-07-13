'use strict';

// const num1 = 100;
// const num2 = 50;
// let val;

// console.log(val);
// val = Math.PI;
// val = Math.E;
// val = Math.round(2, 4);
// val = Math.ceil(2, 4);
// val = Math.floor(2, 8);
// val = Math.sqrt(64);
// val = Math.abs(-3);
// val = Math.pow(8, 2);
// val = Math.min(2, 33, 1, 4, 55, 6, -2);
// val = Math.max(2, 33, 1, 4, 55, 6, -2);
// val = Math.random();
// val = Math.floor(Math.random() * 20 + 1);

// console.log(val);

// // concatenation

// const firstName = 'William';
// const lastName = 'Johnson';
// const age = 36;
// const str = 'Hello there, My name is Ibukun';
// const tag = 'Web development,web development, programming';

// // let val;

// // val = firstName + lastName;

// // val = firstName + '' + lastName;

// // append

// // val = 'Brad ';
// // val += 'Traversy';\

// val = 'Hello, my name is ' + firstName + ' and i am ' + age;


// // length
// val = firstName.length;

// // concat
// val = firstName.concat(" ", lastName);

// // change case
// val = firstName.toUpperCase();
// val = firstName.toLowerCase();

// val = firstName[4];
// // indexof()
// val = firstName.indexOf('l');
// val = firstName.lastIndexOf('l');

// // charAt()
// val = firstName.charAt('2');

// // Get last char

// val = firstName.charAt(firstName.length - 1);

// // Substring

// val = firstName.substring(0, 4);

// // slice()
// val = firstName.slice(0, 4);
// val = firstName.slice(-3);

// // split
// val = str.split(" "),
// val = tag.split(', ');

// // replace
// val = str.replace("Ibukun", "Jeremiah");

// // // include()
// // val = str.includes('Hello');



// // console.log(val);


// // Template literals

// const name = 'Ibukun';


// const age = 30;
// const job = 'Web Developer';
// const city = 'Lagos';

// // without tempate strings es(5)

// html = '<ul>' + 
//         '<li>Name: ' + name + '</li>' +
//         '<li>Name: ' + age + '</li>' +
//         '<li>Name: ' + job + '</li>' +
//         '<li>Name: ' + city + '</li>';


//         // with template string

// html = `
//     <ul>
//         <li>Name: ${name}</li>
//         <li>Age: ${age}</li>
//         <li>Job: ${job}</li>
//         <li>City: ${city}</li>
//     </ul>
// `;
    

// document.body.innerHtml = html;


// const tasklist = document.getElementById('.row');

// console.log(document.getElementById('main').className)
// // change styling
 

// TO DO APP PROJECT//
// DEFININ UI VARS
const form = document.querySelector("#task-form");
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// load all event listerners

loadEventListeners();

// load all event listerners



function loadEventListeners() {
    // DOM LOAD Event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Task Event
   form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);

    // clear Task Event
    clearBtn.addEventListener('click', clearTasks);
    // filter TAsk Event
    filter.addEventListener('keyup', filterTasks);
}

// Get tasks from Ls
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        
    // create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';

    // create text node and append to li

    li.appendChild(document.createTextNode(task));
    // Create New link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class = "fa fa-times"></i>';
    // Append the link to li
    li.appendChild(link);

    
    // append li to ul
    taskList.appendChild(li);

    })

}

// Add Task
function addTask(e){
    if(taskInput.value === '') {
        alert('Add a task');
    }

    // create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';

    // create text node and append to li

    li.appendChild(document.createTextNode(taskInput.value));
    // Create New link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class = "fa fa-times"></i>';
    // Append the link to li
    li.appendChild(link);

    
    // append li to ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    e.preventDefault();
}

// store TAsk
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove Task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are You Sure?')) {
            e.target.parentElement.parentElement.remove();

            // remove from ls
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
    
}
// remove from ls
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
            
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// CLEAR TASKS
function clearTasks() {
    // taskList.innerHTML = '';

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
// clear task from ls
clearTasksfromLocalStorage();
}

// clear Tasks from Ls
function clearTasksfromLocalStorage(){
    localStorage.clear();
}

 
// filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';  
        } else {
            task.style.display = 'none';
        }
    });
}