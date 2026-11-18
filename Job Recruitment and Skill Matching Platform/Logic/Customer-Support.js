/* Combined script for the Customer Support site.
   Shared helpers come first; each page's code then runs only when that page's elements exist. */

/* ---------- Shared helpers ---------- */

function showError(box, errorId, message) {
  const errorBox = document.getElementById(errorId);
  errorBox.innerHTML = message;
  errorBox.style.display = "inline-block";
  if (box !== null) {
    box.style.border = "1px solid #BE123C";
  }
}

function clearError(box, errorId) {
  const errorBox = document.getElementById(errorId);
  errorBox.innerHTML = "";
  errorBox.style.display = "none";
  if (box !== null) {
    box.style.border = "";
  }
}

function isDigitsOnly(text) {
  for (let i = 0; i < text.length; i++) {
    if (text.slice(i, i + 1) < "0" || text.slice(i, i + 1) > "9") {
      return false;
    }
  }
  return true;
}

function isValidEmail(email) {
  const at = email.indexOf("@");
  const domain = email.slice(at + 1);
  if (at < 1 || domain.indexOf(".") < 1) {
    return false;
  }
  return true;
}

function getChoice(groupName) {
  const group = document.getElementsByName(groupName);
  for (let i = 0; i < group.length; i++) {
    if (group[i].checked) {
      return group[i].value;
    }
  }
  return "";
}

/* ---------- Home page (index.html) ---------- */
(function () {
  if (!document.getElementById("search")) {
  return;
  }

  const searchBox = document.getElementById("search");
  const countText = document.getElementById("count");
  const totalCards = 9;

  function filterCards() {
    const term = searchBox.value.toLowerCase();
    let shown = 0;

    for (let i = 1; i <= totalCards; i++) {
      const card = document.getElementById("card" + i);
      if (card.innerHTML.toLowerCase().indexOf(term) >= 0) {
        card.style.display = "block";
        shown++;
      } else {
        card.style.display = "none";
      }
    }

    if (shown === 0) {
      countText.innerHTML = "No topics found. Try another word, or send us a request.";
    } else {
      countText.innerHTML = shown + " of " + totalCards + " topics shown";
    }
  }

  searchBox.addEventListener("keyup", filterCards);
})();

