import Layout from 'components/Layout'
import WriteStory from 'components/WriteStory'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const windowUser = {username:"Jesus", password:"Jesus1234"}

export default function Start() {

    const layoutInfo = {
        username: "Pepe",
        stars:    420,
        coins:    69,
        image_ID: 0
    } 

  return (
    <>
        <Layout data={layoutInfo}>
          <WriteStory first={true} creator={"No tu"}/>
        </Layout> 
    </>
  )
}