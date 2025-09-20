import React from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchBar() {
    return (
        <form className='flex items-center space-x-2 rounded-md bg-gray-100 border-2 border-amber-100 w-[373px] p-2'>
            <FaSearch className='text-gray-400 '/>
             <input placeholder='Search products...' className='border-none outline-none w-full '/>
        </form>
    );
}

export default SearchBar;