/* ---------- Support request page (request.html) ---------- */
(function () {
  if (!document.getElementById("CustomerName")) {
  return;
  }

  const nameBox = document.getElementById("CustomerName");
  const phoneBox = document.getElementById("ContactNumber");
  const emailBox = document.getElementById("EmailAddress");
  const categoryBox = document.getElementById("Category");
  const priorityBox = document.getElementById("Priority");
  const subjectBox = document.getElementById("Subject");
  const problemBox = document.getElementById("Problem");
  const counter = document.getElementById("counter");
  const agree = document.getElementById("Condition");
  const submitBtn = document.getElementById("submit");
  const result = document.getElementById("result");

  const maxLength = 300;

  function validateForm() {
    let ok = true;
    if (nameBox.value.length < 2) {
      showError(nameBox, "nameError", "Please enter your name.");
      ok = false;
    } else {
      clearError(nameBox, "nameError");
    }
    let phone = phoneBox.value;
    if (phone.slice(0, 1) === "+") {
      phone = phone.slice(1);
    }
    if (phone.length < 7 || phone.length > 15 || isDigitsOnly(phone) === false) {
      showError(phoneBox, "phoneError", "Enter 7 to 15 digits, for example 01712345678.");
      ok = false;
    } else {
      clearError(phoneBox, "phoneError");
    }
    if (isValidEmail(emailBox.value) === false) {
      showError(emailBox, "emailError", "Please enter a valid email, like name@example.com.");
      ok = false;
    } else {
      clearError(emailBox, "emailError");
    }
    if (getChoice("UserType") === "") {
      showError(null, "userTypeError", "Please choose one.");
      ok = false;
    } else {
      clearError(null, "userTypeError");
    }
    if (categoryBox.value === "Default") {
      showError(categoryBox, "categoryError", "Please choose a category.");
      ok = false;
    } else {
      clearError(categoryBox, "categoryError");
    }
    if (subjectBox.value.length < 3) {
      showError(subjectBox, "subjectError", "Please enter a short subject.");
      ok = false;
    } else {
      clearError(subjectBox, "subjectError");
    }
    const problem = problemBox.value;
    if (problem.length < 10) {
      showError(problemBox, "problemError", "Please describe your problem (at least 10 characters).");
      ok = false;
    } else if (problem.length > maxLength) {
      showError(problemBox, "problemError", "Please keep it under " + maxLength + " characters.");
      ok = false;
    } else {
      clearError(problemBox, "problemError");
    }
    if (getChoice("ContactPref") === "") {
      showError(null, "prefError", "Please choose one.");
      ok = false;
    } else {
      clearError(null, "prefError");
    }

    return ok;
  }

  function handleSubmit() {
    if (validateForm()) {
      console.log("Name: " + nameBox.value);
      console.log("Contact: " + phoneBox.value);
      console.log("Email: " + emailBox.value);
      console.log("I am a: " + getChoice("UserType"));
      console.log("Category: " + categoryBox.value);
      console.log("Priority: " + priorityBox.value);
      console.log("Subject: " + subjectBox.value);
      console.log("Problem: " + problemBox.value);

      result.innerHTML = "Thank you, " + nameBox.value + ". Your request about \"" + categoryBox.value +
        "\" has been received. We will contact you by " + getChoice("ContactPref") + ".";
      result.style.display = "block";
      alert("Your support request has been submitted.");
    } else {
      result.innerHTML = "";
      result.style.display = "none";
    }
  }

  function updateCounter() {
    const left = maxLength - problemBox.value.length;
    counter.innerHTML = left + " characters left";
    if (left < 0) {
      counter.style.color = "#BE123C";
    } else {
      counter.style.color = "#6B7280";
    }
  }

  function updateSubmit() {
    submitBtn.disabled = !agree.checked;
  }

  function handleReset() {
    clearError(nameBox, "nameError");
    clearError(phoneBox, "phoneError");
    clearError(emailBox, "emailError");
    clearError(null, "userTypeError");
    clearError(categoryBox, "categoryError");
    clearError(subjectBox, "subjectError");
    clearError(problemBox, "problemError");
    clearError(null, "prefError");
    counter.innerHTML = maxLength + " characters left";
    counter.style.color = "#6B7280";
    result.innerHTML = "";
    result.style.display = "none";
    submitBtn.disabled = true;
  }

  submitBtn.addEventListener("click", handleSubmit);
  document.getElementById("reset").addEventListener("click", handleReset);
  problemBox.addEventListener("keyup", updateCounter);
  agree.addEventListener("change", updateSubmit);
})();

/* ---------- Track request page (track.html) ---------- */
(function () {
  if (!document.getElementById("trackBtn")) {
  return;
  }

  const refBox = document.getElementById("RefNumber");
  const refError = document.getElementById("refError");
  const resultPanel = document.getElementById("resultPanel");
  const resSubject = document.getElementById("resSubject");
  const resStatus = document.getElementById("resStatus");
  const resNote = document.getElementById("resNote");

  function showResult(subject, status, note) {
    resSubject.innerHTML = subject;
    resStatus.innerHTML = status;
    resNote.innerHTML = note;
    resultPanel.style.display = "block";

    if (status === "Resolved") {
      resStatus.style.backgroundColor = "#DCFCE7";
      resStatus.style.color = "#15803D";
    } else if (status === "In progress") {
      resStatus.style.backgroundColor = "#DBEAFE";
      resStatus.style.color = "#1D4ED8";
    } else {
      resStatus.style.backgroundColor = "#E5E7EB";
      resStatus.style.color = "#374151";
    }
  }

  function handleTrack() {
    const ref = refBox.value.toLowerCase();
    refError.style.display = "none";
    refBox.style.border = "";

    if (ref === "sup-1001") {
      showResult("Cannot upload my CV", "Pending", "We received your request. An agent will review it soon.");
    } else if (ref === "sup-1002") {
      showResult("Job posting not visible", "In progress", "An agent is looking into your posting right now.");
    } else if (ref === "sup-1003") {
      showResult("Forgot my password", "Resolved", "A reset link was sent to your email. This request is closed.");
    } else {
      resultPanel.style.display = "none";
      refError.innerHTML = "No request found with that number. Check it and try again.";
      refError.style.display = "inline-block";
      refBox.style.border = "1px solid #BE123C";
    }
    console.log("Tracked: " + refBox.value);
  }

  document.getElementById("trackBtn").addEventListener("click", handleTrack);
})();

