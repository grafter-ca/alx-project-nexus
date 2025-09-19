import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({children}: {children:React.ReactNode}) {
    return (
        <>
           <Header />
           <hr className='text-gray-200'/>
           <main>
            {children}
           </main>
           <Footer />
        </>
    );
}

export default Layout;