const addFavorite = () => {
  const form = document.forms.suggestionForm;
  const formData = new FormData(form);
  const city = formData.get('city');
  const dist = formData.get('dist');
  const purpose = formData.get('purpose');

  let data = {
    city,
    dist,
    purpose,
  };

  fetch('https://weather-dressing.herokuapp.com/weather/favorite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    console.log('request complete! response:', res);
  });
};
