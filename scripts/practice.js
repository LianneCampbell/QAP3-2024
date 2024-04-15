/***Question 1***/
// Function to create a new user object
function User(n, a) {
    this.name = n;
    this.age = a;
}

// Array to store user objects
let users = [];

// Function to create a new user object
function makeObj() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let user = new User(name, age);
    users.push(user);
    // Clear input fields after storing user information
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
}

// Function to display all user objects
function displayObj() {
    let output = "Users:\n";
    users.forEach(function(user, index) {
        output += `User ${index + 1}: Name - ${user.name}, Age - ${user.age}\n`;
    });
    // Display all user information
    document.getElementById("output").innerText = output;
}

// Adding event listeners to buttons
document.getElementById("makeObjBtn").addEventListener("click", makeObj);
document.getElementById("display").addEventListener("click", displayObj);

/***Question 2***/
function showJSON() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "../data/user.json", true);
    xhr.onload = function() {
        if (xhr.status == 200) {
            try {
                let user = JSON.parse(xhr.responseText);
                let output = "<ul>";
                for (let key in user) {
                    output += `<li><strong>${key}:</strong> ${user[key]}</li>`;
                }
                output += "</ul>";
                document.getElementById("q2").innerHTML = output;
            } catch (error) {
                document.getElementById("q2").innerText = "Error parsing JSON data.";
            }
        } else {
            document.getElementById("q2").innerText = "Error loading JSON file.";
        }
    };
    xhr.send();
}
// Adding event listener to the "Show JSON" button
document.getElementById("btnq2").addEventListener("click", showJSON);

/*** Question 3***/
// Function to fetch todos data from the API endpoint
function fetchTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayTodos(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to display todos list on the page
function displayTodos(todos) {
    const todosList = document.getElementById('q3');
    todosList.innerHTML = ''; // Clear previous todos

    todos.forEach(todo => {
        const todoElement = document.createElement('div');
        todoElement.classList.add('todo');
        if (todo.completed) {
            todoElement.classList.add('completed');
        }
        todoElement.innerHTML = `
            <strong>Title:</strong> ${todo.title}<br>
            <strong>User ID:</strong> ${todo.userId}<br>
            <strong>Completed:</strong> ${todo.completed ? 'Yes' : 'No'}
        `;
        todosList.appendChild(todoElement);
    });
}

// Adding event listener to the "Show Todos" button
document.getElementById("btnq3").addEventListener("click", fetchTodos);