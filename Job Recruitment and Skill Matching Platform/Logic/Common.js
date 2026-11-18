// ===== Admin code =====

let adminCode = "ADMIN2026";




let demoSeekerUser = "seeker";
let demoSeekerPass = "123456";

let demoRecruiterUser = "recruiter";
let demoRecruiterPass = "123456";

let demoSupportUser = "support";
let demoSupportPass = "123456";

let demoAdminUser = "admin";
let demoAdminPass = "123456";


// ===== Home page =====

function openPage(page, role)
{
    localStorage.setItem("selectedRole", role);
    window.location.href = page;
}


// ===== Login page =====

function showRole()
{
    let role = localStorage.getItem("selectedRole");

    if(role == null)
    {
        role = "Job Seeker";
    }

    document.getElementById("roleName").innerText = role;

    let link = document.getElementById("registerLink");

    if(role == "Job Seeker")
    {
        link.href = "Job-Seeker/Register.html";
    }
    else if(role == "Recruiter")
    {
        link.href = "Job-Reqruiter/Register.html";
    }
    else if(role == "Customer Support")
    {
        link.href = "Customer-Support/Register.html";
    }
    else
    {
        link.href = "Admin/Register.html";
    }

    let demoUser = "";
    if(role == "Job Seeker")
    {
        demoUser = demoSeekerUser;
    }
    else if(role == "Recruiter")
    {
        demoUser = demoRecruiterUser;
    }
    else if(role == "Customer Support")
    {
        demoUser = demoSupportUser;
    }
    else
    {
        demoUser = demoAdminUser;
    }

    document.getElementById("demoText").innerHTML =
        "Demo account: <b>" + demoUser + "</b> / <b>123456</b>";
}


// =====================================================
// REGISTER (Job Seeker only)
// =====================================================

function collect_data()
{
    let validFirstName = validateFirstName();
    let validLastName = validateLastName();
    let validEmail = validateEmail();
    let validPhone = validatePhone();
    let validLocation = validateLocation();
    let validDegree = validateDegree();
    let validInstitution = validateInstitution();
    let validYear = validatePassingYear();
    let validCGPA = validateCGPA();
    let validSkills = validateSkills();
    let validUsername = validateUsername();
    let validPassword = validatePassword();
    let validConfirm = validateConfirmPassword();

    if(validFirstName && validLastName && validEmail && validPhone &&
       validLocation && validDegree && validInstitution && validYear &&
       validCGPA && validSkills && validUsername && validPassword && validConfirm)
    {
        saveSeeker();

        alert("Registration Successful");

        localStorage.setItem("selectedRole", "Job Seeker");
        window.location.href = "../login.html";
    }

    return false;
}


function validateFirstName()
{
    let FirstName = document.getElementById("FirstName").value.trim();
    let Error = document.getElementById("FirstNameError");

    if(FirstName == "")
    {
        Error.innerHTML = "Enter Your First Name";
        Error.style.color = "red";
        return false;
    }
    else if(FirstName.length < 2)
    {
        Error.innerHTML = "First Name must be at least 2 Char";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "First Name: " + FirstName;
        Error.style.color = "green";
        return true;
    }
}


function validateLastName()
{
    let LastName = document.getElementById("LastName").value.trim();
    let Error = document.getElementById("LastNameError");

    if(LastName == "")
    {
        Error.innerHTML = "Enter Your Last Name";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "Last Name: " + LastName;
        Error.style.color = "green";
        return true;
    }
}


function validateEmail()
{
    let Email = document.getElementById("Email").value.trim();
    let Error = document.getElementById("EmailError");
    let regexpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(Email == "")
    {
        Error.innerHTML = "Please Enter The Email";
        Error.style.color = "red";
        return false;
    }
    else if(!regexpression.test(Email))
    {
        Error.innerHTML = "Please Enter The Right Email Format";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "Email: " + Email;
        Error.style.color = "green";
        return true;
    }
}


function validatePhone()
{
    let Phone = document.getElementById("Phone").value.trim();
    let Error = document.getElementById("PhoneError");

    if(Phone == "")
    {
        Error.innerHTML = "Please Enter The Phone Number";
        Error.style.color = "red";
        return false;
    }
    else if(Phone.length != 11 || isNaN(Phone))
    {
        Error.innerHTML = "Phone Number must be 11 digits";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "Phone: " + Phone;
        Error.style.color = "green";
        return true;
    }
}


