document.addEventListener("DOMContentLoaded", function () {
  const calendarEl = document.getElementById("calendar");
  let calendarInitialized = false;
  let calendar;

  // Handle tab activation (Bootstrap)
  const newsTabButton = document.getElementById("news-tab");
  if (newsTabButton) {
    newsTabButton.addEventListener("shown.bs.tab", function () {
      if (!calendarInitialized && calendarEl) {
        calendar = new FullCalendar.Calendar(calendarEl, {
          initialView: "dayGridMonth",
          headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,listWeek"
          },
          googleCalendarApiKey: "AIzaSyAopuRwGvHYNw5SccRfp7oecsnG2-5s0e8",
          events: {
            googleCalendarId:
              "7b6ff40c2ec6617966569091bf4208976e71f6d877e391475e25ec271f9d904d@group.calendar.google.com"
          },
          eventDidMount: function (info) {
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
              for (let i = 0; i < 2; i++) {
                upcomingEvents.forEach(event => renderEvent(event, container));
              }
            }
          },
          eventClick: function (info) {
            info.jsEvent.preventDefault();
          }
        });

        // Now render the calendar and mark it as initialized
        console.log("Rendering calendar after tab becomes visible");
        calendar.render();

        setTimeout(() => {
          calendar.updateSize();
        }, 200);

        calendarInitialized = true;
      } else if (calendar) {
        // Just update layout if already initialized
        calendar.updateSize();
      }
    });
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
