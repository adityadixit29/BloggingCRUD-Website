import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaRegThumbsUp, FaThumbsUp, FaRegEye } from "react-icons/fa6";
import { MdMessage } from "react-icons/md";
const ViewNews = () => {
  const { id } = useParams();
  const [news, setnews] = useState([]);
  const [like, setlike] = useState(true);
  const likestatus = () =>{
    setlike(!like);
  }
  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/addnews/getsinglenews/${id}`,{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(response => {
        setnews(response.data.getSinglenews)
      })
      .catch(error => {
        console.log("message:" + error);
      })
  }, [id])
  return (
    <div className='p-8 flex justify-center items-center'>
      <div className='shadow-lg transition-all hover:shadow-2xl p-5 rounded-2xl w-[89%] h-auto'>
        <div className='mb-6'>
          <div className='font-titleFont font-semibold text-2xl'>{news.title}</div>
          <div className='font-titleFont tracking-wider'>{news.subtitle}</div>
        </div>
        <div>
          <img src={news.image} alt="" className='rounded-xl mb-6 lg:h-[472px] lg:w-[900px]' />
        </div>
        <div className='font-bodyFont text-sm mb-6'>
          {news.content}
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex gap-3'>

            <a onClick={likestatus} className='flex items-center gap-1 text-slate-500 cursor-pointer'>
              { like? <FaRegThumbsUp className='text-slate-500'/>:
              <FaThumbsUp className='text-slate-500'/>}
              {news.likes}
            </a>

            <div className='flex items-center gap-1 text-slate-500'>
              <FaRegEye />
              {news.views}
            </div>

          </div>

          <div className='flex items-center gap-1 text-slate-500'>
            <MdMessage />
            {news.comments}
          </div>
        </div>

      </div>
    </div>
  )
}

export default ViewNews