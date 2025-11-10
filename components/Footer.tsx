import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-900 text-[#F5F5F5] pt-10 pb-5 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-5 md:flex-row md:justify-between">
        <div className="flex flex-col md:flex-row md:gap-20 gap-10">
          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold  mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>About us</li>
              <li>Team</li>
              <li>Careers</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold  mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Help & Support</li>
              <li>Partner with us</li>
              <li>Ride with us</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>Terms & Conditions</li>
              <li>Refund & Cancellation</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>

          <div className="flex items-center space-x-4 mb-6">
            <Instagram className="w-6 h-6 cursor-pointer" />
            <Facebook className="w-6 h-6 cursor-pointer" />
            <Twitter className="w-6 h-6 cursor-pointer" />
          </div>

          <p className="text-sm mb-4">
            Receive exclusive offers in your mailbox
          </p>

          <div className="flex items-center gap-3">
            {/* INPUT */}
            <div className="flex items-center bg-[#3A3A3A] px-4 py-2 rounded-xl w-full">
              <Mail className="w-6 h-6 text-gray-300 mr-3" />
              <input
                type="email"
                placeholder="Enter Your email"
                className="bg-transparent w-full text-gray-200 text-lg placeholder-gray-300 focus:outline-none"
              />
            </div>

            {/* SUBSCRIBE BUTTON */}
            <button
              className="
          btn-secondary text-sm font-semibold px-6 py-3 rounded-lg shadow-3xl"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 mt-10 pt-6 text-center text-sm flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4">
        <p>All rights Reserved © Your Company, 2021</p>
        <p className="mt-2 md:mt-0">
          Made with <span className="text-yellow-500">♥</span> by Themewagon
        </p>
      </div>
    </footer>
  );
}
