import axios from 'axios'

import md5 from 'md5'

export default async function handler(req, res) {
  const { id } = req.query

  if (id !== 'undefined') {
    const api = 'http://gateway.marvel.com/v1/public/comics/' + id + '?ts='
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
      const comic = JSON.parse(JSON.stringify(data.data['data'].results[0]))
      // console.log(comic)
      res.status(200).json(comic)
    } catch (e) {
      console.log(e)
      res.status(400).end()
    }
  }
  res.status(200).end()
}
