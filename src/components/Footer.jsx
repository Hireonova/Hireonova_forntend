import React from 'react'
import {
  FaInstagram,
  FaDiscord,
  FaXTwitter,
} from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className=" w-full bg-zinc-900 text-white   md:px-8 py-10 overflow-hidden">
      <div className="mx-auto max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left: Branding */}
        <div className="text-center md:text-left w-full md:w-1/3">
          <h3 className="text-lg md:text-xl font-semibold break-words">
            Made with <span className="text-red-500">❤️</span> by <span className="text-blue-400">Nickhilverma</span>
          </h3>
          <p className="text-sm text-zinc-400 break-words">
            <span className="font-bold text-white">Hireonova</span> — Your AI Recruitment Partner
          </p>
        </div>

        {/* Center: Social Icons */}
        <div className="flex gap-5 items-center justify-center w-full md:w-1/3">
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-indigo-400 transition hover:scale-110"
          >
            <FaDiscord size={22} />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition hover:scale-110"
          >
            <FaXTwitter size={22} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-pink-400 transition hover:scale-110"
          >
            <FaInstagram size={22} />
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-xs text-zinc-500 text-center md:text-right w-full md:w-1/3">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
