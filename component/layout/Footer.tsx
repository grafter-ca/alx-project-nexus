import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-900 py-6">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <div aria-label="Logo" className="flex space-x-3 mb-4">
            <h1 className="bg-green-600 text-white text-3xl flex items-center justify-center font-medium w-10 h-10 rounded-[10px]">
              S
            </h1>
            <h2 className="text-black text-3xl flex items-center  font-bold">
              ShopCatalog
            </h2>
          </div>{" "}
          <p className="text-gray-400">
            Premium furniture and home decor products that combine style and
            functionality. Quality guaranteed.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-green-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                className="hover:text-green-500 transition-colors"
              >
                Catalog
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="hover:text-green-500 transition-colors"
              >
                Category
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-green-500 transition-colors"
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
              <Link href="#" className="hover:text-green-500 transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/#"
                className="hover:text-green-500 transition-colors"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                href="/#"
                className="hover:text-green-500 transition-colors"
              >
                Support
              </Link>
            </li>
            <li>
              <Link
                href="/#"
                className="hover:text-green-500 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" target="_blank">
              <Facebook className="hover:text-green-500 transition-colors" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Twitter className="hover:text-green-500 transition-colors" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Instagram className="hover:text-green-500 transition-colors" />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <Linkedin className="hover:text-green-500 transition-colors" />
            </Link>
          </div>
          <p className="text-gray-500 mt-6 text-sm">
            © {new Date().getFullYear()} BrandName. All rights reserved.
          </p>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden mt-8 border-t border-gray-700 pt-6 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} BrandName. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
