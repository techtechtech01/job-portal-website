import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
    CarouselPrevious
} from '../ui/carousel'

import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

  

const Category=[
  "Frontend Development",
  "Backend Development",
  "Full Stack Development",
  'Mobile App Development',
  "UI/UX Design",
  "Data Science",
  "Machine Learning",
  "Cloud Computing",
  "Cybersecurity",
  "DevOps",
  "Game Development",
  "Blockchain Development",
  "Artificial Intelligence",
  "Digital Marketing",
  "Product Management",
  "Quality Assurance",
  "Business Analysis",
  "Project Management",
  "Technical Writing",
  "IT Support",
  "Network Administration"
];
const Categories = () => {
  const navigate = useNavigate();

  const searchjobHandler = (category) => {
    
   navigate("/browse");
  };
  return (
   <div className='w-full sm:w-[85%] md:w-[65%] lg:w-[50%] mx-auto mt-10 gap-10'>
     <div className='flex flex-col text-center mt-10 gap-3'>
     <h1 className='text-3xl font-bold text-blue-500'>Categories</h1>
     <p className='font-medium text-gray-400'>Explore different career paths and specializations.</p>
    </div>

    <Carousel className="mt-8 gap-4">
      <CarouselContent>
        {Category.map((category, index) => (
          <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4">
            
            <Button onClick= {()=>searchjobHandler(category)}  variant="outline" className="w-full rounded-full text-xs md:text-sm text-center px-2 py-1 h-auto min-h-10 whitespace-normal">{category}</Button>
              
        
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:flex" />
      <CarouselNext className="hidden sm:flex"/>
    </Carousel>
   </div>
  )
}

export default Categories
