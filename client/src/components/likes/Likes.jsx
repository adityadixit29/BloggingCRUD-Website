import axios from 'axios';
import { useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts";
const Likes = () => {
    const [chartData, setChartData] = useState({
        xaxisCategories: [],
        likesData: [],
      });
      useEffect(() => {           
        // Extracting grouped data for chart
        axios.get(`http://localhost:4000/api/v1/addnews/getlikes`)
        .then(response => {
          const likes = response.data.likes;
  
            const xaxisCategories = likes.map(like => like.title.substring(0,10)); // Use _id as x-axis categories
            const likesData = likes.map(like => like.likes);
          
  
          setChartData({
            xaxisCategories,
            likesData,
          });
        })
      
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className='flex justify-center'>
    <div className="chart">
    <p className='text-white font-titleFont font-bold items-center'>No. of likes per news article</p>
<ReactApexChart
    options={{
        chart: {
            id: "basic-bar",
            toolbar: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: chartData.xaxisCategories,
            labels: {
                style: {
                    colors: "white", // Change x-axis text color to black
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "white", // Change y-axis text color to black
                },
            },
        },
        tooltip: {
            theme: "dark", // Change tooltip box color to a light theme                
        },
        grid: {
            show: false,      // you can either change hear to disable all grids
          },

    }}
    series={[
        {
            name: "Likes",
            data: chartData.likesData,
        },
    ]}
    type="area"
    width="500"
    height="400"
/>
</div>
</div>
  )
}

export default Likes