/* ---------- FAQ page (faq.html) ---------- */
(function () {
  if (!document.getElementById("tabAll")) {
  return;
  }

  const totalQuestions = 8;

  function toggleAnswer(num) {
    const question = document.getElementById("q" + num);
    const answer = document.getElementById("a" + num);

    if (answer.style.display === "block") {
      answer.style.display = "none";
      question.style.backgroundColor = "";
    } else {
      answer.style.display = "block";
      question.style.backgroundColor = "#E0F2FE";
    }
  }

  function showGroup(which) {
    const seeker = document.getElementById("seekerFaq");
    const employer = document.getElementById("employerFaq");
    const tabAll = document.getElementById("tabAll");
    const tabSeeker = document.getElementById("tabSeeker");
    const tabEmployer = document.getElementById("tabEmployer");
    tabAll.style.backgroundColor = "";
    tabSeeker.style.backgroundColor = "";
    tabEmployer.style.backgroundColor = "";
    tabAll.style.color = "";
    tabSeeker.style.color = "";
    tabEmployer.style.color = "";

    if (which === "seeker") {
      seeker.style.display = "block";
      employer.style.display = "none";
      tabSeeker.style.backgroundColor = "#DBEAFE";
      tabSeeker.style.color = "#1D4ED8";
    } else if (which === "employer") {
      seeker.style.display = "none";
      employer.style.display = "block";
      tabEmployer.style.backgroundColor = "#DBEAFE";
      tabEmployer.style.color = "#1D4ED8";
    } else {
      seeker.style.display = "block";
      employer.style.display = "block";
      tabAll.style.backgroundColor = "#DBEAFE";
      tabAll.style.color = "#1D4ED8";
    }
  }

  for (let i = 1; i <= totalQuestions; i++) {
    document.getElementById("q" + i).addEventListener("click", () => toggleAnswer(i));
  }

  document.getElementById("tabAll").addEventListener("click", () => showGroup("all"));
  document.getElementById("tabSeeker").addEventListener("click", () => showGroup("seeker"));
  document.getElementById("tabEmployer").addEventListener("click", () => showGroup("employer"));
  showGroup("all");
})();

/* ---------- Employers page (employers.html) ---------- */
(function () {
  if (!document.getElementById("calcBtn")) {
  return;
  }

  const packageBox = document.getElementById("Package");
  const jobsBox = document.getElementById("Jobs");
  const result = document.getElementById("result");

  function calculate() {
    let ok = true;

    if (packageBox.value === "Default") {
      showError(packageBox, "packageError", "Please choose a package.");
      ok = false;
    } else {
      clearError(packageBox, "packageError");
    }

    if (jobsBox.value < 1) {
      showError(jobsBox, "jobsError", "Enter 1 or more jobs.");
      ok = false;
    } else {
      clearError(jobsBox, "jobsError");
    }

    if (ok) {
      const price = packageBox.value;
      const jobs = jobsBox.value;
      let total = price * jobs;
      let message = "";

      if (jobs > 10) {
        total = total - total / 5;
        message = " (20% discount for more than 10 jobs)";
      } else if (jobs > 5) {
        total = total - total / 10;
        message = " (10% discount for more than 5 jobs)";
      }

      console.log("Total: " + total);
      result.innerHTML = "Estimated total: " + total + message;
      result.style.display = "block";
    } else {
      result.style.display = "none";
    }
  }

  document.getElementById("calcBtn").addEventListener("click", calculate);
})();

