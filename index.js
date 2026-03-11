let allIssues = [];
let filteredIssues = [];

// LOGIN FUNCTION
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin123") {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("mainPage").classList.remove("hidden");

    loadIssues();
  } else {
    alert("Invalid Credentials");
  }
}

// LOAD ISSUES FROM API
async function loadIssues() {
  const loading = document.getElementById("loading");
  loading.classList.remove("hidden");

  try {
    const res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    );
    const data = await res.json();

    allIssues = data.data;
    filteredIssues = allIssues;

    displayIssues(filteredIssues);
  } catch (error) {
    console.log(error);
  }

  loading.classList.add("hidden");
}

// DISPLAY ISSUES
function displayIssues(issues) {
  const container = document.getElementById("issueContainer");

  container.innerHTML = "";

  issues.forEach((issue) => {
    const card = document.createElement("div");

    card.className =
      "card bg-base-100 shadow-md p-4 cursor-pointer hover:shadow-xl transition";

    card.innerHTML = `
        <h2 class="font-bold text-lg">${issue.title}</h2>
        <p class="text-sm text-gray-500">${issue.description}</p>

        <div class="mt-3 space-y-1 text-sm">
            <p><b>Status:</b> ${issue.status}</p>
            <p><b>Author:</b> ${issue.author}</p>
            <p><b>Priority:</b> ${issue.priority}</p>
            <p><b>Label:</b> ${issue.label}</p>
            <p><b>Created:</b> ${new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>
    `;

    card.onclick = () => openModal(issue);

    container.appendChild(card);
  });
}

// FILTER ISSUES
function filterIssues(type) {
  document
    .querySelectorAll(".tab")
    .forEach((tab) => tab.classList.remove("tab-active"));

  document.getElementById(`tab-${type}`).classList.add("tab-active");

  if (type === "all") {
    filteredIssues = allIssues;
  } else {
    filteredIssues = allIssues.filter((issue) => issue.status === type);
  }

  displayIssues(filteredIssues);
}

// SEARCH FUNCTION
function searchIssues() {
  const text = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const result = filteredIssues.filter((issue) =>
    issue.title.toLowerCase().includes(text)
  );

  displayIssues(result);
}

// OPEN MODAL
function openModal(issue) {
  document.getElementById("modalTitle").innerText = issue.title;
  document.getElementById("modalDescription").innerText =
    issue.description;

  document.getElementById("modalStatus").innerText = issue.status;
  document.getElementById("modalAuthor").innerText = issue.author;
  document.getElementById("modalPriority").innerText = issue.priority;
  document.getElementById("modalLabel").innerText = issue.label;

  document.getElementById("modalDate").innerText = new Date(
    issue.createdAt
  ).toLocaleString();

  document.getElementById("issueModal").showModal();
}