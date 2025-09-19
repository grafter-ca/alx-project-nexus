import { Activity } from 'lucide-react';
import React from 'react';
function Button() {
    return (
        <button className='flex items-center space-x-2 bg-green-700 py-2 px-4 rounded-full'>
                    <Activity />
                    <span>New Collection Just Dropped</span>
            </button>
    );
}

export default Button;