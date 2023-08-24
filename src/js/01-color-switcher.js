
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    bodyEl: document.body,
}

let colorSwitch;


refs.startBtn.addEventListener('click', startBtnClick);
refs.stopBtn.addEventListener('click', stopBtnClick);

function startBtnClick() {
    refs.startBtn.disabled = true;
    colorSwitch = setInterval(() => {
        refs.bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000)
};

function stopBtnClick() {
    refs.startBtn.disabled = false;
    clearInterval(colorSwitch);
};