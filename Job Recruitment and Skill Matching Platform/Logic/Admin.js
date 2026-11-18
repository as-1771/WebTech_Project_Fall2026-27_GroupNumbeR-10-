console.log("Admin Registration & Dashboard JS Loaded");

document.addEventListener("DOMContentLoaded", function () {
    let ctx = document.getElementById('growthChart');
    if (ctx) {
        new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
                datasets: [
                    {
                        label: 'Registered Users',
                        data: [420, 650, 810, 950, 1100, 1240],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: 'Active Job Postings',
                        data: [110, 180, 240, 290, 340, 385],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    const newEmpForm = document.getElementById("newEmployerForm");
    if (newEmpForm) {
        newEmpForm.addEventListener("submit", function (event) {
            if (!validateNewEmployer()) {
                event.preventDefault();
            } else {
                event.preventDefault();
                
                let compName = document.getElementById("newCompName").value.trim();
                let email = document.getElementById("newEmail").value.trim();
                
                let tableBody = document.querySelector("#userTable tbody");
                let newId = "USR-" + Math.floor(103 + Math.random() * 900);

                let newRow = document.createElement("tr");
                newRow.setAttribute("style", "cursor: pointer;");
                newRow.setAttribute("data-role", "Employer");
                newRow.setAttribute("onclick", `showUserDetails('${newId}')`);
                
                newRow.innerHTML = `
                    <td><a href="javascript:void(0)" style="color: #2563eb; font-weight: bold;">${newId}</a></td>
                    <td><strong>${compName}</strong></td>
                    <td>Employer</td>
                    <td>${email}</td>
                    <td><span class="badge-active">Active</span></td>
                    <td><button class="btn-action-small btn-danger" onclick="event.stopPropagation(); alert('User Account Suspended')">Suspend</button></td>
                `;

                tableBody.appendChild(newRow);

                alert("New Employer Account Created Successfully!");
                
                newEmpForm.reset();
                document.getElementById("addUserBox").style.display = "none";
                document.getElementById("NewCompError").innerHTML = "";
                document.getElementById("NewEmailError").innerHTML = "";
                document.getElementById("NewPhoneError").innerHTML = "";
                document.getElementById("NewUserError").innerHTML = "";
                document.getElementById("NewPassError").innerHTML = "";
            }
        });
    }

    const regForm = document.getElementById("adminRegisterForm");
    if (regForm) {
        regForm.addEventListener("submit", function (event) {
            if (!validateAdminRegistration()) {
                event.preventDefault();
            } else {
                event.preventDefault();
                
                let adminData = {
                    email: document.getElementById("AdminEmail").value.trim(),
                    phone: document.getElementById("Phone").value.trim(),
                    username: document.getElementById("Username").value.trim(),
                    password: document.getElementById("Password").value
                };
                localStorage.setItem("adminProfile", JSON.stringify(adminData));

                window.location.href = "Dashboard.html";
            }
        });
    }

    if (document.getElementById("profileForm")) {
        let savedProfile = localStorage.getItem("adminProfile");
        if (savedProfile) {
            let data = JSON.parse(savedProfile);
            document.getElementById("profileEmail").value = data.email || "";
            document.getElementById("profilePhone").value = data.phone || "";
            document.getElementById("profileUsername").value = data.username || "";
            document.getElementById("profilePassword").value = data.password || "";
        }

        const profileForm = document.getElementById("profileForm");
        profileForm.addEventListener("submit", function (e) {
            e.preventDefault();
            let updatedData = {
                email: document.getElementById("profileEmail").value.trim(),
                phone: document.getElementById("profilePhone").value.trim(),
                username: document.getElementById("profileUsername").value.trim(),
                password: document.getElementById("profilePassword").value
            };
            localStorage.setItem("adminProfile", JSON.stringify(updatedData));

            document.getElementById("profileEmail").disabled = true;
            document.getElementById("profilePhone").disabled = true;
            document.getElementById("profileUsername").disabled = true;
            document.getElementById("profilePassword").disabled = true;

            document.getElementById("editProfileBtn").style.display = "inline-block";
            document.getElementById("saveProfileBtn").style.display = "none";

            alert("Profile Updated & Saved Successfully!");
        });
    }

    const skillForm = document.getElementById("skillForm");
    if (skillForm) {
        skillForm.addEventListener("submit", function (event) {
            let skillInput = document.getElementById("SkillName").value.trim();
            let err = document.getElementById("SkillError");
            if (skillInput === "") {
                err.innerHTML = "Please enter a valid skill tag";
                event.preventDefault();
            } else {
                err.innerHTML = "";
                event.preventDefault();
                alert("Skill Tag Added Successfully!");
                document.getElementById("SkillName").value = "";
            }
        });
    }
});

function toggleAddUserForm() {
    let box = document.getElementById("addUserBox");
    if (box) {
        if (box.style.display === "none") {
            box.style.display = "block";
        } else {
            box.style.display = "none";
        }
    }
}

function validateNewEmployer() {
    let isValid = true;

    let compName = document.getElementById("newCompName").value.trim();
    let compErr = document.getElementById("NewCompError");
    if (compName === "") {
        compErr.innerHTML = "Company name is required";
        isValid = false;
    } else {
        compErr.innerHTML = "";
    }

    let email = document.getElementById("newEmail").value.trim();
    let emailErr = document.getElementById("NewEmailError");
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        emailErr.innerHTML = "Email is required";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailErr.innerHTML = "Invalid email format";
        isValid = false;
    } else {
        emailErr.innerHTML = "";
    }

    let phone = document.getElementById("newPhone").value.trim();
    let phoneErr = document.getElementById("NewPhoneError");
    if (phone === "") {
        phoneErr.innerHTML = "Phone number is required";
        isValid = false;
    } else {
        phoneErr.innerHTML = "";
    }

    let username = document.getElementById("newUsername").value.trim();
    let userErr = document.getElementById("NewUserError");
    if (username === "") {
        userErr.innerHTML = "Username is required";
        isValid = false;
    } else if (username.length < 4 || username.length > 15) {
        userErr.innerHTML = "Username must be between 4 to 15 characters";
        isValid = false;
    } else {
        userErr.innerHTML = "";
    }

    let password = document.getElementById("newPassword").value;
    let passErr = document.getElementById("NewPassError");
    let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password === "") {
        passErr.innerHTML = "Password is required";
        isValid = false;
    } else if (!passRegex.test(password)) {
        passErr.innerHTML = "Must be 8+ chars with uppercase, lowercase & number";
        isValid = false;
    } else {
        passErr.innerHTML = "";
    }

    return isValid;
}

function filterUserTable() {
    let filterValue = document.getElementById("roleFilter").value;
    let tableRows = document.querySelectorAll("#userTable tbody tr");

    tableRows.forEach(function (row) {
        let userRole = row.getAttribute("data-role");
        if (filterValue === "All" || userRole === filterValue) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });

    let userDetailsBox = document.getElementById("userDetailsBox");
    if (userDetailsBox) {
        userDetailsBox.style.display = "none";
    }
}

function filterJobTable() {
    let filterValue = document.getElementById("jobTypeFilter").value;
    let tableRows = document.querySelectorAll("#jobTable tbody tr");

    tableRows.forEach(function (row) {
        let jobType = row.getAttribute("data-type");
        if (filterValue === "All" || jobType === filterValue) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });

    let jobDetailsBox = document.getElementById("jobDetailsBox");
    if (jobDetailsBox) {
        jobDetailsBox.style.display = "none";
    }
}

function togglePasswordVisibility(fieldId) {
    let passInput = document.getElementById(fieldId);
    if (passInput) {
        if (passInput.type === "password") {
            passInput.type = "text";
        } else {
            passInput.type = "password";
        }
    }
}

function showSection(sectionId, element) {
    let contents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < contents.length; i++) {
        contents[i].style.display = "none";
    }

    let navLinks = document.getElementsByClassName("nav-link");
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
        navLinks[i].style.backgroundColor = "transparent";
    }

    let selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = "block";
    }

    if (element) {
        element.classList.add("active");
        element.style.backgroundColor = "#3b82f6";
    }
}

