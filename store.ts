// TODO: Write your fs functions that affect the puppy data in this file and export them.

import type { Puppy, PuppyData } from './models/Puppy.ts'
import * as fs from 'node:fs/promises'

export async function getPuppyById(id: number): Promise<Puppy | undefined> {
  const puppies = await getAllPuppies()
  return puppies.find((puppy) => puppy.id === id)
}

export async function getAllPuppies(): Promise<Puppy[]> {
  const json = await fs.readFile('./storage/data.json', 'utf8')
  const data = JSON.parse(json)
  return data.puppies
}

export async function deletePuppy(id: number): Promise<void> {
  const puppies = await getAllPuppies()
  const updatedPuppies = puppies.filter((puppy) => puppy.id !== id)
  await fs.writeFile(
    './storage/data.json',
    JSON.stringify({ puppies: updatedPuppies }, null, 2),
  )
}
