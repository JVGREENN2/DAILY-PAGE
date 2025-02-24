// SELECIONA ELEMENTOS DO DOM E ARMAZENA EM VARIÁVEIS
const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");
const eventDay = document.querySelector(".event-day");
const eventDate = document.querySelector(".event-date");
const eventsContainer = document.querySelector(".events");
const addEventBtn = document.querySelector(".add-event");
const addEventWrapper = document.querySelector(".add-event-wrapper");
const addEventCloseBtn = document.querySelector(".close");
const addEventTitle = document.querySelector(".event-name");
const addEventFrom = document.querySelector(".event-time-from");
const addEventTo = document.querySelector(".event-time-to");
const addEventSubmit = document.querySelector(".add-event-btn");

// OBTÉM DATA ATUAL E DEFINE VARIÁVEIS DE MÊS E ANO
let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

// ARRAY COM NOMES DOS MESES
const months = [
  "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO",
  "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO",
];

// ARRAY PARA ARMAZENAR EVENTOS
const eventsArr = [];
getEvents();
console.log(eventsArr);

// FUNÇÃO PARA INICIALIZAR O CALENDÁRIO
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    let event = false;
    let dayOfWeek = new Date(year, month, i).getDay(); // OBTÉM O DIA DA SEMANA

    eventsArr.forEach((eventObj) => {
        if (eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year) {
            event = true;
        }
    });

    let extraLabel = dayOfWeek === 5 ? `<div class="extra-label">SEM(🥩)</div>` : ""; // ADICIONA A MENSAGEM SE FOR SEXTA-FEIRA

    if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
        activeDay = i;
        getActiveDay(i);
        updateEvents(i);
        if (event) {
            days += `<div class="day today active event">${i}${extraLabel}</div>`;
        } else {
            days += `<div class="day today active">${i}${extraLabel}</div>`;
        }
    } else {
        if (event) {
            days += `<div class="day event">${i}${extraLabel}</div>`;
        } else {
            days += `<div class="day">${i}${extraLabel}</div>`;
        }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

// FUNÇÕES PARA NAVEGAR ENTRE OS MESES ANTERIOR E PRÓXIMO
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

// ADICIONA EVENT LISTENERS AOS BOTÕES DE NAVEGAÇÃO
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

// CHAMA A FUNÇÃO PARA INICIALIZAR O CALENDÁRIO
initCalendar();

// FUNÇÃO PARA ADICIONAR LISTENERS AOS DIAS DO CALENDÁRIO
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      const dayNumber = Number(e.target.innerText.trim().replace("SEM(🥩)", "").trim()); // REMOVE A MENSAGEM "SEM(🥩)" AO OBTER O NÚMERO DO DIA
      getActiveDay(dayNumber);
      updateEvents(dayNumber);
      activeDay = dayNumber;

      days.forEach((day) => {
        day.classList.remove("active");
      });

      if (e.target.classList.contains("prev-date")) {
        prevMonth();

        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              Number(day.innerText.trim().replace("SEM(🥩)", "").trim()) === dayNumber
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();

        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              Number(day.innerText.trim().replace("SEM(🥩)", "").trim()) === dayNumber
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

// ADICIONA EVENT LISTENER AO BOTÃO "HOJE"
todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

// FORMATA A DATA DE ENTRADA NO INPUT DE DATA
dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

// ADICIONA EVENT LISTENER AO BOTÃO "IR PARA"
gotoBtn.addEventListener("click", gotoDate);

// FUNÇÃO PARA IR PARA UMA DATA ESPECÍFICA
function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("DATA INDISPONÍVEL");
}

// FUNÇÃO PARA OBTER O DIA ATIVO
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const weekdays = ["DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO"];
  const dayName = weekdays[day.getDay()];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

// FUNÇÃO PARA ATUALIZAR OS EVENTOS DO DIA ATIVO
function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>NENHUM EVENTO</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

// ADICIONA EVENT LISTENER AO BOTÃO DE ADICIONAR EVENTO
addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

// ADICIONA EVENT LISTENER AO BOTÃO DE FECHAR O FORMULÁRIO DE ADICIONAR EVENTO
addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

// FECHA O FORMULÁRIO DE ADICIONAR EVENTO QUANDO CLICA FORA DELE
document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

// LIMITA O NÚMERO DE CARACTERES DO TÍTULO DO EVENTO
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});

// FORMATA O CAMPO DE TEMPO DE INÍCIO DO EVENTO
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

// FORMATA O CAMPO DE TEMPO DE TÉRMINO DO EVENTO
addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

// ADICIONA EVENTOS AO CALENDÁRIO
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("POR FAVOR PREENCHA TODOS OS CAMPOS");
    return;
  }

  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("FORMATO DE HORA INVÁLIDO");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("EVENTO JÁ ADICIONADO");
    return;
  }
  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };
  console.log(newEvent);
  console.log(activeDay);
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  console.log(eventsArr);
  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  updateEvents(activeDay);

  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});

// REMOVE EVENTOS DO CALENDÁRIO
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    if (confirm("QUER MESMO REMOVER ESSE EVENTO?")) {
      const eventTitle = e.target.children[0].children[1].innerHTML;
      eventsArr.forEach((event) => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.title === eventTitle) {
              event.events.splice(index, 1);
            }
          });

          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);

            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      updateEvents(activeDay);
    }
  }
});

// FUNÇÃO PARA SALVAR EVENTOS NO LOCAL STORAGE
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

// FUNÇÃO PARA OBTER EVENTOS DO LOCAL STORAGE
function getEvents() {
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

// FUNÇÃO PARA CONVERTER O FORMATO DE TEMPO
function convertTime(time) {
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}
