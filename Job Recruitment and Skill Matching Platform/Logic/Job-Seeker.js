// ---------- ALL PAGES: login check, name, logout ----------

function loadSeekerPage() {
  if (localStorage.getItem("loggedInRole") != "Job Seeker") {
    alert("Please login first");
    localStorage.setItem("selectedRole", "Job Seeker");
    window.location.href = "../login.html";
    return;
  }

  let firstName = localStorage.getItem("seekerFirstName");
  let lastName = localStorage.getItem("seekerLastName");
  let fullName = firstName + " " + lastName;
  let initials = firstName.charAt(0) + lastName.charAt(0);

  document.getElementById("userName").innerText = fullName;
  document.getElementById("userAvatar").innerText = initials.toUpperCase();

  if (document.getElementById("welcomeText") != null) {
    document.getElementById("welcomeText").innerText = "Welcome back, " + firstName;
    document.getElementById("todayDate").innerText = new Date().toDateString();
  }

  if (document.getElementById("profileName") != null) {
    loadProfile(fullName, initials);
  }
}

function logout() {
  localStorage.removeItem("loggedInRole");
  alert("You have logged out");
  window.location.href = "../index.html";
}


// ---------- PROFILE PAGE ----------

function removeSkill(button) {
  button.parentElement.remove();
}

function addSkill() {
  let input = document.getElementById("skillInput");
  let name = input.value.trim();

  if (name === "") {
    return;
  }

  let skill = document.createElement("span");
  skill.className = "skill";
  skill.innerHTML = name + ' <button type="button" onclick="removeSkill(this)">×</button>';

  document.getElementById("skillList").appendChild(skill);
  input.value = "";
}

function loadProfile(fullName, initials) {
  document.getElementById("profileName").innerText = fullName;
  document.getElementById("profileAvatar").innerText = initials.toUpperCase();
  document.getElementById("profileInfo").innerText =
    localStorage.getItem("seekerDegree") + " · " + localStorage.getItem("seekerLocation");

  document.getElementById("fname").value = localStorage.getItem("seekerFirstName");
  document.getElementById("lname").value = localStorage.getItem("seekerLastName");
  document.getElementById("email").value = localStorage.getItem("seekerEmail");
  document.getElementById("phone").value = localStorage.getItem("seekerPhone");
  document.getElementById("location").value = localStorage.getItem("seekerLocation");
  document.getElementById("about").value = localStorage.getItem("seekerAbout");

  document.getElementById("degree").value = localStorage.getItem("seekerDegree");
  document.getElementById("university").value = localStorage.getItem("seekerInstitution");
  document.getElementById("year").value = localStorage.getItem("seekerPassingYear");
  document.getElementById("cgpa").value = localStorage.getItem("seekerCGPA");
  document.getElementById("experience").value = localStorage.getItem("seekerExperience");

  let skills = localStorage.getItem("seekerSkills");
  if (skills != null && skills != "") {
    let list = skills.split(",");
    let html = "";
    for (let i = 0; i < list.length; i++) {
      html += '<span class="skill">' + list[i] + ' <button type="button" onclick="removeSkill(this)">×</button></span>';
    }
    document.getElementById("skillList").innerHTML = html;
  }
}

function saveProfile(event) {
  event.preventDefault();

  let firstName = document.getElementById("fname").value.trim();
  let lastName = document.getElementById("lname").value.trim();

  if (firstName == "" || lastName == "") {
    alert("Please enter your first and last name");
    return;
  }

  localStorage.setItem("seekerFirstName", firstName);
  localStorage.setItem("seekerLastName", lastName);
  localStorage.setItem("seekerEmail", document.getElementById("email").value.trim());
  localStorage.setItem("seekerPhone", document.getElementById("phone").value.trim());
  localStorage.setItem("seekerLocation", document.getElementById("location").value);
  localStorage.setItem("seekerAbout", document.getElementById("about").value.trim());

  localStorage.setItem("seekerDegree", document.getElementById("degree").value);
  localStorage.setItem("seekerInstitution", document.getElementById("university").value.trim());
  localStorage.setItem("seekerPassingYear", document.getElementById("year").value);
  localStorage.setItem("seekerCGPA", document.getElementById("cgpa").value);
  localStorage.setItem("seekerExperience", document.getElementById("experience").value);

  let tags = document.querySelectorAll("#skillList .skill");
  let skills = [];
  for (let i = 0; i < tags.length; i++) {
    skills.push(tags[i].firstChild.textContent.trim());
  }
  localStorage.setItem("seekerSkills", skills.join(","));

  alert("Profile saved!");
  loadSeekerPage(); 
}


