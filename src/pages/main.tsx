import * as React from 'react'
import { PageProps } from 'gatsby'
import BaseButton from '../components/common/BaseButton'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <BaseButton className="tag" onClick={() => console.log('')}>
      Click me
    </BaseButton>
  )
}

export default IndexPage
