import Link from 'next/link';
import React from 'react';
import SearchBar from '../common/SearchBar';
import { FaCartPlus } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { Menu } from 'lucide-react';

function Header() {
    return (
        <header className='flex items-center justify-between px-8 py-6'>
            <div aria-label='Logo' className='flex space-x-3'>
             <h1 className='bg-green-600 text-white text-3xl flex items-center justify-center font-medium w-10 h-10 rounded-[10px]'>S</h1>
             <h2 className='text-black text-3xl flex items-center  font-bold'>ShopCatalog</h2>
            </div>
           <div aria-label='Our main Navigation' className='hidden lg:flex justify-between items-center'>
            <nav className='flex space-x-4 text-2xl mr-64'>
                <Link href='/'>
                <span>Home</span>
                </Link>
                <Link href='/catalog'>
                <span>Catalog</span>
                </Link>
                <Link href='/categories'>
                <span>Categories</span>
                </Link>
                <Link href='/about'>
                <span>About</span>
                </Link>
            </nav>
            <SearchBar />
           </div>
           <div aria-label='Shoping Cart' className='flex items-center text-2xl space-x-12'>
            <FaCartShopping className='text-gray-400'/>
            <Menu className='flex lg:hidden'/>
           </div>
        </header>
    );
}

export default Header;