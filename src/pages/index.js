import React from "react"
import styled from "@emotion/styled"
import tw from "tailwind.macro"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import SocialIcon from "../components/social-icon"

const ImageWrapper = styled.div`
  ${tw`sm:relative lg:w-48 lg:mx-auto lg:my-5`}

  img {
    ${tw`lg:rounded-full`}
  }
`

const InfoWrapper = styled.div`
  ${tw`
    sm:absolute lg:relative sm:bottom-0 sm:w-full lg:w-64 lg:mx-auto sm:object-cover sm:left-0 p-2 text-gray-900 lg:text-center lg:rounded
  `}

  background-color: rgba(182, 196, 84, 0.75)
`

const StyledP = tw.p`
  text-xs text-gray-800
`

/*
const StyledA = tw.a`
  
`
 */

const Title = tw.h1`
  relative text-xl
`

const Social = tw.div`
  flex flex-wrap justify-around p-2 text-xl text-gray-900 lg:justify-center
`

const IndexPage = () => (
  <Layout>
    <SEO />
    <div className="relative">
      <ImageWrapper>
        <Image />
      </ImageWrapper>
      <InfoWrapper>
        <Title>Aydrian Howard</Title>
        <StyledP>
          Hoosier in the Big City. NYC.
          <br />
          Pug Dad. Uncle. Nerd.
          <br />
          Developer Advocate at <a href="https://trycourier.com">
            Courier
          </a>{" "}
          👨🏻‍💻🥑
          <br />
          <a href="http://pronoun.is/he/him/his">he/him/his</a>
        </StyledP>
      </InfoWrapper>
    </div>
    <Social>
      <SocialIcon href="https://github.com/aydrian" name="GitHub">
        <svg
          className="h-10 w-10 fill-current text-site-blue"
          viewBox="0 0 40 40"
        >
          <path d="M36 20.3c0 3.5-1 6.6-3.1 9.4-2 2.8-4.7 4.7-7.9 5.8-.4.1-.6 0-.8-.1-.2-.2-.3-.4-.3-.6v-4.4c0-1.3-.4-2.3-1.1-3 .8-.1 1.5-.2 2.1-.4.6-.2 1.3-.4 2-.8s1.2-.8 1.7-1.4c.5-.5.8-1.3 1.1-2.2s.4-2 .4-3.1c0-1.7-.5-3.1-1.6-4.3.5-1.3.5-2.7-.2-4.2-.4-.1-1 0-1.7.2-.7.3-1.4.6-1.9.9l-.7.4c-1.3-.4-2.6-.5-4-.5s-2.7.2-4 .5c-.2-.2-.5-.3-.9-.6-.4-.2-.9-.5-1.7-.8-.8-.3-1.4-.4-1.8-.3-.6 1.6-.7 3-.1 4.2-1.1 1.2-1.6 2.6-1.6 4.3 0 1.2.1 2.2.4 3.1s.6 1.6 1.1 2.2 1 1 1.7 1.4c.7.4 1.3.6 2 .8.6.2 1.3.3 2.1.4-.6.5-.9 1.2-1 2.1l-.9.3c-.3.1-.7.1-1.2.1s-.9-.1-1.4-.4c-.5-.3-.8-.7-1.2-1.3-.3-.4-.6-.8-1-1.1-.4-.3-.8-.4-1-.5l-.5.1c-.3 0-.5 0-.6.1-.1.1-.1.1-.1.2s.1.2.2.3c.1.1.2.2.3.2l.1.1c.3.1.6.4.9.8s.5.7.7 1.1l.2.5c.2.5.5 1 .9 1.3.4.3.9.5 1.4.6.5.1 1 .1 1.4.1.5 0 .9 0 1.2-.1l.5-.1v3c0 .2-.1.5-.3.6-.2.2-.5.2-.8.1-3.2-1.1-5.8-3-7.9-5.8S4 23.8 4 20.3c0-2.9.7-5.6 2.1-8S9.5 7.8 12 6.4s5.1-2.1 8-2.1 5.6.7 8 2.1 4.4 3.4 5.8 5.8 2.2 5.2 2.2 8.1z" />
        </svg>
      </SocialIcon>
      <SocialIcon href="http://twitter.com/itsaydrian" name="Twitter">
        <svg
          className="h-10 w-10 fill-current text-site-blue"
          viewBox="0 0 40 40"
        >
          <path d="M36.3 10.2c-1 1.3-2.1 2.5-3.4 3.5v1c0 1.7-.2 3.6-.9 5.3-.6 1.7-1.2 3.5-2.4 5.1-1.1 1.5-2.3 3.1-3.7 4.3-1.4 1.2-3.3 2.3-5.3 3-2.1.8-4.2 1.2-6.6 1.2-3.6 0-7-1-10.2-3 .4 0 1.1.1 1.5.1 3.1 0 5.9-1 8.2-2.9-1.4 0-2.7-.4-3.8-1.3-1.2-1-1.9-2-2.2-3.3.4.1 1 .1 1.2.1.6 0 1.2-.1 1.7-.2-1.4-.3-2.7-1.1-3.7-2.3s-1.4-2.6-1.4-4.2v-.1c1 .6 2 .9 3 .9-1-.6-1.5-1.3-2.2-2.4-.6-1-.9-2.1-.9-3.3s.3-2.3 1-3.4c1.5 2.1 3.6 3.6 6 4.9s4.9 2 7.6 2.1c-.1-.6-.1-1.1-.1-1.4 0-1.8.8-3.5 2-4.7 1.2-1.2 2.9-2 4.7-2 2 0 3.6.8 4.8 2.1 1.4-.3 2.9-.9 4.2-1.5-.4 1.5-1.4 2.7-2.9 3.6 1.3-.2 2.6-.5 3.8-1.2z" />
        </svg>
      </SocialIcon>
      <SocialIcon href="https://www.instagram.com/itsaydrian/" name="Instagram">
        <svg
          className="h-10 w-10 fill-current text-site-blue"
          viewBox="0 0 40 40"
        >
          <path d="M20 7c4.2 0 4.7 0 6.3.1 1.5.1 2.3.3 3 .5.7.4 1.2.7 1.8 1.3.5.5.9 1.1 1.2 1.8.2.5.5 1.4.5 3 .2 1.6.2 2.1.2 6.3s0 4.7-.1 6.3c-.1 1.5-.3 2.3-.5 3-.3.7-.6 1.2-1.2 1.8-.5.5-1.1.9-1.8 1.2-.5.2-1.4.5-3 .5-1.7.2-2.2.2-6.4.2s-4.7 0-6.3-.1c-1.5-.1-2.3-.3-3-.5-.7-.4-1.2-.7-1.8-1.3-.5-.5-.9-1.1-1.2-1.8-.2-.5-.5-1.4-.5-3C7 24.7 7 24.2 7 20s0-4.7.1-6.3c.1-1.5.3-2.3.5-3 .4-.7.7-1.2 1.3-1.8.5-.5 1.1-.9 1.8-1.2.5-.2 1.4-.5 3-.5 1.6-.1 2.1-.2 6.3-.2zm0-2.7c-4.3 0-4.8 0-6.5.1-1.6 0-2.8.3-3.8.7-1 .4-1.9.9-2.8 1.8-.9.9-1.4 1.8-1.8 2.8-.4 1-.6 2.1-.7 3.8-.1 1.7-.1 2.2-.1 6.5s0 4.8.1 6.5c0 1.6.3 2.8.7 3.8.4 1 .9 1.9 1.8 2.8.9.9 1.7 1.4 2.8 1.8 1 .4 2.1.6 3.8.7 1.6.1 2.2.1 6.5.1s4.8 0 6.5-.1c1.6-.1 2.9-.3 3.8-.7 1-.4 1.9-.9 2.8-1.8.9-.9 1.4-1.7 1.8-2.8.4-1 .6-2.1.7-3.8.1-1.6.1-2.2.1-6.5s0-4.8-.1-6.5c-.1-1.6-.3-2.9-.7-3.8-.4-1-.9-1.9-1.8-2.8-.9-.9-1.7-1.4-2.8-1.8-1-.4-2.1-.6-3.8-.7-1.7-.1-2.2-.1-6.5-.1z" />
          <path d="M20 11.9c-4.5 0-8.1 3.7-8.1 8.1s3.7 8.1 8.1 8.1 8.1-3.7 8.1-8.1-3.6-8.1-8.1-8.1zm0 13.3c-2.9 0-5.2-2.3-5.2-5.2s2.3-5.2 5.2-5.2 5.2 2.3 5.2 5.2-2.3 5.2-5.2 5.2zM30.6 11.6c0 1-.8 1.9-1.9 1.9-1 0-1.9-.8-1.9-1.9s.8-1.9 1.9-1.9c1.1 0 1.9.8 1.9 1.9z" />
        </svg>
      </SocialIcon>
      <SocialIcon href="https://twitch.tv/itsaydrian" name="Twitch">
        <svg
          className="h-10 w-10 fill-current text-site-blue"
          viewBox="0 0 40 40"
        >
          <path d="M20 13.9v8.4h-2.8v-8.4H20zm7.7 0v8.4h-2.8v-8.4h2.8zm0 14.6l4.9-4.9V8.3h-23v20.2h6.3v4.2l4.2-4.2h7.6zm7.7-23v19.6L27 33.5h-6.3l-4.2 4.2h-4.2v-4.2H4.6V11.1l2.1-5.6h28.7z" />
        </svg>
      </SocialIcon>
      <SocialIcon
        href="https://www.youtube.com/channel/UC49Houj717WfDbrEYlChQ7A"
        name="YouTube"
      >
        <svg
          className="h-10 w-10 fill-current text-site-blue"
          viewBox="0 0 40 40"
        >
          <path d="M24.3 27v4.2c0 .9-.3 1.3-.8 1.3-.3 0-.6-.1-.9-.4v-6c.3-.3.6-.4.9-.4.5-.1.8.4.8 1.3zm6.8 0v.9h-1.8V27c0-.9.3-1.4.9-1.4.6 0 .9.5.9 1.4zm-19.4-4.4h2.1v-1.9H7.6v1.9h2.1V34h2V22.6zm5.8 11.5h1.8v-9.9h-1.8v7.6c-.4.6-.8.8-1.1.8-.2 0-.4-.1-.4-.4v-8h-1.8V32c0 .7.1 1.1.2 1.5.2.5.5.7 1.2.7.6 0 1.3-.4 2-1.2l-.1 1.1zm8.6-3v-4c0-1-.1-1.6-.2-2-.2-.7-.7-1.1-1.4-1.1s-1.3.4-1.9 1.1v-4.4h-1.8V34h1.8v-1c.6.7 1.2 1.1 1.9 1.1s1.2-.4 1.4-1.1c.1-.3.2-.9.2-1.9zm6.8-.2v-.3H31v1.2c-.1.5-.4.7-.8.7-.6 0-.9-.5-.9-1.4v-1.7h3.6v-2.1c0-1.1-.2-1.8-.5-2.3-.5-.7-1.2-1-2.1-1-.9 0-1.6.3-2.1 1-.4.5-.6 1.3-.6 2.3v3.5c0 1.1.2 1.8.6 2.3.5.7 1.2 1 2.2 1 1 0 1.7-.4 2.2-1.1.2-.4.4-.7.4-1.1-.1 0-.1-.4-.1-1zM20.7 12.5V8.3c0-.9-.3-1.4-.9-1.4-.6 0-.9.5-.9 1.4v4.2c0 .9.3 1.4.9 1.4.6.1.9-.4.9-1.4zm14.4 15.1c0 3.1-.2 5.5-.5 7-.2.8-.6 1.5-1.2 2s-1.3.8-2 .9c-2.5.3-6.2.4-11.1.4s-8.7-.1-11.1-.4c-.8-.1-1.5-.4-2.1-.9-.6-.5-1-1.2-1.2-2-.3-1.5-.5-3.8-.5-7 0-3.1.2-5.5.5-7 .2-.8.6-1.5 1.2-2s1.3-.9 2.1-.9c2.5-.3 6.2-.4 11.1-.4s8.7.1 11.1.4c.8.1 1.5.4 2.1.9.6.5 1 1.2 1.2 2 .2 1.5.4 3.8.4 7zM15.1 2h2l-2.4 8v5.4h-2V10c-.2-1-.6-2.4-1.2-4.3-.5-1.4-.9-2.6-1.3-3.8h2.1l1.4 5.3L15.1 2zm7.4 6.7v3.5c0 1.1-.2 1.9-.6 2.4-.5.7-1.2 1-2.1 1-.9 0-1.6-.3-2.1-1-.4-.5-.6-1.3-.6-2.4V8.7c0-1.1.2-1.9.6-2.3.5-.7 1.2-1 2.1-1 .9 0 1.6.3 2.1 1 .4.4.6 1.2.6 2.3zm6.7-3.3v10h-1.8v-1.1c-.7.8-1.4 1.2-2.1 1.2-.6 0-1-.2-1.2-.7-.1-.3-.1-.8-.1-1.4v-8h1.8v8.1c0 .3.2.4.4.4.4 0 .7-.3 1.1-.9V5.4h1.9z" />
        </svg>
      </SocialIcon>
      <SocialIcon href="https://dev.to/aydrian" name="Dev.to">
        <svg
          className="h-10 w-10 fill-current text-site-blue"
          viewBox="0 0 40 40"
        >
          <path d="M1.1 20v9.5h3.3c3.7 0 5.2-.5 6.4-1.9 1.1-1.4 1.3-2.7 1.2-8.3-.1-5-.1-5.4-.8-6.5-1.1-1.8-2.4-2.3-6.5-2.3H1.1V20zm6.8-5.6c.7.6.7.7.7 5.5 0 4.7 0 4.9-.7 5.6-.5.5-1 .7-2.1.7H4.4L4.3 20l-.1-6.1h1.5c1.1-.1 1.8.1 2.2.5zm6.9-3.1c-.6.8-.6 1.2-.6 8.8v8l.7.7c.7.7.9.7 4.7.7h4v-3.2l-3-.1-3.1-.1v-4.4l1.9-.1 1.8-.1v-3.2h-3.9v-4.4h6.2v-3.3h-4.1c-4 0-4.1 0-4.6.7zm12.1 3.5c.6 2.3 1.6 6.2 2.3 8.5.9 3.6 1.3 4.4 2.1 5.2.6.6 1.2 1 1.7 1 .9 0 2.1-.9 2.5-2 .3-.8 4.5-16.5 4.5-16.8 0-.1-.8-.1-1.8-.1l-1.9.1-1.7 6.4c-1 4-1.7 6.2-1.8 5.8-.2-.7-3.2-12-3.2-12.2 0-.1-.9-.1-1.9-.1h-1.9l1.1 4.2z" />
        </svg>
      </SocialIcon>
      <SocialIcon href="https://www.linkedin.com/in/aydrian/" name="LinkedIn">
        <svg
          className="h-10 w-10 fill-current text-site-blue"
          viewBox="0 0 40 40"
        >
          <path d="M12.1 13.8v19.1H5.7V13.8h6.4zm.4-5.9c0 .9-.3 1.7-1 2.4-.7.6-1.5.9-2.6.9s-1.9-.3-2.5-.9c-.6-.6-1-1.4-1-2.4s.3-1.7 1-2.4 1.5-.9 2.6-.9 1.9.3 2.6.9.9 1.4.9 2.4zM35 22v11h-6.4V22.7c0-1.4-.3-2.4-.8-3.2-.5-.8-1.3-1.1-2.4-1.1-.8 0-1.5.2-2 .7-.5.4-1 1-1.2 1.7-.1.4-.2.9-.2 1.6v10.7h-6.4V20.6 14H22v2.8c.3-.4.5-.8.8-1.1.3-.3.6-.6 1.1-1 .5-.4 1-.6 1.7-.8.7-.2 1.4-.3 2.2-.3 2.2 0 4 .7 5.3 2.2C34.4 17 35 19.1 35 22z" />
        </svg>
      </SocialIcon>
      <SocialIcon href="https://www.facebook.com/itsaydrian/" name="Facebook">
        <svg
          className="h-10 w-10 fill-current text-site-blue"
          viewBox="0 0 40 40"
        >
          <path d="M27.2 4.7v4.9h-2.9c-1.1 0-1.8.2-2.1.6-.4.5-.6 1.1-.6 2v3.5H27l-.7 5.4h-4.7v14H16v-14h-4.7v-5.4H16v-4.1c0-2.3.6-4.1 1.9-5.3s2.9-1.9 5.2-1.9c1.7 0 3.1.1 4.1.3z" />
        </svg>
      </SocialIcon>
    </Social>
  </Layout>
)

export default IndexPage
