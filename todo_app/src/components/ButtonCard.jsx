import React from 'react' 

const ButtonCard = ({ selected, setSelected }) => {

  return (
    <section className='flex justify-center mt-6'>
        <div className='flex'>

        <button
        onClick={() => setSelected('today')}
        className={`px-4 py-1 text-sm lg:px-8 lg:py-3 rounded-l-sm shadow-sm transition ${selected === 'today' ? 'bg-[#6D28D9] text-white' : 'bg-[#DDD6FE] text-black hover:bg-[#C4B5FD]' }`}>
            Today
        </button>

        <button className={`border-x-2 border-x-[#F3F4F6] text-black  px-4 py-1 text-sm  lg:px-8 py-3 shadow-sm transition ${ selected === 'pending' ? 'bg-[#6D28D9] text-white':'bg-[#DDD6FE] text-black hover:bg-[#C4B5FD]'}`} onClick={ () => setSelected('pending')}>
            Pending
        </button>

        <button className={` px-4 py-1 text-sm rounded-r-sm  lg:px-8 py-3 rounded-r-sm shadow-sm transition ${ selected === 'overdue' ? 'bg-[#6D28D9] text-white': 'bg-[#DDD6FE] text-black hover:bg-[#C4B5FD]'}`} onClick={ () => setSelected('overdue')}>
            Overdue
        </button>

        </div>
    </section>
  )
}

export default ButtonCard
