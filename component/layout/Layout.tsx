import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

function Layout({children}: {children:React.ReactNode}) {
    const route = useRouter();
    const isDashboard = route.pathname.startsWith('/dashboard');

    if (isDashboard) {
        return <>{children}</>;
    }
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