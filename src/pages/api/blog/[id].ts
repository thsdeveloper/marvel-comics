import type { NextApiRequest, NextApiResponse } from 'next'
import * as service from '@src/services/noticias'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req

  switch (method) {
    case 'GET':
      try {
        const post = await service.findById(id.toString())

        return res.status(200).json(post)
      } catch (error) {
        return res.status(404).json({
          success: false,
          message: error,
        })
      }
    case 'POST':
      try {
        const post = await service.setNew(req.body)

        return res.status(200).json({
          success: true,
          data: post,
        })
      } catch (error) {
        return res.status(400).json({
          success: false,
          error: error,
        })
      }
    case 'PUT':
      try {
        const post = await service.findByIdAndUpdate(id.toString(), req.body)

        return res.status(200).json({
          success: true,
          data: post,
        })
      } catch (error) {
        return res.status(400).json({
          success: false,
          error: error,
        })
      }
    case 'DELETE':
      try {
        await service.deleteOne(id.toString())

        return res.status(200).json({
          success: true,
          id: id,
        })
      } catch (error) {
        return res.status(400).json({
          success: false,
          error: error,
        })
      }
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      return res
        .status(405)
        .json({ success: false, error: `Method ${method} Not Allowed` })
  }
}
