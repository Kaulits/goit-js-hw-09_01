import Notiflix from 'notiflix';


const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);



function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
});
}

function onFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(form);

 const delay = Number(formData.get('delay'));
  const step = Number(formData.get('step'));
  const amount = Number(formData.get('amount'));

  // clearResults();

  for (let i = 0; i < amount; i++) {
    const totalDelay = delay + i * step;
       createPromise(i + 1, totalDelay)
      .then(({ position, totalDelay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, totalDelay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
};