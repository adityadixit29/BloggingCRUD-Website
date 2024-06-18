import axios from 'axios';
import { useState } from 'react';
import toast, {Toaster} from 'react-hot-toast';

const Addnews = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      const { data } = await axios.post("https://blogging-crud-website-u1za.vercel.app/api/v1/addnews/newsubmit", {
        title,
        subtitle,
        image,
        content,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      }) 
      toast.success(data.message);
      setTitle("");
      setSubtitle("");
      setImage("");
      setContent("");
      
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className='p-4 lg:flex lg:justify-center'>
      <div className="border p-6 rounded-lg shadow lg:w-[70%]">
        <p className='text-2xl font-titleFont py-5 font-bold'>Enter your news here</p>
        <section>
          <form onSubmit={submitHandler} className='flex flex-col gap-4'>
           <div className='flex gap-4 items-center font-titleFont text-lg'>
           <label className='w-[19%]  text-sm sm:text-lg '>Tittle: </label> <input type="text"
              placeholder='Enter your title'
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='border-2 border-gray-300 outline-none rounded-md w-[180px] sm:w-[500px] px-2 lg:w-[795px] font-bodyFont text-base'
            />
           </div>
          <div className='flex gap-4 items-center font-titleFont text-lg'>
          <label className='w-[19%]  text-sm sm:text-lg'>Subtitle:</label> <input type="text"
              placeholder='Enter subtitle'
              required
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className='border-2 border-gray-300 outline-none rounded-md w-[180px] sm:w-[500px] lg:w-[795px] px-2 font-bodyFont text-base'
            />
          </div>
           <div className='flex gap-4 font-titleFont text-lg'>
           <label className='w-[19%] text-sm sm:text-lg'>Image URL:</label> <input type="text"
              placeholder='Enter image link: https://www...'
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className='border-2 border-gray-300 outline-none rounded-md w-[180px] sm:w-[500px] px-2 lg:w-[795px] font-bodyFont text-base'
            />
           </div>
            <div className='flex gap-4 font-titleFont text-lg'>
            <label className='w-[19%]  text-sm sm:text-lg'>Content:</label> <textarea type="text"
              placeholder='Write content here...'
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='border-2 border-gray-300 outline-none rounded-md w-[180px] sm:w-[500px] px-2 lg:w-[795px] font-bodyFont text-base h-36'
            />
            </div>
            <div className='flex justify-end'>
            <button type='submit' className='border px-4 py-2 bg-green-500 text-white rounded-lg'>Add Blog</button>
            </div>
          </form>
        </section>
        <Toaster/>
      </div>
      
    </div>
  );
};

export default Addnews;
