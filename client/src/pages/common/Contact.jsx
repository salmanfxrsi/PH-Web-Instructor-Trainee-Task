import { Link } from "react-router-dom";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/salmanfarsi9005/",
    imgSrc: "https://i.ibb.co.com/Gvd29XJz/img-icons8.png",
    alt: "LinkedIn",
  },
  {
    href: "https://www.instagram.com/salmanfxrsi/",
    imgSrc: "https://i.ibb.co.com/4R9KvmvS/img-icons8.png",
    alt: "Instagram",
  },
  {
    href: "https://www.facebook.com/salman.farsi.259647/",
    imgSrc: "https://i.ibb.co.com/WND9R6nK/img-icons8.png",
    alt: "Facebook",
  },
];

const Contact = () => {
  return (
    <div className="hero">
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        {/* Contact Info Section */}
        <div className="text-center lg:text-left text-white">
          <h1 className="text-5xl font-bold">Contact Now!</h1>
          <p className="py-6">
            Got questions or need assistance? We&apos;re here to help! Fill out
            the form, and our team will get back to you as soon as possible.
            Let’s connect!
          </p>
          <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
            {socialLinks.map(({ href, imgSrc, alt }) => (
              <Link
                key={alt}
                to={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img className="w-12" src={imgSrc} alt={alt} />
              </Link>
            ))}
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="card w-full max-w-sm">
          <form className="card-body space-y-4">
            {/* Name Input */}
            <div className="form-control">
              <label htmlFor="name" className="font-semibold text-white">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                autoComplete="off"
                className="input input-bordered bg-white rounded-lg border border-gray-300 mt-1 px-3 py-2"
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label htmlFor="email" className="font-semibold text-white">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered bg-white rounded-lg border border-gray-300 mt-1 px-3 py-2"
                required
              />
            </div>

            {/* Message Input */}
            <div className="form-control">
              <label htmlFor="message" className="font-semibold text-white">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Write your message..."
                className="textarea bg-white rounded-lg border border-gray-300 mt-1 px-3 py-2"
                required
              />
            </div>

            {/* Send Message Button */}
            <div className="form-control mt-4">
              <button className="w-full bg-gradient-to-bl from-violet-500 to-fuchsia-500 py-2 px-5 font-bold text-white rounded-lg transition duration-300 hover:opacity-90">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
