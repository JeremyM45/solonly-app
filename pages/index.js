import Head from 'next/head'
import { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [imgSrc, setImgSrc] = useState([''])
  
  function handleClick(){
    fetch("https://dog.ceo/api/breeds/image/random/4")
      .then(res => res.json())
      .then(result => {
        setImgSrc(result.message)
      })
      .catch(err=>console.log(err))
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Solonly</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      
        <h1 className={styles.title}>
          Welcome to Solonly!
        </h1>
        <div className={styles.description}>
              <h1> Wanna see some cute Dogs? </h1>
              <button className='btn mb-4 btn-primary' onClick={handleClick} id="btnClick">Of Course I Do!</button>
              <br />
              <br />
              {imgSrc.length > 1 ? imgSrc.map(image => {
                return(
                  <Image key={image} height={200} width={300} className={styles.dogimage} src={image} alt='picture of a dog'/>
                )
              }) : <></>}
              
              
        </div>
      </main>
    </div>
  )
}