/* ---------- Account page (account.html) ---------- */
(function () {
  if (!document.getElementById("sendLink")) {
  return;
  }

  const emailBox = document.getElementById("ResetEmail");
  const result = document.getElementById("result");

  function handleSendLink() {
    if (isValidEmail(emailBox.value)) {
      clearError(emailBox, "emailError");
      result.innerHTML = "If an account exists for " + emailBox.value + ", a reset link has been sent.";
      result.style.display = "block";
    } else {
      showError(emailBox, "emailError", "Please enter a valid email, like name@example.com.");
      result.style.display = "none";
    }
  }

  document.getElementById("sendLink").addEventListener("click", handleSendLink);
})();

/* ---------- Contact page (contact.html) ---------- */
(function () {
  if (!document.getElementById("CName")) {
  return;
  }

  const nameBox = document.getElementById("CName");
  const emailBox = document.getElementById("CEmail");
  const deptBox = document.getElementById("Dept");
  const messageBox = document.getElementById("Message");
  const result = document.getElementById("result");

  function validateForm() {
    let ok = true;

    if (nameBox.value.length < 2) {
      showError(nameBox, "nameError", "Please enter your name.");
      ok = false;
    } else {
      clearError(nameBox, "nameError");
    }

    if (isValidEmail(emailBox.value) === false) {
      showError(emailBox, "emailError", "Please enter a valid email, like name@example.com.");
      ok = false;
    } else {
      clearError(emailBox, "emailError");
    }

    if (deptBox.value === "Default") {
      showError(deptBox, "deptError", "Please choose a department.");
      ok = false;
    } else {
      clearError(deptBox, "deptError");
    }

    if (messageBox.value.length < 10) {
      showError(messageBox, "messageError", "Please write at least 10 characters.");
      ok = false;
    } else {
      clearError(messageBox, "messageError");
    }

    return ok;
  }

  function handleSend() {
    if (validateForm()) {
      console.log("From: " + nameBox.value + " (" + emailBox.value + ")");
      console.log("Department: " + deptBox.value);
      console.log("Message: " + messageBox.value);
      result.innerHTML = "Thank you, " + nameBox.value + ". Your message was sent to " + deptBox.value + ".";
      result.style.display = "block";
    } else {
      result.innerHTML = "";
      result.style.display = "none";
    }
  }

  function handleReset() {
    clearError(nameBox, "nameError");
    clearError(emailBox, "emailError");
    clearError(deptBox, "deptError");
    clearError(messageBox, "messageError");
    result.innerHTML = "";
    result.style.display = "none";
  }

  document.getElementById("send").addEventListener("click", handleSend);
  document.getElementById("reset").addEventListener("click", handleReset);
})();

