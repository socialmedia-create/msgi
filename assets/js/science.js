// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAJm0LiLJchN86HzeCJHn3qKqdOhv0H_DE",
  authDomain: "niranjan-58d39.firebaseapp.com",
  projectId: "niranjan-58d39",
  storageBucket: "niranjan-58d39.appspot.com",
  messagingSenderId: "686044853285",
  appId: "1:686044853285:web:5b08fbac20d2c80bdd7bcc",
  measurementId: "G-L30Y7NK061"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Designation priority helper
function getDesignationPriority(designation = "") {
  const d = designation.trim().toLowerCase();
  if (d.includes("hod")) return 1;
  if (d === "professor") return 2;
  if (d.includes("lab assistant")) return 3;
  if (d.includes("assistant")) return 4;
  return 5;
}

// Initials fallback for no image
function getInitials(firstName = "", lastName = "") {
  const f = firstName.trim().charAt(0).toUpperCase();
  const l = lastName.trim().charAt(0).toUpperCase();
  return `${f}${l}`;
}

// Main function: load and display grouped staff
async function loadFacultyByDepartments() {
  const querySnapshot = await getDocs(collection(db, "staff"));

  // Departments and their corresponding div IDs
  const departments = {
    "Mathematics": "mathsfaculty",
    "Physics": "physicsfaculty",
    "English": "englishfaculty",
    "Tamil": "tamilfaculty"
  };

  // Group staff
  const groupedFaculty = {};
  querySnapshot.docs.forEach(doc => {
    const staff = doc.data();
    const dept = staff.department?.trim();
    if (departments[dept]) {
      if (!groupedFaculty[dept]) groupedFaculty[dept] = [];
      groupedFaculty[dept].push(staff);
    }
  });

  // Render each department
  for (const [deptName, divId] of Object.entries(departments)) {
    const container = document.getElementById(divId);
    if (!container) continue;

    // Section heading
    const heading = document.createElement("h2");
    heading.className = "text-center mb-4";
    heading.textContent = `Faculty – ${deptName}`;
    container.appendChild(heading);

    const cardRow = document.createElement("div");
    cardRow.className = "row g-4 mb-5";

    const sortedFaculty = (groupedFaculty[deptName] || []).sort(
      (a, b) => getDesignationPriority(a.designation) - getDesignationPriority(b.designation)
    );

    sortedFaculty.forEach((staff) => {
      const card = document.createElement("div");
      card.className = "col-md-6 col-lg-4";
      card.setAttribute("data-aos", "fade-up");
      card.setAttribute("data-aos-delay", "200");

      const imageHTML = staff.imageUrl && (staff.imageUrl.startsWith("http") || staff.imageUrl.startsWith("data:image"))
        ? `<img src="${staff.imageUrl}" class="img-fluid" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%;">`
        : `<div class="d-flex align-items-center justify-content-center rounded-circle text-danger"
              style="width: 100px; height: 100px; font-size: 36px; font-weight: bold; text-transform: uppercase; margin: 0 auto;">
              ${getInitials(staff.firstName, staff.lastName)}
           </div>`;

      card.innerHTML = `
        <a href="https://staff-management-msec.web.app/" target="_blank" style="text-decoration: none; color: inherit;">
          <div class="faculty-card m-1 row align-items-center justify-content-center">
            <div class="faculty-image1 text-center mb-2">
              ${imageHTML}
            </div>
            <div class="faculty-info">
              <h4 class="text-center">${staff.firstName || 'No Name'} ${staff.lastName || ''}</h4>
              <p class="faculty-title text-center text-danger">${staff.designation || ''}</p>
              <p class="text-center text-muted mb-2"><small>${staff.department || ''}</small></p>
              <div class="faculty-specialties">
                ${(staff.specialties || []).map(spec => `<span>${spec}</span>`).join('')}
              </div>
            </div>
          </div>
        </a>
      `;

      cardRow.appendChild(card);
    });

    container.appendChild(cardRow);
  }

  // Initialize animation
  AOS.init();
}

// Call the loader
loadFacultyByDepartments();
