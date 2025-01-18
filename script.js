const clincDetails = [
    {clincId: 1001, password: 1234},
    {clincId: 1002, password: 5678},
]


const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("error-message");
           
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
           
    const clincId = document.getElementById("clincId").value;
    const password = document.getElementById("password").value;
           
    errorMessage.textContent = '';
           
    if (!clincId || !password) {
        errorMessage.textContent = "Please fill in the required information.";
        return;
    }
           
    const clinic = clincDetails.find(c => c.clincId == clincId);
           
    if (!clinic) {
        errorMessage.textContent = "Clinic ID is wrong.";
    } else if (clinic.password != password) {
        errorMessage.textContent = "Password is wrong.";
    } else {
        localStorage.setItem('clincId', clincId);
        if (localStorage.getItem("clincId")) {
            window.location.href = "/clincData/new.html";
        } 
    }
});