/* ---------- Report a job page (report.html) ---------- */
(function () {
  if (!document.getElementById("JobInfo")) {
  return;
  }

  const jobBox = document.getElementById("JobInfo");
  const companyBox = document.getElementById("Company");
  const sourceBox = document.getElementById("Source");
  const amountRow = document.getElementById("amountRow");
  const amountBox = document.getElementById("Amount");
  const detailsBox = document.getElementById("Details");
  const emailBox = document.getElementById("ReporterEmail");
  const agree = document.getElementById("Condition");
  const submitBtn = document.getElementById("submit");
  const result = document.getElementById("result");

  function updateAmountRow() {
    if (getChoice("Paid") === "Yes") {
      amountRow.style.display = "block";
    } else {
      amountRow.style.display = "none";
      clearError(amountBox, "amountError");
    }
  }

  function validateForm() {
    let ok = true;

    if (jobBox.value.length < 3) {
      showError(jobBox, "jobError", "Please give the job link or title.");
      ok = false;
    } else {
      clearError(jobBox, "jobError");
    }

    if (companyBox.value.length < 2) {
      showError(companyBox, "companyError", "Please enter the company name.");
      ok = false;
    } else {
      clearError(companyBox, "companyError");
    }

    if (sourceBox.value === "Default") {
      showError(sourceBox, "sourceError", "Please choose where you saw it.");
      ok = false;
    } else {
      clearError(sourceBox, "sourceError");
    }

    const paid = getChoice("Paid");
    if (paid === "") {
      showError(null, "paidError", "Please choose one.");
      ok = false;
    } else {
      clearError(null, "paidError");
    }

    if (paid === "Yes" && isDigitsOnly(amountBox.value) === false) {
      showError(amountBox, "amountError", "Enter the amount in digits only.");
      ok = false;
    } else if (paid === "Yes" && amountBox.value.length === 0) {
      showError(amountBox, "amountError", "Enter the amount you paid.");
      ok = false;
    } else {
      clearError(amountBox, "amountError");
    }

    if (detailsBox.value.length < 10) {
      showError(detailsBox, "detailsError", "Please describe what happened (at least 10 characters).");
      ok = false;
    } else {
      clearError(detailsBox, "detailsError");
    }

    if (isValidEmail(emailBox.value) === false) {
      showError(emailBox, "emailError", "Please enter a valid email, like name@example.com.");
      ok = false;
    } else {
      clearError(emailBox, "emailError");
    }

    return ok;
  }

  function handleSubmit() {
    if (validateForm()) {
      console.log("Reported: " + companyBox.value + " / " + jobBox.value);
      result.innerHTML = "Thank you. Your report was received. Please do not send any more money or documents to this employer.";
      result.style.display = "block";
    } else {
      result.innerHTML = "";
      result.style.display = "none";
    }
  }

  function updateSubmit() {
    submitBtn.disabled = !agree.checked;
  }

  function handleReset() {
    clearError(jobBox, "jobError");
    clearError(companyBox, "companyError");
    clearError(sourceBox, "sourceError");
    clearError(null, "paidError");
    clearError(amountBox, "amountError");
    clearError(detailsBox, "detailsError");
    clearError(emailBox, "emailError");
    amountRow.style.display = "none";
    result.innerHTML = "";
    result.style.display = "none";
    submitBtn.disabled = true;
  }

  submitBtn.addEventListener("click", handleSubmit);
  document.getElementById("reset").addEventListener("click", handleReset);
  agree.addEventListener("change", updateSubmit);
  document.getElementById("PaidYes").addEventListener("change", updateAmountRow);
  document.getElementById("PaidNo").addEventListener("change", updateAmountRow);
})();

/* ---------- Feedback page (feedback.html) ---------- */
(function () {
  if (!document.getElementById("About")) {
  return;
  }

  const aboutBox = document.getElementById("About");
  const commentsBox = document.getElementById("Comments");
  const result = document.getElementById("result");

  function handleSubmit() {
    let ok = true;
    const rating = getChoice("Rating");

    if (rating === "") {
      showError(null, "ratingError", "Please choose a rating.");
      ok = false;
    } else {
      clearError(null, "ratingError");
    }

    if (aboutBox.value === "Default") {
      showError(aboutBox, "aboutError", "Please choose a topic.");
      ok = false;
    } else {
      clearError(aboutBox, "aboutError");
    }

    if (ok) {
      console.log("Rating: " + rating + " about " + aboutBox.value);
      console.log("Comments: " + commentsBox.value);

      if (rating >= 4) {
        result.innerHTML = "Thank you. We are glad you had a good experience!";
      } else if (rating === "3") {
        result.innerHTML = "Thank you. We will try to make it better.";
      } else {
        result.innerHTML = "Thank you, and sorry we let you down. We will work on it.";
      }
      result.style.display = "block";
    } else {
      result.style.display = "none";
    }
  }

  function handleReset() {
    clearError(null, "ratingError");
    clearError(aboutBox, "aboutError");
    result.innerHTML = "";
    result.style.display = "none";
  }

  document.getElementById("submit").addEventListener("click", handleSubmit);
  document.getElementById("reset").addEventListener("click", handleReset);
})();
