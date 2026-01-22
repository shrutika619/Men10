"use client";
import React, { use } from 'react';
import HerosectionCityPage from '@/components/ClinicPage/HerosectionCityPage'; 
import SecondsectionPage from '@/components/ClinicPage/SecondsectionPage'; 

const Page = ({ params }) => {
  const { slug } = use(params);

  return (
    <div>
      <HerosectionCityPage cityName={slug} />
      
      <SecondsectionPage />
    </div>
  );
};

export default Page;