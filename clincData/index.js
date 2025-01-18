const clinc = [
    { name: 'Bhanu', age: '22', date: '01-01-25', time: '10:12', gender: 'Male', services: "Consultation, scaling", phoneNumber: 1234567891, clincId: 1001, patientId: 1 },
    { name: 'Vidya', age: '21', date: '01-01-25', time: '10:12', gender: 'Male', services: "Consultation", phoneNumber: 2134521675, clincId: 1001, patientId: 2 },
    { name: 'Sagar', age: '24', date: '03-01-25', time: '10:12', gender: 'Male', services: "Scaling", phoneNumber: 9876543012, clincId: 1002, patientId: 3 },
    { name: 'Prakash', age: '24', date: '03-01-25', time: '10:12', gender: 'Male', services: "Consultation, scaling", phoneNumber: 9876543012, clincId: 1002, patientId: 4 },
];

const id = localStorage.getItem('clincId');
const tableBody = document.querySelector("#clinicTable tbody");
const details = clinc.filter(eachOne => eachOne.clincId == id);

details.forEach(patient => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${patient.name}</td>
        <td>${patient.age}</td>
        <td>${patient.date}</td>
        <td>${patient.time}</td>
        <td>${patient.gender}</td>
        <td>${patient.services}</td>
        <td>${patient.phoneNumber}</td>
        <td class="status-cell">
            <button class="accept-btn" style="background-color: green;" >Accept</button>
            <button class="modify-btn" data-id="${patient.patientId}" style="background-color: orange;">Modify</button>
            <button class="reject-btn" style="background-color: red";>Reject</button>
        </td>
    `;

    tableBody.appendChild(row);
});

const handleButtons = (event) => {
    const target = event.target;
    const statusCell = target.closest('.status-cell');

    if (!statusCell) return;

    const modifyButton = statusCell.querySelector('.modify-btn');
    const patientId = modifyButton ? modifyButton.getAttribute("data-id") : null;

    if (patientId) {
        const patient = clinc.find(item => item.patientId == patientId);

        if (target.classList.contains("accept-btn")) {
            statusCell.innerHTML = `<span style="color: green; font-weight: bold;">Accepted</span>`;
            patient.status = "Accepted";
        } else if (target.classList.contains("reject-btn")) {
            statusCell.innerHTML = `<span style="color: red; font-weight: bold;">Rejected</span>`;
            patient.status = "Rejected";
        } else if (target.classList.contains("modify-btn")) {
            let newDate = prompt("Enter new date (YYYY-MM-DD):", patient.date);
            let newTime = prompt("Enter new time (HH:mm):", patient.time);

            if (newDate && newTime) {
                patient.date = newDate;
                patient.time = newTime;
                patient.status = "Modified";
                statusCell.innerHTML = `<span style="color: orange; font-weight: bold;">Modified</span>`;
            } else {
                alert("Invalid date or time.");
            }
        }

        console.log(`Patient ID ${patientId} updated:`, patient);
    }
};

tableBody.addEventListener("click", handleButtons);
