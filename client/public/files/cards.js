// Use generic placeholders initially
let img1 = './files/VMRC_logo.png';
let img2 = './files/VMRC_QRcode.png';
let img3 = ''; 
let img4 = ''; 

const urlParams = new URLSearchParams(window.location.search);
const cardType = urlParams.get('type');

const inputs = {
    name: document.getElementById('fullName'),
    title: document.getElementById('title'),
    room: document.getElementById('room'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone')
};

// Preset Data Logic
if (cardType === 'SVA') {
    img1 = 'SVA_Logo.png';
    img2 = 'SVA_QRcode.png';
    inputs.name.value = "Student Veterans of America";
    inputs.title.value = "WATSON ROBBINS TAYLOR CENTER";
    inputs.room.value = "Room 325";
    inputs.email.value = "SVA@aum.edu";
} 
else if (cardType === 'VMRC') {
    img1 = 'VMRC_logo.png';
    img2 = 'VMRC_QRcode.png';
    inputs.name.value = "Veterans and Military Resource Center";
    inputs.title.value = "WATSON ROBBINS TAYLOR CENTER";
    inputs.room.value = "Room 325";
    inputs.email.value = "VMRC@aum.edu";
} 
else if (cardType === 'Both') {
    img1 = 'VMRC_logo.png';   // Row 1, Col 1
    img3 = 'SVA_Logo.png';    // Row 1, Col 2
    img2 = 'VMRC_QRcode.png'; // Row 2, Col 1
    img4 = 'SVA_QRcode.png';  // Row 2, Col 2
    inputs.name.value = "SVA & VMRC";
    inputs.title.value = "Veterans and Military Resource Center";
    inputs.room.value = "TAYLOR CENTER, RM 325";
    inputs.email.value = "veterans@aum.edu";
}
else if (cardType === 'VAWS') {
    img1 = 'VMRC_logo.png';
    img2 = 'SVA_Logo.png';
    inputs.name.value = "Individual Veteran";
    inputs.title.value = "VAWS Worker";
    inputs.room.value = "TAYLOR CENTER, RM 325";
    inputs.email.value = "individual@aum.edu";
}

// File Upload Listeners
document.getElementById('logoUpload1').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = (ev) => { img1 = ev.target.result; updateCards(); };
    reader.readAsDataURL(e.target.files[0]);
});

document.getElementById('logoUpload2').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = (ev) => { img2 = ev.target.result; updateCards(); };
    reader.readAsDataURL(e.target.files[0]);
});

function updateCards() {
    const printArea = document.getElementById('printArea');
    printArea.innerHTML = '';
    
    const isBoth = (cardType === 'Both');
    const leftClass = isBoth ? 'card-left grid-layout' : 'card-left';

    for (let i = 0; i < 10; i++) {
        const card = document.createElement('div');
        card.classList.add('card-container');
        
        // Content for the left side
        let imageContent = '';
        if (isBoth) {
            imageContent = `
                <img src="${img1}">
                <img src="${img2}">
                <img src="${img3}">
                <img src="${img4}">
            `;
        } else {
            imageContent = `<img src="${img1}"><img src="${img2}">`;
        }

        card.innerHTML = `
            <div class="${leftClass}">${imageContent}</div>
            <div class="card-right">
                <p class="card-name">${inputs.name.value}</p>
                <p class="card-title">${inputs.title.value}</p>
                <p class="card-room">${inputs.room.value}</p>
                <hr style="border: none; border-top: 1px solid #ccc; width: 100%; margin: 5px 0;">
                <p>${inputs.email.value}</p>
                <p>${inputs.phone.value}</p>
            </div>
        `;
        printArea.appendChild(card);
    }
}
updateCards();