function showUserDetails(userId) {
    let box = document.getElementById("userDetailsBox");
    let title = document.getElementById("detailTitle");
    let content = document.getElementById("detailContent");

    if (!box || !content) return;

    box.style.display = "block";

    if (userId === 'USR-101') {
        title.innerHTML = "User Profile: Shaharia Rahman Tanim (Job Seeker)";
        content.innerHTML = `
            <table>
                <tr>
                    <td width="30%"><strong>Primary Expertise:</strong> Software Engineering / C++ Graphics</td>
                    <td width="30%"><strong>AI Skill Match Score:</strong> <span style="color: green; font-weight: bold;">96%</span></td>
                    <td width="40%"><strong>Applied Jobs:</strong> 8 Applications Submitted</td>
                </tr>
                <tr>
                    <td><strong>Education & Degree:</strong> B.Sc. in Computer Science</td>
                    <td><strong>Verified Resume:</strong> <a href="javascript:void(0)">Tanim_CV_2026.pdf</a></td>
                    <td><strong>Member Since:</strong> October 2026</td>
                </tr>
                <tr>
                    <td colspan="3">
                        <strong>AI Recommended Tags:</strong> 
                        <span class="badge-active">C++</span> 
                        <span class="badge-active">OpenGL</span> 
                        <span class="badge-active">Git Workflow</span>
                        <span class="badge-active">JavaScript</span>
                    </td>
                </tr>
            </table>
        `;
    } else {
        title.innerHTML = "Company Profile: Employer Account (" + userId + ")";
        content.innerHTML = `
            <table>
                <tr>
                    <td width="30%"><strong>Company Type:</strong> Corporate Partner / Enterprise</td>
                    <td width="30%"><strong>Company Reg. No:</strong> REG-BD-88412</td>
                    <td width="40%"><strong>Active Job Postings:</strong> 2 Vacancies Listed</td>
                </tr>
                <tr>
                    <td><strong>Verification Documents:</strong> Trade License Verified</td>
                    <td><strong>Platform Trust Score:</strong> <span style="color: green; font-weight: bold;">92%</span></td>
                    <td><strong>Status:</strong> Active Partner</td>
                </tr>
                <tr>
                    <td colspan="3">
                        <strong>Recruitment Focus:</strong> Software Engineers, Tech Interns & Specialists
                    </td>
                </tr>
            </table>
        `;
    }
}

