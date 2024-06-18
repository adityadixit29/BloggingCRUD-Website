import axios from 'axios';
import { useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts";
const Comments = () => {
    const [chartData, setChartData] = useState({
        xaxisCategories: [],
        commentsData: [],
      });
      useEffect(() => {           
        // Extracting grouped data for chart
        axios.get(`https://blogging-crud-website-u1za.vercel.app/api/v1/addnews/getcomments`)
        .then(response => {
          const comments = response.data.comments;
  
            const xaxisCategories = comments.map(comment => comment.title); // Use _id as x-axis categories
            const commentsData = comments.map(comment => comment.comments);
          
  
          setChartData({
            xaxisCategories,
            commentsData,
          });
        })
      
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <div className='flex justify-center'>
        <div className="chart">
        <p className='text-white font-titleFont font-bold items-center'>No. of comments per news article</p>
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
                name: "Comments",
                data: chartData.commentsData,
            },
        ]}
        type="bar"
        width="500"
        height="400"
    />
</div>
    </div>
  )
}

export default Comments
