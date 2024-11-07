import express from 'express'
import { getPuppyById, deletePuppy, addPuppy } from '../../store.ts'
import * as fs from 'node:fs/promises'

const router = express.Router()

router.get('/', async (req, res) => {
  const json = await fs.readFile('./storage/data.json', 'utf8')
  const data = JSON.parse(json)
  res.json(data)
})

router.get('/:id', async (req, res) => {
  console.log('Route: get /:id')
  const id = Number(req.params.id)

  const puppy = await getPuppyById(id)
  if (!puppy) return res.sendStatus(404)

  res.json(puppy)
})

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id)
  await deletePuppy(id)
  res.status(200).json({ message: 'Puppy has been Deleted' })
})

router.post('/', async (req, res) => {
  try {
    const id = await addPuppy(req.body)
    res.json({ id })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export default router
