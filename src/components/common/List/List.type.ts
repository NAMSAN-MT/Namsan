import { SubCategory } from './List'

export type MainCategoryType = {
  id: string
  name: string
  children?: ReturnType<typeof SubCategory>[]
}

export type SubCategoryType = {
  subId: string
  name: string
}
