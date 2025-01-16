const clinc = [
    {name: 'Bhanu', age: '22', date: '01-01-25', time: '10:12', gender: 'Male', services: "Consultation, scaling", phoneNumber: 1234567891, clincId: 1001, patientId: 1},
    {name: 'Vidya', age: '21', date: '01-01-25', time: '10:12', gender: 'Male', services: "Consultation", phoneNumber: 2134521675, clincId: 1001, patientId: 2},
    {name: 'Sagar', age: '24', date: '03-01-25', time: '10:12', gender: 'Male', services: "Scaling", phoneNumber: 9876543012, clincId: 1002, patientId: 3},
    {name: 'Prakash', age: '24', date: '03-01-25', time: '10:12', gender: 'Male', services: "Consultation, scaling", phoneNumber: 9876543012, clincId: 1002, patientId: 4},
];

const id = localStorage.getItem('clincId');
const patientCardsContainer = document.querySelector('.patient-cards');
const details = clinc.filter(eachOne => eachOne.clincId == id);

const btn = document.querySelector('.logout-btn');

btn.addEventListener('click', () => {
    alert("You have been logged out.");
    localStorage.removeItem('clincId');
    window.location.href = "/index.html"; 
});

const tableBody = document.querySelector("#clinicTable tbody");
console.log(tableBody);

details.forEach(item => {
    const row = document.createElement("tr");

    row.innerHTML = ` 
        <td>${item.name}</td>
        <td>${item.age}</td>
        <td>${item.date}</td>
        <td>${item.time}</td>
        <td>${item.gender}</td>
        <td>${item.services}</td>
        <td>${item.phoneNumber}</td>
        <td><button class="accept-btn">Accept</button></td>
        <td><button class="modify-btn" data-id="${item.patientId}" style="background-color: blue;">Modify the Slot</button></td>
        <td><button class="reject-btn">Reject</button></td>
    `;

    tableBody.appendChild(row);
});

const handleButtons = (event) => {
    const target = event.target;
    
    // Accept Button Logic
    if (target.classList.contains("accept-btn")) {
        const parent = target.closest('.patient-card') || target.closest('tr');
    
        if (parent) {
            const modifyButton = parent.querySelector(".modify-btn");
            const patientId = modifyButton ? modifyButton.getAttribute("data-id") : null;
    
            if (patientId) {
                const patient = clinc.find(item => item.patientId == patientId);
    
                if (patient) {
                    if (patient.accept === "Accepted") {
                        patient.accept = null;
                        target.style.backgroundColor = "";
                    } else {
                        patient.accept = "Accepted";
                        target.style.backgroundColor = "green";
                        patient.reject = null;
    
                        const rejectButton = parent.querySelector(".reject-btn");
                        if (rejectButton) {
                            rejectButton.style.backgroundColor = "";
                        }
                    }
    
                    console.log(`Patient ID ${patientId} status:`, patient);
                }
            } else {
                console.error("Patient ID not found!");
            }
        } else {
            console.error("No parent context found for Accept button!");
        }
    }
    

    // Reject Button Logic
    if (target.classList.contains("reject-btn")) {
        const parent = target.closest('.patient-card') || target.closest('tr');
    
        if (parent) {
            const modifyButton = parent.querySelector(".modify-btn");
            const patientId = modifyButton ? modifyButton.getAttribute("data-id") : null;
    
            if (patientId) {
                const patient = clinc.find(item => item.patientId == patientId);
    
                if (patient) {
                    if (patient.reject === "Rejected") {
                        patient.reject = null;
                        target.style.backgroundColor = "";
                    } else {
                        patient.reject = "Rejected";
                        target.style.backgroundColor = "red";
                        patient.accept = null;

                        const acceptButton = parent.querySelector(".accept-btn");
                        if (acceptButton) {
                            acceptButton.style.backgroundColor = "";
                        }
                    }
    
                    console.log(`Patient ID ${patientId} status:`, patient);
                }
            } else {
                console.error("Patient ID not found!");
            }
        } else {
            console.error("No parent context found for Reject button!");
        }
    }

    // Modify Button Logic
    if (target.classList.contains("modify-btn")) {
        const patientId = target.getAttribute("data-id");
        const patient = clinc.find(item => item.patientId == patientId);

        if (patient) {
            let existingPopup = document.querySelector(".popup");
            if (existingPopup) {
                existingPopup.parentNode.removeChild(existingPopup);
            }

            const datePicker = document.createElement("input");
            datePicker.type = "date";
            datePicker.style.display = "block";
            datePicker.style.margin = "5px 0";

            const timePicker = document.createElement("input");
            timePicker.type = "time";
            timePicker.style.display = "block";

            if (patient.modifyDate) {
                const [existingDate, existingTime] = patient.modifyDate.split(" ");
                datePicker.value = existingDate;
                timePicker.value = existingTime;
            } else {
                datePicker.value = "";
                timePicker.value = "";
            }

            const popup = document.createElement("div");
            popup.className = "popup";

            const saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            saveButton.style.marginTop = "5px";

            popup.appendChild(datePicker);
            popup.appendChild(timePicker);
            popup.appendChild(saveButton);

            document.body.appendChild(popup);
            const rect = target.getBoundingClientRect();
            popup.style.top = `${rect.bottom + window.scrollY}px`;
            popup.style.left = `${rect.left + window.scrollX}px`;

            saveButton.addEventListener("click", () => {
                const newDate = datePicker.value;
                const newTime = timePicker.value;

                if (newDate && newTime) {
                    patient.modifyDate = `${newDate} ${newTime}`;
                    target.style.backgroundColor = "green";

                    if (popup.parentNode) {
                        popup.parentNode.removeChild(popup);
                    }
                } else {
                    alert("Please select both a date and time.");
                }
            });

            document.addEventListener("click", (e) => {
                if (!popup.contains(e.target) && e.target !== target) {
                    if (popup.parentNode) {
                        popup.parentNode.removeChild(popup);
                    }
                }
            });
        }
    }
};

tableBody.addEventListener("click", handleButtons);

details.forEach(patient => {
    const patientCard = document.createElement('div');
    patientCard.classList.add('patient-card');

    patientCard.innerHTML = `
        <h3>${patient.name}</h3>
        <table class='each-table'>
            <tr>
                <th>Age</th>
                <td>${patient.age}</td>
            </tr>
            <tr>
                <th>Date</th>
                <td>${patient.date}</td>
            </tr>
            <tr>
                <th>Time</th>
                <td>${patient.time}</td>
            </tr>
            <tr>
                <th>Gender</th>
                <td>${patient.gender}</td>
            </tr>
            <tr>
                <th>Services</th>
                <td>${patient.services}</td>
            </tr>
            <tr>
                <th>Phone Number</th>
                <td>${patient.phoneNumber}</td>
            </tr>
            <tr>
                <th>Accept</th>
                <td><button class="accept-btn">Accept</button></td>
            </tr>
            <tr>
                <th>Modify</th>
                <td><button class="modify-btn" data-id="${patient.patientId}" style="background-color: blue;">Modify the Slot</button></td>
            </tr>
            <tr>
                <th>Reject</th>
                <td><button class="reject-btn">Reject</button></td>
            </tr>
        </table>
    `;

    
    patientCardsContainer.appendChild(patientCard);
});

patientCardsContainer.addEventListener("click", handleButtons);