function validateLocation()
{
    let Location = document.getElementById("Location").value;
    let Error = document.getElementById("LocationError");

    if(Location == "")
    {
        Error.innerHTML = "Please Select a Location";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "Location: " + Location;
        Error.style.color = "green";
        return true;
    }
}


function validateDegree()
{
    let Degree = document.getElementById("Degree").value;
    let Error = document.getElementById("DegreeError");

    if(Degree == "")
    {
        Error.innerHTML = "Please Select Your Degree";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "Degree: " + Degree;
        Error.style.color = "green";
        return true;
    }
}


function validateInstitution()
{
    let Institution = document.getElementById("Institution").value.trim();
    let Error = document.getElementById("InstitutionError");

    if(Institution == "")
    {
        Error.innerHTML = "Please Enter Your Institution";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "Institution: " + Institution;
        Error.style.color = "green";
        return true;
    }
}


function validatePassingYear()
{
    let Year = Number(document.getElementById("PassingYear").value);
    let Error = document.getElementById("PassingYearError");

    if(document.getElementById("PassingYear").value === "")
    {
        Error.innerHTML = "Please Enter The Passing Year";
        Error.style.color = "red";
        return false;
    }
    else if(Year < 2000 || Year > 2030)
    {
        Error.innerHTML = "Year Must be between 2000 and 2030";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "Passing Year: " + Year;
        Error.style.color = "green";
        return true;
    }
}


function validateCGPA()
{
    let CGPA = Number(document.getElementById("CGPA").value);
    let Error = document.getElementById("CGPAError");

    if(document.getElementById("CGPA").value === "")
    {
        Error.innerHTML = "Please Enter Your CGPA";
        Error.style.color = "red";
        return false;
    }
    else if(CGPA < 0 || CGPA > 4)
    {
        Error.innerHTML = "CGPA Must be between 0 and 4";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "CGPA: " + CGPA;
        Error.style.color = "green";
        return true;
    }
}


function validateSkills()
{
    let skills = document.querySelectorAll('input[name="skill"]');
    let Error = document.getElementById("SkillError");
    let selectedSkills = [];

    for(let i = 0; i < skills.length; i++)
    {
        if(skills[i].checked)
        {
            selectedSkills.push(skills[i].value);
        }
    }

    if(selectedSkills.length === 0)
    {
        Error.innerHTML = "Please select at least one skill";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "Selected Skill(s): " + selectedSkills.join(", ");
        Error.style.color = "green";
        return true;
    }
}


function validateUsername()
{
    let Username = document.getElementById("Username").value.trim();
    let Error = document.getElementById("UsernameError");

    if(Username == "")
    {
        Error.innerHTML = "Please Enter a Username";
        Error.style.color = "red";
        return false;
    }
    else if(Username.length < 4)
    {
        Error.innerHTML = "Username must be at least 4 Char";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "Username: " + Username;
        Error.style.color = "green";
        return true;
    }
}


function validatePassword()
{
    let Password = document.getElementById("Password").value;
    let Error = document.getElementById("PasswordError");

    if(Password == "")
    {
        Error.innerHTML = "Please Enter a Password";
        Error.style.color = "red";
        return false;
    }
    else if(Password.length < 6)
    {
        Error.innerHTML = "Password must be at least 6 Char";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "Password OK";
        Error.style.color = "green";
        return true;
    }
}


function validateConfirmPassword()
{
    let Password = document.getElementById("Password").value;
    let ConfirmPassword = document.getElementById("ConfirmPassword").value;
    let Error = document.getElementById("ConfirmPasswordError");

    if(ConfirmPassword == "")
    {
        Error.innerHTML = "Please Confirm The Password";
        Error.style.color = "red";
        return false;
    }
    else if(ConfirmPassword != Password)
    {
        Error.innerHTML = "Passwords do not match";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "Passwords match";
        Error.style.color = "green";
        return true;
    }
}


