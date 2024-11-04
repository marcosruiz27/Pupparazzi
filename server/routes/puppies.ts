import express from 'express'
import * as fs from 'node:fs/promises'

const router = express.Router()

router.get('/', async (req, res) => {
  const json = await fs.readFile('./storage/data.json', 'utf8')
  const data = JSON.parse(json)
  res.json(data)
})

export default router
