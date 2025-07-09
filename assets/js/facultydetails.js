import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJm0LiLJchN86HzeCJHn3qKqdOhv0H_DE",
  authDomain: "niranjan-58d39.firebaseapp.com",
  projectId: "niranjan-58d39",
  storageBucket: "niranjan-58d39.firebasestorage.app",
  messagingSenderId: "686044853285",
  appId: "1:686044853285:web:5b08fbac20d2c80bdd7bcc",
  measurementId: "G-L30Y7NK061"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Map department names to tab IDs
const departmentTabMap = {
  "Department of Information Technology": "faculty--staff-tab-1",
  "CSE": "faculty--staff-tab-2",
  "AI DS": "faculty--staff-tab-3",
  "ECE": "faculty--staff-tab-4",
  "Civil Engineering" : "faculty--staff-tab-7",
   "Mechanical Engineering" : "faculty--staff-tab-6",
   "EEE" : "faculty--staff-tab-5",
     "Physics": "faculty--staff-tab-8",
  "Mathematics": "faculty--staff-tab-8",
  "English": "faculty--staff-tab-8",
  "Tamil": "faculty--staff-tab-8"

  // Add more departments here if needed
};

async function loadFaculty() {
  const querySnapshot = await getDocs(collection(db, "staff"));

  querySnapshot.forEach((doc) => {
    const staff = doc.data();

    const department = staff.department?.trim();
    const tabId = departmentTabMap[department];
    if (!tabId) return; // Skip unknown departments

    const tabContainer = document.querySelector(`#${tabId} .row.g-4`);
    if (!tabContainer) return;

    const photoUrl = staff.imageUrl || "https://via.placeholder.com/80";

    const card = `
  <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="400">
    <a href="https://staff-management-msec.web.app/" target="_blank" style="text-decoration: none; color: inherit;">
      <div class="faculty-card m-1 row align-items-center justify-content-center">
        <div class="faculty-image1 d-flex align-items-center justify-content-center" style="height: 120px; width: 120px; background-color: #f8f9fa; border-radius: 50%;">
          ${
            staff.imageUrl
              ? `<img src="${staff.imageUrl}" class="img-fluid" alt="" style="max-height: 100%; max-width: 100%; object-fit: cover; border-radius: 50%;">`
              : `<div class="initials" style="font-size: 36px; font-weight: bold; color: red;">
                  ${staff.firstName?.charAt(0) || ''}${staff.lastName?.charAt(0) || ''}
                </div>`
          }
        </div>
        <div class="faculty-info">
          <h4 class="text-center">${staff.firstName || 'No Name'} ${staff.lastName || ''}</h4>
          <p class="faculty-title text-center text-danger">${staff.designation || ''}, ${staff.department || ''}</p>
          <div class="faculty-specialties text-center">
            ${(staff.specialties || []).map(spec => `<span>${spec}</span>`).join('')}
          </div>
        </div>
      </div>
    </a>
  </div>
`;

    tabContainer.innerHTML += card;
  });

  AOS.init(); // Re-init animations
}

loadFaculty();