function saveSeeker()
{
    let skills = document.querySelectorAll('input[name="skill"]');
    let selectedSkills = [];

    for(let i = 0; i < skills.length; i++)
    {
        if(skills[i].checked)
        {
            selectedSkills.push(skills[i].value);
        }
    }

    localStorage.setItem("seekerUsername", document.getElementById("Username").value.trim());
    localStorage.setItem("seekerPassword", document.getElementById("Password").value);

    localStorage.setItem("seekerFirstName", document.getElementById("FirstName").value.trim());
    localStorage.setItem("seekerLastName", document.getElementById("LastName").value.trim());
    localStorage.setItem("seekerEmail", document.getElementById("Email").value.trim());
    localStorage.setItem("seekerPhone", document.getElementById("Phone").value.trim());
    localStorage.setItem("seekerLocation", document.getElementById("Location").value);
    localStorage.setItem("seekerAbout", document.getElementById("About").value.trim());

    localStorage.setItem("seekerDegree", document.getElementById("Degree").value);
    localStorage.setItem("seekerInstitution", document.getElementById("Institution").value.trim());
    localStorage.setItem("seekerPassingYear", document.getElementById("PassingYear").value);
    localStorage.setItem("seekerCGPA", document.getElementById("CGPA").value);
    localStorage.setItem("seekerExperience", document.getElementById("Experience").value);
    localStorage.setItem("seekerSkills", selectedSkills.join(","));
}


// =====================================================
// REGISTER (Recruiter)
// =====================================================

function collect_recruiter()
{
    let validName = validateFullName();
    let validEmail = validateEmail();
    let validPhone = validatePhone();
    let validDesignation = checkText("Designation", "DesignationError", "Designation");
    let validCompany = checkText("CompanyName", "CompanyNameError", "Company Name");
    let validType = checkText("CompanyType", "CompanyTypeError", "Company Type");
    let validLocation = checkText("CompanyLocation", "CompanyLocationError", "Location");
    let validUsername = validateUsername();
    let validPassword = validatePassword();
    let validConfirm = validateConfirmPassword();

    if(validName && validEmail && validPhone && validDesignation && validCompany &&
       validType && validLocation && validUsername && validPassword && validConfirm)
    {
        localStorage.setItem("recruiterUsername", document.getElementById("Username").value.trim());
        localStorage.setItem("recruiterPassword", document.getElementById("Password").value);

        localStorage.setItem("recruiterName", document.getElementById("FullName").value.trim());
        localStorage.setItem("recruiterEmail", document.getElementById("Email").value.trim());
        localStorage.setItem("recruiterPhone", document.getElementById("Phone").value.trim());
        localStorage.setItem("recruiterDesignation", document.getElementById("Designation").value.trim());
        localStorage.setItem("recruiterCompany", document.getElementById("CompanyName").value.trim());
        localStorage.setItem("recruiterCompanyType", document.getElementById("CompanyType").value);
        localStorage.setItem("recruiterLocation", document.getElementById("CompanyLocation").value);
        localStorage.setItem("recruiterWebsite", document.getElementById("Website").value.trim());

        alert("Registration Successful");

        localStorage.setItem("selectedRole", "Recruiter");
        window.location.href = "../login.html";
    }

    return false;
}


// =====================================================
// REGISTER (Customer Support)
// =====================================================

function collect_support()
{
    let validName = validateFullName();
    let validEmail = validateEmail();
    let validPhone = validatePhone();
    let validGender = validateGender();
    let validExpertise = checkText("Expertise", "ExpertiseError", "Expertise");
    let validQualification = checkText("Qualification", "QualificationError", "Qualification");
    let validYears = validateYears();
    let validUsername = validateUsername();
    let validPassword = validatePassword();
    let validConfirm = validateConfirmPassword();

    if(validName && validEmail && validPhone && validGender && validExpertise &&
       validQualification && validYears && validUsername && validPassword && validConfirm)
    {
        let gender = document.querySelector('input[name="gender"]:checked').value;

        localStorage.setItem("supportUsername", document.getElementById("Username").value.trim());
        localStorage.setItem("supportPassword", document.getElementById("Password").value);

        localStorage.setItem("supportName", document.getElementById("FullName").value.trim());
        localStorage.setItem("supportEmail", document.getElementById("Email").value.trim());
        localStorage.setItem("supportPhone", document.getElementById("Phone").value.trim());
        localStorage.setItem("supportGender", gender);
        localStorage.setItem("supportExpertise", document.getElementById("Expertise").value);
        localStorage.setItem("supportQualification", document.getElementById("Qualification").value);
        localStorage.setItem("supportYears", document.getElementById("Years").value);
        localStorage.setItem("supportOrganization", document.getElementById("Organization").value.trim());

        alert("Registration Successful");

        localStorage.setItem("selectedRole", "Customer Support");
        window.location.href = "../login.html";
    }

    return false;
}


