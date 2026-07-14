import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// Firebase Configuration
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

// Keys already rendered in standard public sections
const StandardKeys = new Set([
  "firstName", "lastName", "name", "fullName", "designation", "department", "email",
  "phone", "mobile", "contact", "imageUrl", "photo", "photoUrl", "status", "staffId",
  "employeeId", "id", "aicteCode", "aicte", "education", "qualifications", "qualification",
  "experience", "workExperience", "totalYearsOfExperience", "totalExperience", "experienceYears",
  "researchInterests", "specialties", "specialization", "bio", "description", "about"
]);

// Sensitive/Private Keys explicitly excluded for privacy/security
const ExcludedPrivateKeys = new Set([
  "education", "qualifications", "qualification",
  "title", "salutation", "prefix",
  "passport", "passportno", "passport_no", "passportnumber", "passport_number",
  "communityother", "community_other", "custombloodgroup", "custom_blood_group", "customblood",
  "gender", "sex", "age", "bloodgroup", "blood_group", "blood",
  "pan", "panno", "pan_no", "pancard", "pannumber", "pan_number",
  "phone", "mobile", "contact", "phonenumber", "phone_number", "mobile_number",
  "dob", "dateofbirth", "date_of_birth", "birthdate", "password", "pass", "pwd",
  "aadhar", "aadharno", "aadhar_no", "aadharcard", "aadharnumber", "ssn",
  "community", "caste", "religion", "address", "permanentaddress", "residentialaddress",
  "communicationaddress", "street", "pincode", "zipcode", "fathername", "mothername",
  "salary", "pay", "bank", "accountno", "ifsc"
]);

function getInitials(firstName = "", lastName = "") {
  const f = firstName.trim().charAt(0).toUpperCase();
  const l = lastName.trim().charAt(0).toUpperCase();
  return `${f}${l}`;
}

// Convert camelCase or snake_case to Title Case for dynamic labels
function formatLabel(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

/**
 * Format string or URL with blue color and underline
 */
function renderLinkOrText(str) {
  if (!str && str !== 0) return 'NIL';
  const trimmed = String(str).trim();
  if (!trimmed || trimmed === '[]' || trimmed === '{}' || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'undefined') {
    return 'NIL';
  }
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("doi:")) {
    const href = trimmed.startsWith("doi:") ? `https://doi.org/${trimmed.replace("doi:", "")}` : trimmed;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color: #0d6efd !important; text-decoration: underline !important; font-weight: 500;">${trimmed}</a>`;
  }
  return trimmed;
}

/**
 * Safely parses string values that might contain stringified JSON arrays/objects
 */
function parseIfJSON(val) {
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if ((trimmed.startsWith('[') && trimmed.endsWith(']')) || (trimmed.startsWith('{') && trimmed.endsWith('}'))) {
      try {
        return JSON.parse(trimmed);
      } catch (e) {
        return val;
      }
    }
  }
  return val;
}

/**
 * Recursively renders complex or simple values in a clean vertical order (block per field).
 * Empty data items are rendered as NIL instead of [].
 */
function renderValueToHTML(val) {
  const parsed = parseIfJSON(val);

  if (parsed === undefined || parsed === null || parsed === '' || (Array.isArray(parsed) && parsed.length === 0)) {
    return '<span class="text-muted fst-italic">NIL</span>';
  }

  // If array, render clean bullet points list in vertical block format
  if (Array.isArray(parsed)) {
    const itemsHTML = parsed.map(item => {
      const renderedItem = renderValueToHTML(item);
      return `<li class="mb-3 ps-1" style="list-style-type: disc !important; line-height: 1.6;">${renderedItem}</li>`;
    }).join('');
    return `<ul class="ps-3 mb-0" style="list-style-type: disc !important;">${itemsHTML}</ul>`;
  }

  // If object (e.g. { Degree: "...", Institution: "...", Yearofpassing: "...", Field: "..." })
  if (typeof parsed === 'object') {
    const entries = Object.entries(parsed).filter(([_, v]) => v !== undefined && v !== null);
    if (entries.length === 0) return '<span class="text-muted fst-italic">NIL</span>';

    // Render every key-value pair in a VERTICAL block layout
    const verticalLines = entries.map(([k, v]) => {
      const label = formatLabel(k);
      const valText = (v !== undefined && v !== null && String(v).trim() !== '') ? renderLinkOrText(v) : 'NIL';
      return `<div class="mb-1"><strong>${label}:</strong> ${valText}</div>`;
    }).join('');

    return `<div class="vertical-field-card bg-light p-3 rounded-3 border mb-2">${verticalLines}</div>`;
  }

  // Primitive value
  return renderLinkOrText(parsed);
}

