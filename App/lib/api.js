export const getByLocationName = (id) => (
  fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=c7fb09a97547cad98330b1788a027a5f&units=imperial`)
    .then((data) => data.json())
    .then((json) => json)
);