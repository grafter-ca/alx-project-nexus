import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import ContactForm from "@/component/common/ContactForm";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-9xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-0 bg-white shadow-xl rounded-2xl p-8">
        
        {/* LEFT SIDE - Contact Information */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600">
            Reach out to us using the information below, or fill in the form to send us a direct message. We’d love to hear from you.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">info@yourdomain.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">+250 788 123 456</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700">Kigali, Rwanda</span>
            </div>
          </div>

          {/* Social media icons */}
          <div className="flex items-center gap-4 pt-4">
            <a href="#" className="text-gray-500 hover:text-blue-600">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-400">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-700">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-500 hover:text-pink-500">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* RIGHT SIDE - Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 ml-0 lg:ml-58 text-gray-800">Send Us a Message</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