async function loadStaffProfile() {
  const loadingState = document.getElementById("loadingState");
  const profileContent = document.getElementById("profileContent");
  const errorState = document.getElementById("errorState");

  // Extract document ID from query string e.g. ?id=xyz
  const urlParams = new URLSearchParams(window.location.search);
  const staffId = urlParams.get("id");

  if (!staffId) {
    if (loadingState) loadingState.classList.add("d-none");
    if (errorState) errorState.classList.remove("d-none");
    return;
  }

  try {
    const docRef = doc(db, "staff", staffId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      if (loadingState) loadingState.classList.add("d-none");
      if (errorState) errorState.classList.remove("d-none");
      return;
    }

    const staff = docSnap.data();
    const fullName = `${staff.firstName || staff.name || ''} ${staff.lastName || ''}`.trim() || 'Faculty Member';

    // Update Title & Banners
    document.title = `${fullName} - Staff Profile | MSEC`;
    const bannerName = document.getElementById("facultyBannerName");
    const breadcrumbName = document.getElementById("facultyBreadcrumbName");
    if (bannerName) bannerName.textContent = fullName;
    if (breadcrumbName) breadcrumbName.textContent = fullName;

    // Standard Public Profile Info
    const profileName = document.getElementById("profileName");
    const profileDesignation = document.getElementById("profileDesignation");
    const profileDepartment = document.getElementById("profileDepartment");
    const profileEmail = document.getElementById("profileEmail");
    const profileStaffId = document.getElementById("profileStaffId");
    const profileStatus = document.getElementById("profileStatus");
    const profileAicteCode = document.getElementById("profileAicteCode");
    const profileTotalExperience = document.getElementById("profileTotalExperience");
    const imageWrapper = document.getElementById("profileImageWrapper");

    if (profileName) profileName.textContent = fullName;
    if (profileDesignation) profileDesignation.textContent = staff.designation || 'Faculty Member';
    if (profileDepartment) profileDepartment.textContent = staff.department || 'NIL';
    if (profileEmail) profileEmail.innerHTML = renderLinkOrText(staff.email || 'NIL');
    if (profileStaffId) profileStaffId.textContent = staff.staffId || staff.employeeId || staffId || 'NIL';
    if (profileAicteCode) profileAicteCode.textContent = staff.aicteCode || staff.aicte || 'NIL';
    
    // Status Badge
    if (profileStatus) {
      const statusVal = (staff.status || 'Active').toLowerCase();
      profileStatus.textContent = statusVal;
      if (statusVal.includes('active')) {
        profileStatus.className = "badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3 py-1";
      } else {
        profileStatus.className = "badge bg-secondary-subtle text-secondary border border-secondary-subtle rounded-pill px-3 py-1";
      }
    }

    if (profileTotalExperience) profileTotalExperience.textContent = staff.totalYearsOfExperience || staff.totalExperience || staff.experienceYears || 'NIL';

    // Avatar / Initials
    if (imageWrapper) {
      const photo = staff.imageUrl || staff.photo || staff.photoUrl;
      if (photo && (photo.startsWith("data:image") || photo.includes("http"))) {
        imageWrapper.innerHTML = `<img src="${photo}" alt="${fullName}" class="w-100 h-100 object-fit-cover">`;
      } else {
        imageWrapper.innerHTML = `<span class="fw-bold text-danger fs-1">${getInitials(staff.firstName, staff.lastName)}</span>`;
      }
    }

    // Render Experience Section
    const experienceContainer = document.getElementById("profileExperience");
    const experienceSection = document.getElementById("experienceSection");
    const expData = staff.experience || staff.workExperience;
    if (experienceContainer) {
      if (expData && expData !== '[]') {
        experienceContainer.innerHTML = renderValueToHTML(expData);
      } else {
        experienceContainer.innerHTML = '<p class="text-muted fst-italic ps-2">NIL</p>';
      }
    }

    // Render Research Interests / Specialties Section
    const researchContainer = document.getElementById("profileResearchInterests");
    const researchSection = document.getElementById("researchSection");
    const researchData = staff.researchInterests || staff.specialties || staff.specialization;
    if (researchContainer) {
      const parsedRes = parseIfJSON(researchData);
      if (Array.isArray(parsedRes) && parsedRes.length > 0) {
        researchContainer.innerHTML = parsedRes
          .map(res => `<span class="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3 py-2 font-medium">${res}</span>`)
          .join(" ");
      } else if (researchData && researchData !== '[]') {
        researchContainer.innerHTML = renderValueToHTML(researchData);
      } else {
        researchContainer.innerHTML = '<p class="text-muted fst-italic">NIL</p>';
      }
    }

    // Render Bio / Description
    const bioElem = document.getElementById("profileBio");
    const bioSection = document.getElementById("bioSection");
    const bioData = staff.bio || staff.description || staff.about;
    if (bioElem) {
      if (bioData && String(bioData).trim() !== '' && bioData !== '[]') {
        bioElem.innerHTML = renderValueToHTML(bioData);
      } else {
        bioElem.innerHTML = '<span class="text-muted fst-italic">NIL</span>';
      }
    }

    // DYNAMIC SCHEMA REFLECTION: Two-column vertical layout grid with NIL fallbacks
    const dynamicFieldsContainer = document.getElementById("dynamicSchemaFields");
    if (dynamicFieldsContainer) {
      const extraPublicFields = Object.keys(staff).filter(key => {
        const lowerKey = key.toLowerCase().trim();
        return !StandardKeys.has(key) && !ExcludedPrivateKeys.has(lowerKey);
      });

      if (extraPublicFields.length > 0) {
        let dynamicHTML = `<div class="row g-4">`;
        
        extraPublicFields.forEach(key => {
          const val = staff[key];
          const formattedContent = renderValueToHTML(val);
          
          dynamicHTML += `
            <div class="col-md-6">
              <div class="p-3 bg-white border rounded-3 h-100">
                <h5 class="fw-bold text-dark border-bottom pb-2 mb-3"><i class="bi bi-journal-text text-danger me-2"></i>${formatLabel(key)}</h5>
                <div class="ps-1">
                  ${formattedContent}
                </div>
              </div>
            </div>`;
        });

        dynamicHTML += `</div>`;
        dynamicFieldsContainer.innerHTML = dynamicHTML;
      }
    }

    // Show Content
    if (loadingState) loadingState.classList.add("d-none");
    if (profileContent) profileContent.classList.remove("d-none");

  } catch (error) {
    console.error("Error loading staff profile:", error);
    if (loadingState) loadingState.classList.add("d-none");
    if (errorState) errorState.classList.remove("d-none");
  }
}

document.addEventListener("DOMContentLoaded", loadStaffProfile);
