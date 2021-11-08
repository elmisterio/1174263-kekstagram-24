const getData = (success, error) => fetch('https://24.javascript.pages.academy/kekstagram/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  })
  .then((data) => {
    success(data);
    return data;
  })
  .catch(() => {
    error();
  });

const sendData = (data, success, error) => {
  fetch('https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      credentials: 'same-origin',
      body: data,
    })
    .then((response) => {
      if (response.ok) {
        success();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .catch(() => {
      error();
    });
};

export {sendData, getData};
