import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

refs.form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
 return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}`));
    } else {
      reject(Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}`));
    }
  });

}


function onFormSubmit(e) {
  e.preventDefault();
  const amount = Number(refs.amount.value);
  const delay = Number(refs.delay.value);
  const step = Number(refs.step.value);

  for (let i = 1; i <= amount; i++) {
    let totalDelay = delay + step * (i - 1);
    setTimeout(() => {
      createPromise(i, totalDelay);
    }, totalDelay);
  }
  refs.form.reset();
}