// =====================================================
// REGISTER (Admin)
// =====================================================

function collect_admin()
{
    let validName = validateFullName();
    let validEmail = validateEmail();
    let validPhone = validatePhone();
    let validCode = validateAdminCode();
    let validUsername = validateUsername();
    let validPassword = validatePassword();
    let validConfirm = validateConfirmPassword();

    if(validName && validEmail && validPhone && validCode &&
       validUsername && validPassword && validConfirm)
    {
        localStorage.setItem("adminUsername", document.getElementById("Username").value.trim());
        localStorage.setItem("adminPassword", document.getElementById("Password").value);

        localStorage.setItem("adminName", document.getElementById("FullName").value.trim());
        localStorage.setItem("adminEmail", document.getElementById("Email").value.trim());
        localStorage.setItem("adminPhone", document.getElementById("Phone").value.trim());

        alert("Registration Successful");

        localStorage.setItem("selectedRole", "Admin");
        window.location.href = "login.html";
    }

    return false;
}


// ===== Extra checks used by the 3 forms above =====

function validateFullName()
{
    let FullName = document.getElementById("FullName").value.trim();
    let Error = document.getElementById("FullNameError");

    if(FullName == "")
    {
        Error.innerHTML = "Enter Your Full Name";
        Error.style.color = "red";
        return false;
    }
    else if(FullName.length < 3)
    {
        Error.innerHTML = "Name must be at least 3 Char";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "Name: " + FullName;
        Error.style.color = "green";
        return true;
    }
}


function validateGender()
{
    let genders = document.querySelectorAll('input[name="gender"]');
    let Error = document.getElementById("GenderError");
    let selectGender = "";

    for(let i = 0; i < genders.length; i++)
    {
        if(genders[i].checked)
        {
            selectGender = genders[i].value;
            break;
        }
    }

    if(selectGender == "")
    {
        Error.innerHTML = "Please Select The Gender";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "Gender: " + selectGender;
        Error.style.color = "green";
        return true;
    }
}


function validateYears()
{
    let Years = Number(document.getElementById("Years").value);
    let Error = document.getElementById("YearsError");

    if(document.getElementById("Years").value === "")
    {
        Error.innerHTML = "Please Enter Years of Experience";
        Error.style.color = "red";
        return false;
    }
    else if(Years < 1 || Years > 50)
    {
        Error.innerHTML = "Experience must be between 1 and 50 years";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "Experience: " + Years + " years";
        Error.style.color = "green";
        return true;
    }
}


function validateAdminCode()
{
    let Code = document.getElementById("AdminCode").value.trim();
    let Error = document.getElementById("AdminCodeError");

    if(Code == "")
    {
        Error.innerHTML = "Please Enter The Admin Code";
        Error.style.color = "red";
        return false;
    }
    else if(Code != adminCode)
    {
        Error.innerHTML = "Wrong Admin Code";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "Admin Code OK";
        Error.style.color = "green";
        return true;
    }
}


// =====================================================
// LOGIN (all 4 users)
// =====================================================

