
// To Do List App

const btnsArray = document.getElementsByTagName('button');
const mainDiv = document.getElementById("tasks");
const form = document.getElementById('myForm');
const darkBtn = document.getElementById('dark-btn');
const mainP = document.getElementById('main-p');

window.addEventListener('load', function() {
    mainDiv.innerHTML = localStorage.getItem('list') || '';
    document.body.style.backgroundColor = localStorage.getItem('mode') || '#ffffff';
    mainP.style.color = localStorage.getItem('pColor') || '#01245b';
    darkBtn.textContent = localStorage.getItem('pText') || 'Dark mode off';
});

function changeLocalStorage() {
    localStorage.setItem('list', mainDiv.innerHTML);
}

mainDiv.addEventListener('change', function() {
    changeLocalStorage();
});

function colorChange(input) {
    input.parentElement.style.backgroundColor = input.value;
    input.style.backgroundColor = input.value;
    input.style.color = "white";
    input.parentElement.children[0].children[1].style.color = "white";
}

function completeTask(checkbox) {
    const p = checkbox.nextElementSibling;
    if (checkbox.checked) {
        p.style.textDecoration = 'line-through';
        p.style.textDecorationColor = 'gray';
        p.style.color = 'gray';
        p.style.fontSize = "15px";
    } else {
        p.style.textDecoration = 'none';
        p.style.color = 'black';
        p.style.fontSize = "16px";
    }
    changeLocalStorage();
}

function deleteParent(icon) {
    const parentDiv = icon.parentElement.parentElement;
    parentDiv.remove();
    changeLocalStorage();
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const userTask = form.task.value;
    const task = document.createElement('div');

    task.innerHTML = `
    <div class="task-div">
        <div class="task-mark">
            <input type="checkbox" class="checkbox" onchange="completeTask(this)" />
            <p>${userTask}</p>
        </div>
        <input type="color" class="color" onchange="colorChange(this)" />
        <i class="fa-solid fa-xmark" onclick="deleteParent(this)"></i>
    </div>
    `;
    mainDiv.appendChild(task);
    form.reset();
    changeLocalStorage();
});

function colorLocalStorage() {
    const color = getComputedStyle(document.body).backgroundColor;
    localStorage.setItem('mode', color);
    
    const pColor = getComputedStyle(mainP).color;
    localStorage.setItem('pColor', pColor);
    
    localStorage.setItem('pText', darkBtn.textContent);
}

darkBtn.addEventListener('click', function() {
    const parentElement = darkBtn.parentElement.parentElement;
    const currentColor = getComputedStyle(parentElement).backgroundColor;

    if (currentColor === "rgb(255, 255, 255)" || currentColor === "#ffffff") {
        parentElement.style.backgroundColor = "#181a1b";
        darkBtn.parentElement.style.backgroundColor = "#181a1b";
        darkBtn.textContent = "Dark mode on";
        mainP.style.color = "#f0f2f5";
    } else {
        parentElement.style.backgroundColor = "#ffffff";
        darkBtn.parentElement.style.backgroundColor = "#ffffff";
        darkBtn.textContent = "Dark mode off";
        mainP.style.color = "#01245b";
    }

    colorLocalStorage();
});

btnsArray[2].addEventListener('click', function() {
    mainDiv.innerHTML = '';
    changeLocalStorage();
});