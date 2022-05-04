import axios from 'axios'

import md5 from 'md5'

export default async function handler(req, res) {
  const { offset } = req.body

  const api =
    'http://gateway.marvel.com/v1/public/comics?orderBy=title&limit=50&offset=' +
    offset +
    '&ts='
  const timestamp = new Date().toISOString()
  const hash = md5(
    timestamp +
      process.env.MARVEL_PRIVATE_API_KEY +
      process.env.NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY
  )
  const apiUrl =
    api +
    timestamp +
    '&apikey=' +
    process.env.NEXT_PUBLIC_MARVEL_PUBLIC_API_KEY +
    '&hash=' +
    hash

  try {
    const data = await axios.get(apiUrl)
    const comics = JSON.parse(JSON.stringify(data.data['data'].results))
    // console.log(comics)
    res.status(200).json(comics)
  } catch (e) {
    console.log(e.message)
    res.status(400).end()
  }
}
