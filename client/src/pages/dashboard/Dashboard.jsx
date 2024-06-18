import Likes from '../../components/likes/Likes'
import Comments from '../../components/comments/Comments'
import Views from '../../components/viewscomponent/Views'

const Dashboard = () => {
  return (
    // 00153C
    // 001A4B
    <div className='grid gap-10 p-6 bg-[#001A4B] lg:grid-cols-2'>

    <div className='shadow-custom w-full p-5 bg-[#00153C] rounded-2xl'>
      <Likes/>
    </div>
    <div className='shadow-custom w-full p-5 bg-[#00153C] rounded-2xl'>
      <Views/>
    </div>
    <div className='shadow-custom p-5 bg-[#00153C] rounded-2xl w-full'>
      <Comments/>
    </div>
  </div>
  
  )
}

export default Dashboard