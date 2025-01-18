const clinc = [
    { name: 'Bhanu', age: '22', date: '01-01-25', time: '10:12', gender: 'Male', services: "Consultation, scaling", phoneNumber: 1234567891, clincId: 1001, patientId: 1, status: null },
    { name: 'Vidya', age: '21', date: '01-01-25', time: '10:12', gender: 'Male', services: "Consultation", phoneNumber: 2134521675, clincId: 1001, patientId: 2, status: null },
    { name: 'Sagar', age: '24', date: '03-01-25', time: '10:12', gender: 'Male', services: "Scaling", phoneNumber: 9876543012, clincId: 1002, patientId: 3, status: null },
    { name: 'Prakash', age: '24', date: '03-01-25', time: '10:12', gender: 'Male', services: "Consultation, scaling", phoneNumber: 9876543012, clincId: 1002, patientId: 4, status: null },
];

const tableBody = document.querySelector("#clinicTable tbody");
const patientCardsContainer = document.querySelector(".patient-cards");

const btn = document.querySelector('.logout-btn');

if (!localStorage.getItem("clincId")) {
    window.location.href = "/index.html";
}


window.history.pushState(null, "", window.location.href);
window.addEventListener("popstate", function () {
    window.history.pushState(null, "", window.location.href);
});

btn.addEventListener('click', () => {
    localStorage.removeItem('clincId');
    window.location.href = "/index.html"; 
});

let selectedPatient = null;
let selectedTimeSlot = null;

const renderTimeSlots = () => {
    const timeSlotsContainer = document.getElementById("time-slots");
    timeSlotsContainer.innerHTML = "";

    const startTime = 11;
    const endTime = 16;

    for (let hour = startTime; hour < endTime; hour++) {
        timeSlotsContainer.innerHTML += `
            <div class="time-slot" data-time="${hour}:00">${hour}:00</div>
            <div class="time-slot" data-time="${hour}:30">${hour}:30</div>
        `;
    }
};

const showModal = (patient) => {
    selectedPatient = patient;
    selectedTimeSlot = null;
    document.querySelector(".modal").classList.remove("hidden");
    renderTimeSlots();
};

const closeModal = () => {
    document.querySelector(".modal").classList.add("hidden");
};

const confirmModification = () => {
    const selectedDate = document.getElementById("appointment-date").value;

    if (!selectedDate || !selectedTimeSlot) {
        alert("Please select a date and time slot.");
        return;
    }

    selectedPatient.date = selectedDate;
    selectedPatient.time = selectedTimeSlot;
    selectedPatient.status = `Rescheduled to ${selectedDate} at ${selectedTimeSlot}`;
    renderPatients();
    closeModal();
};

document.getElementById("time-slots").addEventListener("click", (e) => {
    if (e.target.classList.contains("time-slot")) {
        document.querySelectorAll(".time-slot").forEach((slot) => {
            slot.classList.remove("selected");
        });
        e.target.classList.add("selected");
        selectedTimeSlot = e.target.getAttribute("data-time");
    }
});

document.querySelector(".confirm-btn").addEventListener("click", confirmModification);
document.querySelector(".close-btn").addEventListener("click", closeModal);

const renderPatients = () => {
    tableBody.innerHTML = '';
    patientCardsContainer.innerHTML = '';

    clinc.forEach((patient) => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
            <td>${patient.name}</td>
            <td>${patient.age}</td>
            <td>${patient.date}</td>
            <td>${patient.time}</td>
            <td>${patient.gender}</td>
            <td>${patient.services}</td>
            <td>${patient.phoneNumber}</td>
            <td class="status-cell">
                ${getStatusHTML(patient)}
            </td>
        `;
        tableBody.appendChild(tableRow);

        const card = document.createElement("div");
        card.classList.add("patient-card");
        card.innerHTML = `
            <h3>${patient.name}</h3>
            <p><strong>Age:</strong> ${patient.age}</p>
            <p><strong>Date:</strong> ${patient.date}</p>
            <p><strong>Time:</strong> ${patient.time}</p>
            <p><strong>Gender:</strong> ${patient.gender}</p>
            <p><strong>Services:</strong> ${patient.services}</p>
            <p><strong>Phone Number:</strong> ${patient.phoneNumber}</p>
            <div class="status-cell">
                ${getStatusHTML(patient)}
            </div>
        `;
        patientCardsContainer.appendChild(card);
    });
};

const getStatusHTML = (patient) => {
    if (patient.status && patient.status.startsWith("Rescheduled")) {
        return `<span style="color: orange; font-weight: bold;">${patient.status}</span>`;
    }
    if (patient.status === 'Accepted') {
        return `<span style="color: green; font-weight: bold;">Accepted</span>`;
    }
    if (patient.status === 'Rejected') {
        return `<span style="color: red; font-weight: bold;">Rejected</span>`;
    }
    return `
        <button class="accept-btn" data-id="${patient.patientId}">Accept</button>
        <button class="modify-btn" data-id="${patient.patientId}">Modify</button>
        <button class="reject-btn" data-id="${patient.patientId}">Reject</button>
    `;
};

const handleButtonClick = (e) => {
    const patientId = e.target.getAttribute("data-id");
    const patient = clinc.find((p) => p.patientId == patientId);

    if (!patient) return;

    if (e.target.classList.contains("accept-btn")) {
        patient.status = 'Accepted';
    } else if (e.target.classList.contains("reject-btn")) {
        patient.status = 'Rejected';
    } else if (e.target.classList.contains("modify-btn")) {
        showModal(patient);
    }
    renderPatients();
};

tableBody.addEventListener("click", handleButtonClick);
patientCardsContainer.addEventListener("click", handleButtonClick);

renderPatients();
