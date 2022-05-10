export default async function execute(api, args) {
  const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ('https://' + process.env.VERCEL_URL)
  const response = await fetch(url + api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })

  const data = await response.json()
  return data
}