function login()
{
    let validUser = checkEmpty("Username", "UsernameError", "Username");
    let validPass = checkEmpty("Password", "PasswordError", "Password");

    if(!(validUser && validPass))
    {
        return false;
    }

    let role = localStorage.getItem("selectedRole");
    let username = document.getElementById("Username").value.trim();
    let password = document.getElementById("Password").value;

    let registeredUsername = "";
    let registeredPassword = "";
    let demoUsername = "";
    let demoPassword = "";
    let page = "";

    if(role == "Job Seeker")
    {
        registeredUsername = localStorage.getItem("seekerUsername");
        registeredPassword = localStorage.getItem("seekerPassword");
        demoUsername = demoSeekerUser;
        demoPassword = demoSeekerPass;
        page = "Job-Seeker/seeker-dashboard.html";
    }
    else if(role == "Recruiter")
    {
        registeredUsername = localStorage.getItem("recruiterUsername");
        registeredPassword = localStorage.getItem("recruiterPassword");
        demoUsername = demoRecruiterUser;
        demoPassword = demoRecruiterPass;
        page = "Job-Reqruiter/RecruiterDashboard.html";
    }
    else if(role == "Customer Support")
    {
        registeredUsername = localStorage.getItem("supportUsername");
        registeredPassword = localStorage.getItem("supportPassword");
        demoUsername = demoSupportUser;
        demoPassword = demoSupportPass;
        page = "Customer-Support/index.html";
    }
    else
    {
        demoUsername = demoAdminUser;
        demoPassword = demoAdminPass;

        let adminProfile = JSON.parse(localStorage.getItem("adminProfile"));

        if(adminProfile != null)
        {
            registeredUsername = adminProfile.username;
            registeredPassword = adminProfile.password;
        }
        page = "Admin/Dashboard.html";
    }

    let success = false;

    if(username === registeredUsername && password === registeredPassword)
    {
        success = true;
    }

    if(username === demoUsername && password === demoPassword)
    {
        success = true;

        if(role == "Job Seeker" && localStorage.getItem("seekerFirstName") == null)
        {
            setDemoSeeker();
        }
    }

    if(success)
    {
        localStorage.setItem("loggedInRole", role);
        alert("Login Successful");
        window.location.href = page;
    }
    else
    {
        alert("Invalid Username or Password");
    }

    return false;
}


function setDemoSeeker()
{
    localStorage.setItem("seekerFirstName", "Demo");
    localStorage.setItem("seekerLastName", "Seeker");
    localStorage.setItem("seekerEmail", "demo@seeker.com");
    localStorage.setItem("seekerPhone", "01700000000");
    localStorage.setItem("seekerLocation", "Dhaka");
    localStorage.setItem("seekerAbout", "This is a demo account.");
    localStorage.setItem("seekerDegree", "BSc in CSE");
    localStorage.setItem("seekerInstitution", "Demo University");
    localStorage.setItem("seekerPassingYear", "2027");
    localStorage.setItem("seekerCGPA", "3.50");
    localStorage.setItem("seekerExperience", "Fresher");
    localStorage.setItem("seekerSkills", "HTML,CSS,JavaScript");
}


function checkEmpty(inputId, errorId, fieldName)
{
    let value = document.getElementById(inputId).value.trim();
    let Error = document.getElementById(errorId);

    if(value == "")
    {
        Error.innerHTML = "Please Enter " + fieldName;
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "";
        return true;
    }
}


// =====================================================
// LOGIN CHECK and LOGOUT (all dashboards)
// =====================================================

function checkLogin(role)
{
    let loggedInRole = localStorage.getItem("loggedInRole");

    if(loggedInRole != role)
    {
        alert("Please login first");
        localStorage.setItem("selectedRole", role);
        window.location.href = "login.html";
        return false;
    }

    let name = "";
    if(role == "Recruiter")
    {
        name = localStorage.getItem("recruiterName");
    }
    else if(role == "Customer Support")
    {
        name = localStorage.getItem("supportName");
    }
    else if(role == "Admin")
    {
        name = localStorage.getItem("adminName");
    }

    if(name != "" && name != null)
    {
        document.getElementById("WelcomeText").innerHTML = "Welcome, " + name;
    }

    return true;
}

function logout()
{
    localStorage.removeItem("loggedInRole");
    alert("You have logged out");
    window.location.href = "index.html";
}


// =====================================================
// RECRUITER DASHBOARD
// =====================================================

function post_job()
{
    let validTitle = checkText("JobTitle", "JobTitleError", "Job Title");
    let validCompany = checkText("Company", "CompanyError", "Company");
    let validLocation = checkText("JobLocation", "JobLocationError", "Location");
    let validSalary = validateSalary();
    let validSkills = validateJobSkills();

    if(validTitle && validCompany && validLocation && validSalary && validSkills)
    {
        let skills = document.querySelectorAll('input[name="jobskill"]');
        let selected = [];

        for(let i = 0; i < skills.length; i++)
        {
            if(skills[i].checked)
            {
                selected.push(skills[i].value);
            }
        }

        document.getElementById("PostedJobs").innerHTML +=
            "<tr>" +
            "<td>" + document.getElementById("JobTitle").value + "</td>" +
            "<td>" + document.getElementById("Company").value + "</td>" +
            "<td>" + document.getElementById("JobLocation").value + "</td>" +
            "<td>" + document.getElementById("Salary").value + "</td>" +
            "<td>" + selected.join(", ") + "</td>" +
            "</tr>";

        document.getElementById("PostMessage").innerHTML = "Job Posted Successfully";
    }

    return false;
}


