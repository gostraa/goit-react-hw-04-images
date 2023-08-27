export async function fetchImages(inputValue, page = 1) {
  const url = 'https://pixabay.com/api/';
  const API_KEY = '38624276-36ed6cbc10c2af1663e372e7f';

  return await fetch(
    `${url}?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => res.json());
}
