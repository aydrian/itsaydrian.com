import React from "react"
import tw from "tailwind.macro"

const Button = tw.a`
  flex items-center w-11/12 m-1 py-2 px-4 font-bold rounded shadow bg-site-green
`

const Name = tw.span`
  ml-1
`

const SocialIcon = ({ href, name, children }) => {
  return (
    <Button href="href">
      {children}
      <Name>{name}</Name>
    </Button>
  )
}

export default SocialIcon
