import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import SubscribeButton from "../common/button/SuscribeButton";
import { useEffect, useState } from "react";

const Footer = () =>  {

   const [subscribeMessage, setSubscribeMessage] = useState("");
  const [subscribe, setSubscribe] = useState({ email: "" });

  const handleSubscribe = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
  
    if (!subscribe.email) {
      setSubscribeMessage("Email is required for subscription 😒");
      setTimeout(() => setSubscribeMessage(""), 2000); // Clear message after 2s
      return;
    }

    setSubscribeMessage("You are subscribed to our newsletter 🎉");
    console.log("Subscribed", subscribe);
    
    setTimeout(() => 
      {
        setSubscribeMessage("")
        setSubscribe({email:""})
      }

    , 2000); // Clear message after 2s
  };
  return (
    <>
    <div className="h-4 bg-green-100 w-full"></div>
    <footer className="bg-gray-200 text-gray-900 py-6">
      <div className="lg:flex block items-center justify-between px-4">
        {/* About Section */}
        <div className="flex flex-col space-y-4">
          <div className="w-[350px]">
          <div aria-label="Logo" className="flex space-x-3 mb-4">
            <h1 className="bg-green-600 text-white text-3xl flex items-center justify-center font-medium w-10 h-10 rounded-[10px]">
              S
            </h1>
            <h2 className="text-black text-3xl flex items-center  font-bold">
              ShopCatalog
            </h2>
          </div>{" "}
          <p className="text-gray-500 text-sm">
            Your trusted destination for quality products. We curate the best
            items to make your shopping experience exceptional.
          </p>
          </div>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" target="_blank">
              <Facebook className="hover:text-green-500 hover:translate-x-1.5 transition duration-500 ease-in-out" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Twitter className="hover:text-green-500 hover:translate-x-1.5 transition duration-500 ease-in-out" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Instagram className="hover:text-green-500 hover:translate-x-1.5 transition duration-500 ease-in-out" />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <Linkedin className="hover:text-green-500 hover:translate-x-1.5 transition duration-500 ease-in-out" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <section className="flex justify-between space-x-6 py-12 lg:py-0 lg:space-x-32">
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-green-500 hover:translate-x-1.5 transition duration-500 ease-in-out">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                className="hover:text-green-500 hover:translate-x-1.5 transition duration-500 ease-in-out"
              >
                Catalog
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="hover:text-green-500 hover:translate-x-1.5 transition duration-500 ease-in-out"
              >
                Category
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-green-500 hover:translate-x-1.5 transition duration-500 ease-in-out"
              >
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-green-500 hover:translate-x-1.5 transition duration-500 ease-in-out">
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/#"
                className="hover:text-green-500 hover:translate-x-1.5 transition duration-500 ease-in-out"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/#"
                className="hover:text-green-500 hover:translate-x-1.5 transition duration-500 ease-in-out"
              >
                Support
              </Link>
            </li>
            <li>
              <Link
                href="/#"
                className="hover:text-green-500 hover:translate-x-1.5 transition duration-500 ease-in-out"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        </section>

        {/* Social Media */}
        <div className="w-[350px]">
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <p>Subscribe to our newsletter for the latest products and offers.</p>
          <form className="flex flex-col space-y-3" onSubmit={handleSubscribe}>
            <input onChange={(e) => setSubscribe({ email: e.target.value })} value={subscribe.email} name="email" type="emal" placeholder="Enter your email address" className="text-gray-800 p-2 bg-white border-2 focus:*:border-gray-200 border-gray-200 rounded-lg"/>
            <SubscribeButton label="Subscribe Now"/>
            <p className="py-1 text-green-500 font-semibold">{subscribeMessage}</p>
          </form>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <section className="border-t-1 border-gray-300 block space-y-4 lg:space-y-0  lg:flex justify-center text-center lg:justify-around p-6 mt-6 lg:items-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} ShopCatalog. All rights reserved.
        </p>
        <div className="flex space-x-4 items-center justify-center">
           <p className="text-gray-500 text-sm">Privacy Policy</p>
           <p className="text-gray-500 text-sm">Terms of Service</p>
        </div>
      </section>
    </footer>
    </>
  );
};

export default Footer;
