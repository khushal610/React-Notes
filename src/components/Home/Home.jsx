import React from 'react'
import { useTypewriter,Cursor } from 'react-simple-typewriter'

function Home() {

  const [text] = useTypewriter({
    words: ['Feel free to use it!', "It's easy to create your own note!"],
    loop: 0,
    typeSpeed: 20
  })

  return (
    <>
      <div className='home-first-container p-10 flex items-center gap-10'>
        <div className='img-container'>
          <img src="/Images/pexels-photo-261651.jpg" alt="Notes image" className='w-96 rounded-lg shadow-md brightness-50' />
        </div>
        <div className='pl-10 w-6/12'>
          <h1 className='text-3xl'>Create your own notes</h1>
          <p className='text-2xl'>
            <span>{text}</span><Cursor cursorColor='black' />
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse maiores reiciendis cumque, alias amet delectus cum dicta. Quasi commodi recusandae inventore, dolor molestiae magnam in deserunt. Iure corrupti itaque, eos quasi, quis dolore expedita velit enim, ipsam eum tempora ducimus!</p>
        </div>
      </div>
    </>
  )
}

export default Home
