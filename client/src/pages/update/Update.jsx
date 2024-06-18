import axios from 'axios';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [news, setNews] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`http://localhost:4000/api/v1/addnews/updatenews/${id}`, {
        title,
        subtitle,
        image,
        content,
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log('Response:', data);
      toast.success(data.message);
      setTitle("");
      setSubtitle("");
      setImage("");
      setContent("");
      setRefresh(!refresh);
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:4000/api/v1/addnews/getsinglenews/${id}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(response => {
        const newsData = response.data.getSinglenews;
        setNews(newsData);
        setTitle(newsData.title);
        setSubtitle(newsData.subtitle);
        setImage(newsData.image);
        setContent(newsData.content);
      })
      .catch(error => {
        console.log("message:" + error);
      });
  }, [id, refresh]);

  return (
    <div className='p-4 lg:flex lg:justify-center'>
      <div className="border p-6 rounded-lg shadow lg:w-[70%]">
        <p className='text-2xl font-titleFont py-5 font-bold'>Enter your news here</p>
        <section>
          <form onSubmit={submitHandler} className='flex flex-col gap-4'>
            <div className='flex gap-4 items-center font-titleFont text-lg'>
              <label className='w-[19%]  text-sm sm:text-lg'>Title: </label>
              <input type="text"
                placeholder='Enter your title'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='border-2 border-gray-300 outline-none rounded-md w-[180px] sm:w-[500px] px-2 lg:w-[795px] font-bodyFont text-base'
              />
            </div>
            <div className='flex gap-4 items-center font-titleFont text-lg'>
              <label className='w-[19%]  text-sm sm:text-lg'>Subtitle:</label>
              <input type="text"
                placeholder='Enter subtitle'
                required
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className='border-2 border-gray-300 outline-none rounded-md w-[180px] sm:w-[500px] lg:w-[795px] px-2 font-bodyFont text-base'
              />
            </div>
            <div className='flex gap-4 font-titleFont text-lg'>
              <label className='w-[19%] text-sm sm:text-lg'>Image URL:</label>
              <input type="text"
                placeholder='Enter image link: https://www...'
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className='border-2 border-gray-300 outline-none rounded-md w-[180px] sm:w-[500px] px-2 lg:w-[795px] font-bodyFont text-base'
              />
            </div>
            <div className='flex gap-4 font-titleFont text-lg'>
              <label className='w-[19%]  text-sm sm:text-lg'>Content:</label>
              <textarea
                placeholder='Write content here...'
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className='border-2 border-gray-300 outline-none rounded-md w-[180px] sm:w-[500px] px-2 lg:w-[795px] font-bodyFont text-base h-36'
              />
            </div>
            <div className='flex justify-end'>
              <button type='submit' className='border px-4 py-2 bg-green-500 text-white rounded-lg'>Update News</button>
            </div>
          </form>
        </section>
        <Toaster />
      </div>
    </div>
  );
}

export default Update;
