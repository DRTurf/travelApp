import Navbar from '@/components/functional/Navbar'
import Sidebar from '@/components/functional/Sidebar'

const HomeLayout = ({children}) => {
  return (
    <main className='relative'>
        <Navbar/>
        <div className="flex">
            <Sidebar/>
            <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:b-14 sm:px-14'>
                <div className="w-full">
                  {children}
                </div>
            </section>
        </div>
    </main>
  )
}

export default HomeLayout