function showJobDetails(jobId) {
    let box = document.getElementById("jobDetailsBox");
    let title = document.getElementById("jobDetailTitle");
    let content = document.getElementById("jobDetailContent");

    if (!box || !content) return;

    box.style.display = "block";

    if (jobId === 'JOB-501') {
        title.innerHTML = "Job Details: C++ OpenGL Graphics Engineer (GameStudio Inc)";
        content.innerHTML = `
            <table>
                <tr>
                    <td width="33%"><strong>Salary Offered:</strong> $80,000 - $110,000 / Year</td>
                    <td width="33%"><strong>Employment Type:</strong> Full-Time Job</td>
                    <td width="34%"><strong>Vacancies:</strong> 2</td>
                </tr>
                <tr>
                    <td><strong>AI Match Weight:</strong> <span style="color: green; font-weight: bold;">95.4% High Fit</span></td>
                    <td><strong>Applicants Count:</strong> 42 Candidates</td>
                    <td><strong>Posting Date:</strong> October 28, 2026</td>
                </tr>
                <tr>
                    <td colspan="3">
                        <strong>Job Description:</strong> Looking for a dedicated C++ and OpenGL graphics engineer to build high-performance rendering pipelines, 2.5D visualizers, and interactive game UI assets.
                    </td>
                </tr>
            </table>
        `;
    } else if (jobId === 'JOB-502') {
        title.innerHTML = "Job Details: Computer Vision & AI Specialist (DataLab Research)";
        content.innerHTML = `
            <table>
                <tr>
                    <td width="33%"><strong>Salary Offered:</strong> $95,000 / Year</td>
                    <td width="33%"><strong>Employment Type:</strong> Full-Time Job</td>
                    <td width="34%"><strong>Vacancies:</strong> 1</td>
                </tr>
                <tr>
                    <td><strong>AI Match Weight:</strong> <span style="color: green; font-weight: bold;">91.8% Fit</span></td>
                    <td><strong>Applicants Count:</strong> 29 Candidates</td>
                    <td><strong>Posting Date:</strong> October 29, 2026</td>
                </tr>
                <tr>
                    <td colspan="3">
                        <strong>Job Description:</strong> Seeking data analysts and AI specialists proficient in Python, Pandas, Matplotlib, Seaborn, and OpenCV for dataset processing and model training.
                    </td>
                </tr>
            </table>
        `;
    } else if (jobId === 'JOB-503') {
        title.innerHTML = "Job Details: Python Data Science Intern (AI Research Lab)";
        content.innerHTML = `
            <table>
                <tr>
                    <td width="33%"><strong>Stipend Offered:</strong> $1,500 / Month</td>
                    <td width="33%"><strong>Employment Type:</strong> Internship</td>
                    <td width="34%"><strong>Vacancies:</strong> 4</td>
                </tr>
                <tr>
                    <td><strong>AI Match Weight:</strong> <span style="color: green; font-weight: bold;">88.5% Fit</span></td>
                    <td><strong>Applicants Count:</strong> 74 Candidates</td>
                    <td><strong>Posting Date:</strong> November 1, 2026</td>
                </tr>
                <tr>
                    <td colspan="3">
                        <strong>Job Description:</strong> Exciting internship opportunity for undergraduate students skilled in Python, Pandas, and data visualization notebooks to assist in training ML classification models.
                    </td>
                </tr>
            </table>
        `;
    } else if (jobId === 'JOB-504') {
        title.innerHTML = "Job Details: Frontend Web Developer (Webify Solutions)";
        content.innerHTML = `
            <table>
                <tr>
                    <td width="33%"><strong>Salary Offered:</strong> $45,000 / Year (Part-Time)</td>
                    <td width="33%"><strong>Employment Type:</strong> Part-Time Job</td>
                    <td width="34%"><strong>Vacancies:</strong> 2</td>
                </tr>
                <tr>
                    <td><strong>AI Match Weight:</strong> <span style="color: green; font-weight: bold;">92.1% Fit</span></td>
                    <td><strong>Applicants Count:</strong> 31 Candidates</td>
                    <td><strong>Posting Date:</strong> November 2, 2026</td>
                </tr>
                <tr>
                    <td colspan="3">
                        <strong>Job Description:</strong> Looking for modular HTML, CSS, and JavaScript developers to build responsive SaaS admin portal dashboards and dynamic user interfaces.
                    </td>
                </tr>
            </table>
        `;
    } else if (jobId === 'JOB-505') {
        title.innerHTML = "Job Details: Game UI/UX Design Intern (PixelCraft Studios)";
        content.innerHTML = `
            <table>
                <tr>
                    <td width="33%"><strong>Stipend Offered:</strong> $1,200 / Month</td>
                    <td width="33%"><strong>Employment Type:</strong> Internship</td>
                    <td width="34%"><strong>Vacancies:</strong> 3</td>
                </tr>
                <tr>
                    <td><strong>AI Match Weight:</strong> <span style="color: green; font-weight: bold;">94.0% Fit</span></td>
                    <td><strong>Applicants Count:</strong> 55 Candidates</td>
                    <td><strong>Posting Date:</strong> November 3, 2026</td>
                </tr>
                <tr>
                    <td colspan="3">
                        <strong>Job Description:</strong> Seeking creative designers to craft Free Fire style battle royale avatars, 4K thumbnails, YouTube logos, and vertical Shorts visual assets.
                    </td>
                </tr>
            </table>
        `;
    }
}

