import type { NextApiRequest, NextApiResponse } from 'next'
import * as service from '@src/services/noticias'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      try {
        const post = await service.getList()

        return res.status(200).json(post)
      } catch (error) {
        return res.status(404).json({
          success: false,
          message: error,
        })
      }
    case 'POST':
      try {
        await service.setNew(req.body)

        return res.status(200).json({
          success: true,
        })
      } catch (error) {
        return res.status(400).json({
          success: false,
          error: error,
        })
      }
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      return res
        .status(405)
        .json({ success: false, error: `Method ${method} Not Allowed` })
  }
}
