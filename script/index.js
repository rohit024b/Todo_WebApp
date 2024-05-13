let addTodoButton = document.getElementById("addBtn");
let tableBody = document.getElementById("todoTableBody");
let inputTitle = document.getElementById("todoName");
let prioritySelect = document.getElementById("priority");



//alert for empty input
addTodoButton.addEventListener('click', (e) => {
    e.preventDefault();
    let todos = JSON.parse(localStorage.getItem("todos")) || [] //created an todos obj and we are gettingh todos DB key
    //this is the todo arr which will take data dynamically and store it and push it to LS 

    if (inputTitle.value == "") {
        alert("Todo cannot be empty!")
    } else {
        let todo =
        {
            title: inputTitle.value,
            priority: prioritySelect.value,
            status: "Pending🔃"
        }
        todos.push(todo) // this will take data from todo and push it into todos
        localStorage.setItem('todos', JSON.stringify(todos))
        displayTodoList(todos);
    }
});


function displayTodoList(parsedArr) {
    let todos = JSON.parse(localStorage.getItem("todos")) || []
    tableBody.innerHTML = "";
    parsedArr.forEach((e, i) => {
        //here we re creating table row data
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        td1.textContent = e.title

        let td4 = document.createElement("td")
        let dltBtn = document.createElement("button")
        dltBtn.className = "archiveBtn";
        dltBtn.textContent = "Archive";
        dltBtn.addEventListener('click', () => {
            //we need to remove the element from todo
            let archivedData = parsedArr.filter((ele, index) => {
                return index != i;
            })
            let archive = JSON.parse(localStorage.getItem("archive")) || []
            archive.push(e)
            localStorage.setItem('archive', JSON.stringify(archive))
            //
            localStorage.setItem('todos', JSON.stringify(archivedData)) //after every functionality need to update the changes into the LS as well
            displayTodoList(archivedData)

        })


        let td2 = document.createElement("td")
        td2.textContent = e.priority
        if (td2.textContent == "medium") {
            td2.style.backgroundColor = "rgb(255,255,0)"
        } else if (td2.textContent == "high") {
            td2.style.backgroundColor = "rgb(255,0,0)"
        }

        let td3 = document.createElement("td")
        let statusBtn = document.createElement("button")
        statusBtn.className = "toggle";
        statusBtn.textContent = e.status;
        statusBtn.addEventListener('click', () => {
            if (e.status == 'Pending🔃') {
                e.status = 'Completed✅'
            }
            else {
                e.status = 'Pending🔃'
            }
            localStorage.setItem('todos', JSON.stringify(parsedArr)) //after every functionality need to update the changes into the LS as well
            displayTodoList(parsedArr)
        })
        td3.append(statusBtn)
        td4.append(dltBtn)
        tr.append(td1, td2, td3, td4)
        tableBody.append(tr)
    });
}
let todos = JSON.parse(localStorage.getItem("todos")) || []
displayTodoList(todos);
