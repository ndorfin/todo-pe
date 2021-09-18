export const SubmitFormHandler = () =>
  document.addEventListener('submit', (event) => {
    event.preventDefault();
    const sourceForm = event.target;
    const payload = Object.fromEntries(new FormData(sourceForm));

    fetch(
      sourceForm.action, 
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(response => response.json())
    .then(body => {
      if (body.type === 'success') {
        window.location.href = sourceForm.dataset.success;
      } else {
        
      }
    })
  });