// ---------- RESUME PAGE ----------


function toggleSkill(button) {
  button.classList.toggle("on");

  let name = button.innerText.substring(2);
  if (button.classList.contains("on")) {
    button.innerText = "✓ " + name;
  } else {
    button.innerText = "+ " + name;
  }

  let count = document.querySelectorAll(".skill-btn.on").length;
  document.getElementById("skillCount").innerText = count;
}

function showFileName() {
  let file = document.getElementById("resumeFile").files[0];
  if (file) {
    document.getElementById("fileName").innerText = file.name;
  }
}


// ---------- FIND JOBS PAGE ----------

let selectedType = "All";

function pickType(button, type) {
  let buttons = document.querySelectorAll(".filter-btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }
  button.classList.add("active");

  selectedType = type;
  filterJobs();
}

function filterJobs() {
  let search = document.getElementById("searchBox").value.toLowerCase();
  let cards = document.querySelectorAll(".job-card");
  let shown = 0;

  for (let i = 0; i < cards.length; i++) {
    let text = cards[i].innerText.toLowerCase();
    let type = cards[i].getAttribute("data-type");

    let textOk = text.includes(search);
    let typeOk = selectedType === "All" || type === selectedType;

    if (textOk && typeOk) {
      cards[i].style.display = "flex";
      shown++;
    } else {
      cards[i].style.display = "none";
    }
  }

  document.getElementById("jobCount").innerText = shown + " jobs found";
}


// ---------- JOB DETAILS PAGE ----------

function applyJob() {
  let button = document.getElementById("applyBtn");
  button.innerText = "✓ Applied";
  button.className = "btn btn-green full-width";
  button.disabled = true;
}

function saveJob() {
  let button = document.getElementById("saveBtn");
  if (button.innerText === "☆ Save job") {
    button.innerText = "★ Saved";
  } else {
    button.innerText = "☆ Save job";
  }
}


// ---------- APPLICATIONS PAGE ----------

function showApp(button, title, company, status) {
  let rows = document.querySelectorAll(".app-btn");
  for (let i = 0; i < rows.length; i++) {
    rows[i].classList.remove("active");
  }
  button.classList.add("active");

  document.getElementById("appTitle").innerText = title;
  document.getElementById("appCompany").innerText = company;

  let stages = ["Applied", "Under review", "Shortlisted", "Interview", "Selected"];
  if (status === "Rejected") {
    stages = ["Applied", "Under review", "Rejected"];
  }
  let current = stages.indexOf(status);

  let html = "";
  for (let i = 0; i < stages.length; i++) {
    let type = "";
    let mark = "";

    if (i < current) {
      type = "done";
      mark = "✓";
    } else if (i === current && status === "Rejected") {
      type = "rejected";
      mark = "✕";
    } else if (i === current) {
      type = "now";
    }

    html += '<div class="stage ' + type + '"><div class="dot">' + mark + '</div> ' + stages[i] + '</div>';

    if (i < stages.length - 1) {
      let lineType = i < current ? "done" : "";
      html += '<div class="line ' + lineType + '"></div>';
    }
  }

  document.getElementById("timeline").innerHTML = html;
}


// ---------- SAVED JOBS PAGE ----------

function removeSaved(button) {
  button.parentElement.parentElement.remove();

  let left = document.querySelectorAll(".saved-card").length;
  document.getElementById("savedCount").innerText = left + " saved · sorted by match";

  if (left === 0) {
    document.getElementById("emptyBox").style.display = "block";
  }
}