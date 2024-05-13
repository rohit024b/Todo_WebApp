let tableBody = document.getElementById("todoTableBody");
let prioritySelect = document.getElementById("prioritySelect");
let statusSelect = document.getElementById("statusSelect");


function displayTodoList(parsedArr) {
    // let archive = JSON.parse(localStorage.getItem("archive")) || []
    tableBody.innerHTML = "";
    parsedArr.forEach((e, i) => {
        //here we re creating table row data
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        td1.textContent = e.title

        let td4 = document.createElement("td")
        let restoreBtn = document.createElement("button")
        restoreBtn.className = "restoreBtn";
        restoreBtn.textContent = "Restore";
        restoreBtn.addEventListener('click', () => {
            //we need to remove the element from archive 
            let RestoreArchivedData = parsedArr.filter((ele, index) => {
                return index != i;
            })
            let todos = JSON.parse(localStorage.getItem("todos")) || []
            todos.push(e)
            localStorage.setItem('todos', JSON.stringify(todos))
            //
            localStorage.setItem('archive', JSON.stringify(RestoreArchivedData)) //after every functionality need to update the changes into the LS as well
            displayTodoList(RestoreArchivedData)

        })

        let td5 = document.createElement("td")
        let deleteBtn  = document.createElement("button")
        deleteBtn.className = "deleteBtn";
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click', () => {
            //we need to remove the element from archive 
            let deletedData = parsedArr.filter((ele, index) => {
                return index != i;
            })
            //
            localStorage.setItem('archive', JSON.stringify(deletedData)) //after every functionality need to update the changes into the LS as well
            displayTodoList(deletedData)

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

        td3.append(statusBtn)
        td4.append(restoreBtn)
        td5.append(deleteBtn)
        tr.append(td1, td2,td3,td4,td5)
        tableBody.append(tr)
    });
}
let archive = JSON.parse(localStorage.getItem("archive")) || []
displayTodoList(archive);

console.log(archive)

prioritySelect.addEventListener("change",()=>{
    let option = prioritySelect.value
    console.log(option)
    if(option == "low"){
        let filterData = archive.filter(ement =>{
            if(ement.priority == 'low'){
                return ement
            }
        })
        console.log(filterData)
        displayTodoList(filterData)
    }
    else if(option == "medium"){
        let filterData = archive.filter(ement =>{
            if(ement.priority == 'medium'){
                return ement
            }
        })
        console.log(filterData)
        displayTodoList(filterData)
    }
    else if(option == "high"){
        let filterData = archive.filter(ement =>{
            if(ement.priority == 'high'){
                return ement
            }
        })
        console.log(filterData)
        displayTodoList(filterData)
    }
})

statusSelect.addEventListener("change",()=>{
    let option = statusSelect.value
    console.log(option)
    if(option == "Completed✅"){
        let filterData = archive.filter(ement =>{
            if(ement.status == 'Completed✅'){
                return ement
            }
        })
        console.log(filterData)
        displayTodoList(filterData)
    }
    else if(option == "Pending🔃"){
        let filterData = archive.filter(ement =>{
            if(ement.status == 'Pending🔃'){
                return ement
            }
        })
        console.log(filterData)
        displayTodoList(filterData)
    }
});