import './App.css'

function App() {
  return (
    <>
      <div className='main-body h-screen w-screen flex items-center justify-center'>
        <div className='container flex items-center justify-center'>
            <form className='flex flex-col gap-2'>
              <div className='flex justify-center items-center gap-7'>
                <div>Name</div>
                <div><input type="text" className='border border-black' /></div>
              </div>
              <div className='flex justify-center items-center gap-7'>
                <div>Email</div>
                <div><input type="text" className='border border-black' /></div>
              </div>
              <div className='flex justify-center items-center gap-7'>
                <div>Password</div>
                <div><input type="text" className='border border-black' /></div>
              </div>
              <div>
                <button className='border border-black py-2 px-2 rounded-md'>Register</button>
              </div>
            </form>
        </div>
      </div>
    </>
  )
}

export default App
