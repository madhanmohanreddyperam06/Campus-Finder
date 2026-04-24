import Link from 'next/link';
import { GraduationCap, Instagram, Linkedin, Twitter, Github } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  );


export function Footer() {
    return (
        <footer className="w-full bg-gray-900 text-white">
            <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
                <div className="space-y-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <GraduationCap className="h-8 w-8" />
                        <span className="text-2xl font-bold">Campus Finder</span>
                    </Link>
                    <p className="max-w-xs text-gray-300">
                        Your comprehensive guide to discovering educational institutions across India. Let's begin your journey.
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
                        <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
                        <li><Link href="/search" className="text-gray-300 hover:text-white">Search</Link></li>
                        <li><Link href="/all-institutions" className="text-gray-300 hover:text-white">All Institutions</Link></li>
                        
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Stay Updated</h3>
                    <p className="text-gray-300">Subscribe to our newsletter for the latest updates.</p>
                    <form className="flex space-x-2">
                        <Input type="email" placeholder="Email" className="flex-1 bg-gray-800 text-white border-gray-700 focus:ring-primary" />
                        <Button type="submit" variant="secondary">Subscribe</Button>
                    </form>
                    <div className="flex space-x-4 pt-2">
                        <Link href="https://www.instagram.com/madhanmohanreddy_45?igsh=MWR0YngzNGhiaGhmcQ==" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"><Instagram className="h-5 w-5" /></Link>
                        <Link href="http://www.linkedin.com/in/madhan-mohan-reddy-peram-63181b253" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"><Linkedin className="h-5 w-5" /></Link>
                        <Link href="https://wa.me/qr/CRBOZCQVGOSWA1" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"><WhatsAppIcon className="h-5 w-5" /></Link>
                        <Link href="https://github.com/madhanmohanreddyperam06" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"><Github className="h-5 w-5" /></Link>
                        <Link href="https://x.com/MadhanM16616334?t=Fat391ZrwB1ZF7M1rZ6REg&s=08" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"><Twitter className="h-5 w-5" /></Link>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700">
                <div className="container mx-auto flex flex-wrap items-center justify-center px-4 py-4 text-sm text-gray-400 sm:px-6">
                    <p>© 2025 Campus Finder. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
