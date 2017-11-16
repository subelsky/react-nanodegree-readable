const baseUrl = 'http://localhost:3001'

const headers = { 
  'Authorization': 'TEST' ,
  'Content-Type': 'application/json'
}

export function apiFetch(path) {
  const url = `${baseUrl}${path}`

  return fetch(url,{ headers })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      return response
    }).then((response) => response.json())
}

export function apiPost(path,body) {
  const url = `${baseUrl}${path}`

  return fetch(url,{ method: 'POST', body, headers })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      return response
    }).then((response) => response.json())
}

export function apiDelete(path) {
  const url = `${baseUrl}${path}`

  return fetch(url,{ method: 'DELETE', headers })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      return response
    }).then((response) => response.json())
}

export function apiPut(path,body) {
  const url = `${baseUrl}${path}`

  return fetch(url,{ method: 'PUT', headers, body })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      return response
    }).then((response) => response.json())
}
