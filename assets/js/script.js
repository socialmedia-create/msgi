document.addEventListener("DOMContentLoaded", function () {
  // Header scroll behavior
  function updateHeaderPosition() {
    const header = document.getElementById("header");
    const isMobile = window.innerWidth < 768;

    if (isMobile && window.scrollY > 10) {
      header.classList.remove("position-fixed");
      header.classList.add("position-static");
    } else {
      header.classList.remove("position-static");
      header.classList.add("position-fixed");
    }
  }


  fetch("googlereview.php")
    .then((response) => response.json())
    .then((reviews) => {
      const carouselInner = document.querySelector("#google-carousel-inner");
      if (!carouselInner) return;
      // console.log(carouselInner.innerHTML);

      carouselInner.innerHTML = ""; // Clear existing content

      reviews.forEach((review, index) => {
        const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
        const activeClass = index === 0 ? "active" : "";

        const item = `
          <div class="carousel-item ${activeClass}">
            <div class="p-4 centertext testimonial-card bg-white text-center">
              <div class="text-warning mb-2 fs-5">${stars}</div>
              <p class="mb-2 testimonialtext">"${review.text}"</p>
              <small class="fw-bold">– ${review.author_name}</small>
            </div>
          </div>
        `;

        carouselInner.insertAdjacentHTML("beforeend", item);
      });
    })
    .catch((error) => {
      console.error("Failed to load Google reviews:", error);
    });

  // Select all dropdown toggles
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  dropdownToggles.forEach((toggle) => {
    const dropdownMenu = toggle.nextElementSibling;

    toggle.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent parent dropdown from closing

      const isOpen = dropdownMenu.classList.contains("show");

      // Close all other dropdowns and submenus
      closeAllDropdowns(toggle);

      if (!isOpen) {
        dropdownMenu.classList.add("show");
        toggle.setAttribute("aria-expanded", "true");
      } else {
        dropdownMenu.classList.remove("show");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // Close all dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown-menu") && !e.target.closest(".dropdown-toggle")) {
      closeAllDropdowns();
    }
  });

  function closeAllDropdowns(excludeToggle = null) {
    dropdownToggles.forEach((toggle) => {
      if (toggle !== excludeToggle) {
        toggle.setAttribute("aria-expanded", "false");
        const menu = toggle.nextElementSibling;
        if (menu) {
          menu.classList.remove("show");
        }
      }
    });
  }

 

 const calendarEl = document.getElementById("calendar");

if (calendarEl) {
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,listWeek"
    },
    googleCalendarApiKey: "AIzaSyAopuRwGvHYNw5SccRfp7oecsnG2-5s0e8",
    events: {
      googleCalendarId:
        "772a98afed8ba44f45383043019305e63ed20954a7d433b9ef314cff9928c99a@group.calendar.google.com"
    },

    eventDidMount: function (info) {
      // Tooltip with Tippy.js
      tippy(info.el, {
        content: `<strong>${info.event.title}</strong><br>${info.event.extendedProps.description || ""}`,
        allowHTML: true,
        theme: "light-border"
      });
    },

    eventsSet: function (events) {
      const container = document.querySelector(".event-ticker-list");
      if (!container) return;

      container.innerHTML = "";

      const now = new Date();
      now.setHours(0, 0, 0, 0);

      const upcomingEvents = events
        .filter(event => {
          const date = new Date(event.start);
          date.setHours(0, 0, 0, 0);
          return date >= now;
        })
        .sort((a, b) => new Date(a.start) - new Date(b.start));

      if (upcomingEvents.length === 0) {
        container.innerHTML = "<p class='text-center'>No upcoming events.</p>";
      } else {
        // Duplicate for infinite scroll
        for (let i = 0; i < 2; i++) {
          upcomingEvents.forEach(event => renderEvent(event, container));
        }
      }
    },

    eventClick: function (info) {
      info.jsEvent.preventDefault(); // disable redirect
    }
  });

  calendar.render();
}

function renderEvent(event, container) {
  const date = new Date(event.start);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" }).toUpperCase();
  const time = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const location = event.extendedProps.location || "Campus";
  const description = event.extendedProps.description || "No description available.";

  const eventHTML = `
    <div class="event-item">
      <div class="event-date">
        <span class="day">${day}</span>
        <span class="month">${month}</span>
      </div>
      <div class="event-content">
        <h3>${event.title}</h3>
        <div class="event-meta">
          <p><i class="bi bi-clock"></i> ${time}</p>
          <p><i class="bi bi-geo-alt"></i> ${location}</p>
        </div>
        <p>${description}</p>
      </div>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", eventHTML);
}




});
