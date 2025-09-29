import { useState } from "react";
import useContactForm from "@/hooks/useContactForm";
import sendEmail from "@/utils/sendEmail";

const ContactForm = () => {
  const { values, handleChange } = useContactForm();
  const [responseMessage, setResponseMessage] = useState<{ isSuccessful: boolean; message: string }>({
    isSuccessful: false,
    message: "",
  });

  const [isloading,setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await sendEmail(values.email, values.subject, values.message);

      if (res.success) {
        setResponseMessage({ isSuccessful: true, message: "Thank you for your message." });
      } else {
        setResponseMessage({ isSuccessful: false, message: "Oops something went wrong. Please try again." });
      }
    } catch (error) {
      console.error(error);
      setResponseMessage({ isSuccessful: false, message: "Oops something went wrong. Please try again." });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-gray-50 p-6 lg:w-1/2 mx-auto border-2 border-gray-200 rounded-xl shadow-md"
    >
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          required
          id="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="your@email.com"
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
          Subject
        </label>
        <input
          required
          id="subject"
          type="text"
          value={values.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Subject of your message"
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <textarea
          required
          id="message"
          rows={6}
          value={values.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          placeholder="Write your message here..."
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-green-600 hover:animate-pulse text-white py-2 px-4 rounded-lg shadow hover:bg-green-700 transition duration-200 ease-in-out"
      >
        {isloading ? "sending ...": "Send Message"}
      </button>

      {/* Response */}
      {responseMessage.message && (
        <p
          className={`mt-2 text-sm font-medium ${
            responseMessage.isSuccessful ? "text-green-600" : "text-red-600"
          }`}
        >
          {responseMessage.message}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
