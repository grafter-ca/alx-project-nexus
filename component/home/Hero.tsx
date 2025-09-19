import { Activity, Award, MoveRight, Shield, Star, Truck, Users } from "lucide-react";
import React from "react";
import Stats from "../common/Stats";
import Image from "next/image";

function Hero() {
  return (
    <section className="gap-4 block lg:flex items-center">
        <article className="w-full lg:w-[760px]">
      <header className="mt-12">
        <button className="flex items-center space-x-2 bg-green-700 hover:bg-green-600 animate-bounce py-2 px-4 rounded-full mb-3">
          <Activity color="white" />
          <span>New Collection Just Dropped</span>
        </button>

        <h1 className="text-7xl font-bold">
          Premium Products That Transform Your 
          <span className="text-green-400 animate-pulse">Everyday Life</span>
        </h1>

        <p className="font-medium text-xl my-6">
          Join over 50,000+ satisfied customers who've discovered our handpicked
          collection of innovative products. From cutting-edge tech to lifestyle
          essentials - we bring you quality that exceeds expectations.
        </p>

        <div className="block lg:flex items-center justify-center pb-2 space-x-4 ">
          <button className="flex  items-center space-x-2 bg-green-700 hover:bg-green-900 py-3 text-xl px-8 rounded-[8px] text-white">
            <span>New Collection Just Dropped</span>
            <MoveRight />
          </button>
          <button className="flex mt-4 lg:mt-0 items-center bg-white hover:bg-gray-300 border-2 border-gray-200 hover:border-gray-600 transition-border transition-300 ease-out py-3 text-xl px-8 rounded-[8px]">
            <span>New Collection Just Dropped</span>
          </button>
        </div>
      </header>
      <section className="flex justify-between my-12">
      <article className="flex items-center space-x-3">
        <div className="bg-gray-300 w-12 h-12 flex items-center justify-center rounded-[8px]">
          <Star color="green" className="hover:animate-pulse cursor-pointer" size={40} />
        </div>

        <Stats stats="4.9/5 Stars" content="12,847 Reviews" />
      </article>
      <article className="flex items-center space-x-3">
        <div className="bg-gray-300 w-12 h-12 flex items-center justify-center rounded-[8px]">
          <Shield color="green" className="hover:animate-pulse cursor-pointer" size={40} />
        </div>

        <Stats stats="4.9/5 Stars" content="12,847 Reviews" />
      </article>
      <article className="flex items-center space-x-3">
        <div className="bg-gray-300 w-12 h-12 flex items-center justify-center rounded-[8px]">
          <Users color="green" className="hover:animate-pulse cursor-pointer" size={40} />
        </div>

        <Stats stats="4.9/5 Stars" content="12,847 Reviews" />
      </article>
      <article className="flex items-center space-x-3">
        <div className="bg-gray-300 w-12 h-12 flex items-center justify-center rounded-[8px]">
          <Truck color="green" className="hover:animate-pulse cursor-pointer" size={40} />
        </div>

        <Stats stats="4.9/5 Stars" content="12,847 Reviews" />
      </article>
      </section>

      <section className="flex justify-between mt-6">
        <div className="flex items-center space-x-6">
        <Award color="green" className="hover:animate-pulse cursor-pointer" size={28}/>
        <p>Best E-commerce {new Date().getFullYear()}</p>
        </div>
        <p>Featured in TechCrunch, Forbes & Wired</p>
      </section>
        </article>

        <article className=" relative bg-green-100 flex items-center justify-center rounded-lg w-[450px] h-[500px] ml-[200px]">
            <section className="shadow-md">
               <Image 
                src='/assets/images/modern-shopping-bags-and-products-hero-image.jpg'
                alt="Hero image"
                width={350}
                height={300}
                className="w-full object-cover"
               />
            </section>

            <button className="flex absolute right-0 top-[-14px] items-center space-x-2 bg-green-700 hover:bg-green-600  py-2 px-4 rounded-full mb-3">
          New Collection Just Dropped
        </button>
        <button className="flex absolute left-0 rotate-340 hover:rotate-0 transition-300 ease-in-out text-white items-center space-x-2 bg-green-700 hover:bg-green-600  py-2 px-4 rounded-full mb-3">
        Trending Now
        </button>
        <button className="flex absolute left-0 bottom-[-14px] items-center space-x-2 bg-green-700 hover:bg-green-600 animate-bounce py-2 px-4 rounded-full mb-3">
          New Collection Just Dropped
        </button>
        </article>
    </section>
  );
}

export default Hero;
