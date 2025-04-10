const planner = document.getElementById('planner');
const startHour = 9;
const endHour = 17;
const now = new Date();

function getTimeClass(hour) {
  const currentHour = now.getHours();
  if (hour < currentHour) return 'past';
  if (hour === currentHour) return 'present';
  return 'future';
}

for (let hour = startHour; hour <= endHour; hour++) {
  const savedText = localStorage.getItem(`hour-${hour}`) || '';
  const timeClass = getTimeClass(hour);

  const block = document.createElement('div');
  block.className = `time-block ${timeClass}`;

  const label = document.createElement('div');
  label.className = 'hour';
  label.textContent = formatHour(hour);

  const textarea = document.createElement('textarea');
  textarea.value = savedText;
  textarea.id = `text-${hour}`;

  const saveBtn = document.createElement('button');
  saveBtn.className = 'saveBtn';
  saveBtn.textContent = 'Save';
  saveBtn.addEventListener('click', () => {
    localStorage.setItem(`hour-${hour}`, textarea.value);
  });

  block.appendChild(label);
  block.appendChild(textarea);
  block.appendChild(saveBtn);

  planner.appendChild(block);
}

function formatHour(hour) {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${displayHour} ${ampm}`;
}
