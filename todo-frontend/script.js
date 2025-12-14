// Shared script for login, register, and todos pages
const SERVER_URL = "http://localhost:1309";
const token = localStorage.getItem("token");

// Login page logic
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${SERVER_URL}/auth/login`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({email, password})
    }).then((res)=>{
        const data = res.json();
        if(!res.ok) throw new Error(data.message || 'login Failed');
        return data;
    }).then((data)=>{
        localStorage.setItem("token",data.token);
        window.location.href="todos.html";
    }).catch((err)=>{
        alert(err.message);
    })
}

// Register page logic
function register() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch(`${SERVER_URL}/auth/register`,{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({email, password})
    }).then((res) =>{
        if(res.ok){
            alert("Register Successful, Redirecting to login page..");
            window.location.href="login.html"
        }
        else{
            return res.json().then((data) => {throw new Error(data.message || 'Registration Failed')});
        }
    }).catch((err)=>{
        alert(err.message);
    })
}

// Todos page logic
function createTodoCard(todo) {
    const card = document.createElement("div");
    card.className = "todo-card";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;
    checkbox.addEventListener("change",function(){
        const updateTodo = {...todo, isCompleted : checkbox.checked};
        updateTodoStatus(updateTodo);
    });

    const span = document.createElement("span");
    span.textContent = todo.title;

    if(todo.isCompleted){
        span.style.textDecoration = "line-through";
        span.style.color = "blue";
    }

    const deleteItem = document.createElement("button");
    deleteItem.textContent = "X";
    deleteItem.onclick = function(){
        deleteTodo(todo.id);
    }

    card.appendChild(checkbox);
    card.appendChild(span);
    card.appendChild(deleteItem);
    return card;
}

function loadTodos() {
    if(!token){
        alert("Please login First");
        window.location.href = "login.html";
        return;
    }

     fetch(`${SERVER_URL}/todos`,{
        method:"GET",
        headers:{
            Authorization : `Bearer ${token}`
        }
    })
    .then((res)=>{
        if(!res.ok) throw new Error(data.message || "Failed to add todo");
        return res.json();
    })
    .then((todos)=>{
        const todoList = document.getElementById("todo-list");
        todoList.innerHTML = "";

        if(!todos || todos.length === 0){
            todoList.innerHTML = '<p id="empty-message">No todos yet. Add todos</p>'
        }
        else{
            todos.forEach(todo => {
                todoList.append(createTodoCard(todo));
            });
        }
    })
    .catch((err) => {
        document.getElementById("todo-list").innerHTML = '<p style="color:red">Failed to load Todos</p>'
    })

}

function addTodo() {
    const input = document.getElementById("new-todo");
    const todoText = input.value.trim();

    if(!todoText){
        alert("Todo can't be empty")
        return;
    }

    const todoObj = {
        title:todoText,
        isCompleted: false
    };

    fetch(`${SERVER_URL}/todos/create`,{
        method:"POST",
        headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body : JSON.stringify(todoObj)
    })
    .then((res)=>{
        const data = res.json();
        if(!res.ok) throw new Error(data.message || "Failed to add todo");
        return data;
    })
    .then(()=>{
        input.value = "";
        loadTodos();
    })
    .catch((err) => {
        alert(err.message);
    })
}

function updateTodoStatus(todo) {
    fetch(`${SERVER_URL}/todos/update`,{
        method:"PUT",
        headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
        },
        body: JSON.stringify(todo)
    })
    .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Update failed");
        return data;
    })
    .then(() => loadTodos())
    .catch((err) => alert(err.message));
}

function deleteTodo(id) {
    fetch(`${SERVER_URL}/todos/delete/${id}`,{
        method:"DELETE",
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((res)=>{
        if(!res.ok) throw new Error(data.message || "Failed to delete todo");
        return res.text();
    })
    .then(() => loadTodos())
    .catch((err)=>{
        alert(err.message);
    })
}

// Page-specific initializations
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("todo-list")) {
        loadTodos();
    }
});
