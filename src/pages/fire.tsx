import { HeadFC, PageProps } from 'gatsby'
import React, { useEffect } from 'react'
import { getMainNewsList } from '../api/news.api'

const fire: React.FC<PageProps> = () => {
  useEffect(() => {
    test()
  }, [])

  const test = async () => {
    const mainList = await getMainNewsList()
    console.log(mainList)
  }
  return <p>Hello </p>
}

export default fire
export const Head: HeadFC = () => <title>Home Page</title>
