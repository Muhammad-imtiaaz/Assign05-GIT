const username = "admin"
const password = "admin123"


function login(){

const user = document.getElementById("username").value
const pass = document.getElementById("password").value

if(user === username && pass === password){

document.getElementById("loginPage").classList.add("hidden")
document.getElementById("mainPage").classList.remove("hidden")

loadIssues()

}else{

alert("Invalid Credentials")

}

}



const issues = [

{
title:"Fix login bug",
description:"Login not working on Safari",
status:"open",
author:"John",
priority:"High",
label:"Bug",
createdAt:"2024-03-10"
},

{
title:"Improve UI",
description:"Update dashboard design",
status:"closed",
author:"Sarah",
priority:"Medium",
label:"Design",
createdAt:"2024-03-08"
},

{
title:"Add search feature",
description:"Search functionality for issues",
status:"open",
author:"Mike",
priority:"Low",
label:"Feature",
createdAt:"2024-03-05"
},

{
title:"API integration",
description:"Connect frontend with API",
status:"closed",
author:"Anna",
priority:"High",
label:"Backend",
createdAt:"2024-03-01"
}

]

let currentIssues = issues



function loadIssues(){

document.getElementById("loading").classList.remove("hidden")

setTimeout(()=>{

displayIssues(currentIssues)

document.getElementById("loading").classList.add("hidden")

},800)

}



function displayIssues(data){

const container = document.getElementById("issueContainer")

container.innerHTML = ""

data.forEach(issue => {

const borderColor = issue.status === "open"
? "border-green-500"
: "border-purple-500"

container.innerHTML += `

<div onclick="openModal('${issue.title}')"
class="card bg-base-100 shadow border-t-4 ${borderColor} cursor-pointer">

<div class="card-body">

<h2 class="card-title">${issue.title}</h2>

<p>${issue.description}</p>

<p><b>Status:</b> ${issue.status}</p>
<p><b>Author:</b> ${issue.author}</p>
<p><b>Priority:</b> ${issue.priority}</p>
<p><b>Label:</b> ${issue.label}</p>
<p class="text-sm text-gray-400">${issue.createdAt}</p>

</div>

</div>

`

})

}



function filterIssues(type){

document.querySelectorAll(".tab").forEach(t=>t.classList.remove("tab-active"))

document.getElementById(`tab-${type}`).classList.add("tab-active")

if(type === "all"){

currentIssues = issues

}else{

currentIssues = issues.filter(i => i.status === type)

}

displayIssues(currentIssues)

}



function searchIssues(){

const text = document.getElementById("searchInput").value.toLowerCase()

const filtered = issues.filter(issue =>
issue.title.toLowerCase().includes(text)
)

displayIssues(filtered)

}


function openModal(title){

const issue = issues.find(i=>i.title===title)

document.getElementById("modalTitle").innerText = issue.title
document.getElementById("modalDescription").innerText = issue.description
document.getElementById("modalStatus").innerText = issue.status
document.getElementById("modalAuthor").innerText = issue.author
document.getElementById("modalPriority").innerText = issue.priority
document.getElementById("modalLabel").innerText = issue.label
document.getElementById("modalDate").innerText = issue.createdAt

issueModal.showModal()

}