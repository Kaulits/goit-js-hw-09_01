import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
timePicker: document.querySelector('#datetime-picker'),
startBtn: document.querySelector('[data-start]'),
days: document.querySelector('[data-days]'),
hours: document.querySelector('[data-hours]'),
minutes: document.querySelector('[data-minutes]'),
seconds: document.querySelector('[data-seconds]'),
}

const currentDate = new Date();
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: currentDate,
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (selectedDates[0] <= currentDate) {
          Notiflix.Notify.failure('Please choose a date in the future');
           refs.startBtn.disabled = true;
      } else {
          refs.startBtn.disabled = false;
    };
  },
};

flatpickr(refs.timePicker, options);
let intervalTime;

refs.startBtn.addEventListener('click', () => {
    intervalTime = setInterval(updateTimer, 1000);
    refs.startBtn.disabled = true;
});

function updateTimer() {
    const userDate = refs.timePicker._flatpickr.selectedDates[0];
    const timeDifference = userDate - new Date();
    const { days, hours, minutes, seconds } = convertMs(timeDifference);

    refs.days.textContent = days.toString().padStart(2, '0');
  refs.hours.textContent = hours.toString().padStart(2, '0');
  refs.minutes.textContent = minutes.toString().padStart(2, '0');
    refs.seconds.textContent = seconds.toString().padStart(2, '0');
    
    if (timeDifference <= 0) {
        clearInterval(intervalTime);
        addLeadingZero();
    }
}

function addLeadingZero() {
refs.days.textContent = '00';
    refs.hours.textContent = '00';
    refs.minutes.textContent = '00';
    refs.seconds.textContent = '00';
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}