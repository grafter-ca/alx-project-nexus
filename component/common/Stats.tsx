import React from 'react';

interface StatsProps {
    stats: string;
    content: string;
}

function Stats({stats,content}: StatsProps) {
    return (
        <section>
            <div className='flex flex-col space-y-2 text-[12px]'>
                <h1 className='font-semibold'>{stats}</h1>
                <p className='font-medium'>{content}</p>
            </div>
        </section>
    );
}

export default Stats;