function checkText(inputId, errorId, fieldName)
{
    let value = document.getElementById(inputId).value.trim();
    let Error = document.getElementById(errorId);

    if(value == "")
    {
        Error.innerHTML = "Please Enter " + fieldName;
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = fieldName + ": " + value;
        Error.style.color = "green";
        return true;
    }
}


function validateSalary()
{
    let Salary = Number(document.getElementById("Salary").value);
    let Error = document.getElementById("SalaryError");

    if(document.getElementById("Salary").value === "")
    {
        Error.innerHTML = "Please Enter The Salary";
        Error.style.color = "red";
        return false;
    }
    else if(Salary < 5000)
    {
        Error.innerHTML = "Salary must be at least 5000 Tk";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "Salary: " + Salary + " Tk";
        Error.style.color = "green";
        return true;
    }
}


function validateJobSkills()
{
    let skills = document.querySelectorAll('input[name="jobskill"]');
    let Error = document.getElementById("JobSkillError");
    let count = 0;

    for(let i = 0; i < skills.length; i++)
    {
        if(skills[i].checked)
        {
            count++;
        }
    }

    if(count === 0)
    {
        Error.innerHTML = "Please select at least one skill";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = count + " skill(s) selected";
        Error.style.color = "green";
        return true;
    }
}


function shortlist(button)
{
    let row = button.parentElement.parentElement;
    row.cells[3].innerHTML = "Shortlisted";

    button.innerHTML = "Shortlisted";
    button.disabled = true;
}


// =====================================================
// CUSTOMER SUPPORT (old dashboard code)
// =====================================================

function send_advice()
{
    let validSeeker = checkText("SeekerName", "SeekerNameError", "Job Seeker");
    let validAdvice = validateAdvice();

    if(validSeeker && validAdvice)
    {
        let name = document.getElementById("SeekerName").value;
        document.getElementById("AdviceMessage").innerHTML = "Advice sent to " + name;
    }

    return false;
}


function validateAdvice()
{
    let Advice = document.getElementById("Advice").value.trim();
    let Error = document.getElementById("AdviceError");

    if(Advice == "")
    {
        Error.innerHTML = "Please Write Your Advice";
        Error.style.color = "red";
        return false;
    }
    else if(Advice.length < 10)
    {
        Error.innerHTML = "Advice must be at least 10 Char";
        Error.style.color = "red";
        return false;
    }
    else
    {
        Error.innerHTML = "";
        return true;
    }
}


// =====================================================
// ADMIN DASHBOARD
// =====================================================

function loadAdminDashboard()
{
    if(!checkLogin("Admin"))
    {
        return;
    }

    let seekerName = null;
    if(localStorage.getItem("seekerFirstName") != null)
    {
        seekerName = localStorage.getItem("seekerFirstName") + " " + localStorage.getItem("seekerLastName");
    }

    addUserRow(seekerName, "Job Seeker", localStorage.getItem("seekerEmail"));
    addUserRow(localStorage.getItem("recruiterName"), "Recruiter", localStorage.getItem("recruiterEmail"));
    addUserRow(localStorage.getItem("supportName"), "Customer Support", localStorage.getItem("supportEmail"));
}


function addUserRow(name, type, email)
{
    if(name == null)
    {
        return;
    }

    document.getElementById("UserTable").innerHTML +=
        "<tr>" +
        "<td>" + name + "</td>" +
        "<td>" + type + "</td>" +
        "<td>" + email + "</td>" +
        "<td><button class='small-btn' onclick='removeUser(this)'>Remove</button></td>" +
        "</tr>";
}


function removeUser(button)
{
    let row = button.parentElement.parentElement;
    row.remove();
}


function approve(button)
{
    let row = button.parentElement.parentElement;
    row.cells[2].innerHTML = "Approved";

    button.innerHTML = "Approved";
    button.disabled = true;
}