function showReportDetails(reportId) {
    let box = document.getElementById("reportDetailsBox");
    let title = document.getElementById("reportDetailTitle");
    let content = document.getElementById("reportDetailContent");

    if (!box || !content) return;

    box.style.display = "block";

    if (reportId === 'REP-001') {
        title.innerHTML = "Report Investigation: REP-001 (Job Post #JOB-502)";
        content.innerHTML = `
            <table>
                <tr>
                    <td width="33%"><strong>Reporter Name:</strong> Shaharia Rahman Tanim (USR-101)</td>
                    <td width="33%"><strong>Flagged Date:</strong> November 2, 2026</td>
                    <td width="34%"><strong>AI Risk Flag:</strong> <span style="color: #ef4444; font-weight: bold;">Medium Risk</span></td>
                </tr>
                <tr>
                    <td><strong>Target Entity:</strong> DataLab Research (#JOB-502)</td>
                    <td><strong>Current Status:</strong> Pending Admin Review</td>
                    <td><strong>Assigned Moderator:</strong> Super Admin</td>
                </tr>
                <tr>
                    <td colspan="3">
                        <strong>Incident Description:</strong> The user reported that the job posting lists mismatched AI and computer vision requirements compared to the actual interview screening rounds. Investigation required.
                    </td>
                </tr>
            </table>
        `;
    }
}

