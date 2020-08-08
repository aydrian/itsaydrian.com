import React from "react"
import tw from "tailwind.macro"

const Button = tw.a`
  flex items-center w-11/12 m-1 py-2 px-4 font-bold rounded lg:rounded-full shadow bg-site-green lg:w-10 lg:h-10 lg:p-2
`

const Name = tw.span`
  ml-1 lg:hidden
`

const SocialIcon = ({ href, name, children }) => {
  return (
    <Button href={href} title={name}>
      {children}
      <Name>{name}</Name>
    </Button>
  )
}

export default SocialIcon
