export default async function execute(api, args) {
  const response = await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })
  
  const data = await response.json()
  return data
}