function enableProfileEdit() {
    document.getElementById("profileEmail").disabled = false;
    document.getElementById("profilePhone").disabled = false;
    document.getElementById("profileUsername").disabled = false;
    document.getElementById("profilePassword").disabled = false;

    document.getElementById("editProfileBtn").style.display = "none";
    document.getElementById("saveProfileBtn").style.display = "inline-block";
}

function validateAdminRegistration() {
    let isValid = true;

    let fullName = document.getElementById("FullName").value.trim();
    let nameErr = document.getElementById("NameError");
    if (fullName === "") {
        nameErr.innerHTML = "Full Name is required";
        isValid = false;
    } else if (fullName.length < 3) {
        nameErr.innerHTML = "Name must be at least 3 characters";
        isValid = false;
    } else {
        nameErr.innerHTML = "";
    }

    let email = document.getElementById("AdminEmail").value.trim();
    let emailErr = document.getElementById("EmailError");
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        emailErr.innerHTML = "Email is required";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailErr.innerHTML = "Invalid email format";
        isValid = false;
    } else {
        emailErr.innerHTML = "";
    }

    let phone = document.getElementById("Phone").value.trim();
    let phoneErr = document.getElementById("PhoneError");
    if (phone === "") {
        phoneErr.innerHTML = "Phone number is required";
        isValid = false;
    } else {
        phoneErr.innerHTML = "";
    }

    let genders = document.querySelectorAll('input[name="gender"]');
    let genderErr = document.getElementById("GenderError");
    let genderSelected = false;
    for (let i = 0; i < genders.length; i++) {
        if (genders[i].checked) {
            genderSelected = true;
            break;
        }
    }
    if (!genderSelected) {
        genderErr.innerHTML = "Please select gender";
        isValid = false;
    } else {
        genderErr.innerHTML = "";
    }

    let username = document.getElementById("Username").value.trim();
    let userErr = document.getElementById("UserError");
    if (username === "") {
        userErr.innerHTML = "Username is required";
        isValid = false;
    } else if (username.length < 4 || username.length > 15) {
        userErr.innerHTML = "Username must be between 4 to 15 characters";
        isValid = false;
    } else {
        userErr.innerHTML = "";
    }

    let password = document.getElementById("Password").value;
    let passErr = document.getElementById("PassError");
    let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (password === "") {
        passErr.innerHTML = "Password is required";
        isValid = false;
    } else if (!passRegex.test(password)) {
        passErr.innerHTML = "Must be 8+ chars with uppercase, lowercase & number";
        isValid = false;
    } else {
        passErr.innerHTML = "";
    }

    let confirmPass = document.getElementById("ConfirmPassword").value;
    let confirmErr = document.getElementById("ConfirmPassError");
    if (confirmPass === "") {
        confirmErr.innerHTML = "Please confirm your password";
        isValid = false;
    } else if (confirmPass !== password) {
        confirmErr.innerHTML = "Passwords do not match";
        isValid = false;
    } else {
        confirmErr.innerHTML = "";
    }

    return isValid;
}