export function apiFetch(path) {
  const url = `http://localhost:3001${path}`

  return fetch(url,{
    headers: { 
      'Authorization': 'TEST' 
    },
  }).then((response) => {
    if (!response.ok) {
      throw Error(response.statusText)
    }

    return response
  }).then((response) => response.json())
}

