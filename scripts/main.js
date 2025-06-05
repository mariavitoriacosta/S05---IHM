let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const weekdays = ['domingo','segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

function load() {
  const date = new Date();
  if (nav !== 0) date.setMonth(new Date().getMonth() + nav);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const daysMonth = new Date(year, month + 1, 0).getDate();
  const firstDayMonth = new Date(year, month, 1);
  const dateString = firstDayMonth.toLocaleDateString('pt-br', {
    weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric',
  });

  const paddinDays = weekdays.indexOf(dateString.split(', ')[0]);
  const rawMonth = date.toLocaleDateString('pt-br', { month: 'long' });
  const capitalizedMonth = rawMonth.charAt(0).toUpperCase() + rawMonth.slice(1);
  document.getElementById('monthDisplay').innerText = `${capitalizedMonth}, ${year}`;

  calendar.innerHTML = '';

  for (let i = 1; i <= paddinDays + daysMonth; i++) {
    const dayEl = document.createElement('div');
    dayEl.classList.add('day');

    const dayString = `${month + 1}/${i - paddinDays}/${year}`;

    if (i > paddinDays) {
      dayEl.innerText = i - paddinDays;

      const hasEvent = events.some(event => event.date === dayString);
      if (hasEvent) dayEl.classList.add('has-event');

      if (i - paddinDays === day && nav === 0) dayEl.id = 'currentDay';

      dayEl.addEventListener('click', () => openDay(dayString));
    } else {
      dayEl.classList.add('padding');
    }

    calendar.appendChild(dayEl);
  }
}

function openDay(date) {
  clicked = date;
  renderEventList();
}

function renderEventList() {
  const container = document.getElementById('eventListContainer');
  const list = document.getElementById('eventList');
  list.innerHTML = '';

  const filtered = events
    .filter(e => e.date === clicked)
    .sort((a, b) => a.time.localeCompare(b.time)); // Ordena por horário

  if (filtered.length === 0) {
    list.innerHTML = '<li>Nenhum evento para este dia.</li>';
  } else {
    filtered.forEach((e, index) => {
      const li = document.createElement('li');

      // Texto combinado com horário e título
      const contentSpan = document.createElement('span');
      contentSpan.classList.add('event-text');
      contentSpan.textContent = `🕒 ${e.time} - ${e.title}`;

      // Botão de deletar
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.onclick = () => deleteEvent(index);

      // Append no li
      li.appendChild(contentSpan);
      li.appendChild(deleteBtn);

      list.appendChild(li);
    });
  }

  container.style.display = 'block';
}


function deleteEvent(indexToRemove) {
  const filtered = events.filter(e => e.date === clicked);
  const toDelete = filtered[indexToRemove];

  events = events.filter(e => !(e.date === toDelete.date && e.title === toDelete.title && e.time === toDelete.time));
  localStorage.setItem('events', JSON.stringify(events));
  renderEventList();
  load();
}

function addEvent() {
  const titleInput = document.getElementById('newEventInput');
  const timeInput = document.getElementById('eventTimeInput');
  const title = titleInput.value.trim();
  const time = timeInput.value;

  if (!title || !clicked || !time) return;

  events.push({ date: clicked, title, time });
  localStorage.setItem('events', JSON.stringify(events));
  titleInput.value = '';
  timeInput.value = '';
  renderEventList();
  load();
}

document.getElementById('addEventButton').addEventListener('click', addEvent);
document.getElementById('backButton').addEventListener('click', () => { nav--; load(); });
document.getElementById('nextButton').addEventListener('click', () => { nav++; load(); });

load();
