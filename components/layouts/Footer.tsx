import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import CalendlyCTASection from "@/components/calendly/CalendlyCTASection";
import MadeiraCanyonMap from "@/components/maps/MadeiraCanyonMap";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
    <MadeiraCanyonMap focus="community" />
    <CalendlyCTASection />
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-xl mb-4">Madeira Canyon | Homes by Dr Jan Duffy</h3>
            <p className="text-slate-300 mb-4 text-sm">
              Buy and sell in Madeira Canyon and Club Madeira, Henderson, NV
              (clubmadeirahoa.com). Berkshire Hathaway HomeServices Nevada Properties —
              Suite A, 2721 Bonaparte Ln, Henderson, NV 89044.
            </p>
            <div className="flex space-x-4">
              <a
                href="http://drjanduffy.realscout.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Search Las Vegas Homes"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="http://drjanduffy.realscout.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Search Las Vegas Homes"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="http://drjanduffy.realscout.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                aria-label="Search Las Vegas Homes"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="http://drjanduffy.realscout.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  All Properties
                </a>
              </li>
              <li>
                <Link
                  href="/neighborhoods/madeira-canyon"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Madeira Canyon Homes
                </Link>
              </li>
              <li>
                <Link
                  href="/neighborhoods/club-madeira"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Club Madeira
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Buyer & Seller Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/neighborhoods"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Neighborhoods
                </Link>
              </li>
              <li>
                <Link
                  href="/why-berkshire-hathaway"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Why BHHS
                </Link>
              </li>
              <li>
                <Link
                  href="/market-report"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Market Report
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  About Dr. Jan
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4">Real Estate Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/buyers"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Home Buying
                </Link>
              </li>
              <li>
                <Link
                  href="/buyers/california-relocator"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  California Relocators
                </Link>
              </li>
              <li>
                <Link
                  href="/sellers"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Home Selling
                </Link>
              </li>
              <li>
                <Link
                  href="/luxury-homes"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Luxury Homes
                </Link>
              </li>
              <li>
                <Link
                  href="/55-plus-communities"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  55+ Communities
                </Link>
              </li>
              <li>
                <Link
                  href="/new-construction"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  New Construction
                </Link>
              </li>
              <li>
                <Link
                  href="/market-insights"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Market Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info - NAP (Name, Address, Phone) */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Dr. Jan Duffy</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">
                  Suite A, 2721 Bonaparte Ln
                  <br />
                  Henderson, NV 89044
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                <Link
                  href="tel:+17025001942"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  (702) 500-1942
                </Link>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                <Link
                  href="mailto:DrDuffy@MadeiraCanyonHomes.com"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  DrDuffy@MadeiraCanyonHomes.com
                </Link>
              </li>
              <li>
                <a
                  href="https://calendly.com/drjanduffy/appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-blue-600 hover:bg-blue-500 px-3 py-2 text-sm font-semibold text-white transition-colors"
                >
                  Schedule on Calendly
                </a>
              </li>
              <li>
                <a
                  href="https://calendly.com/drjanduffy/showing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-white transition-colors text-sm underline-offset-2 hover:underline"
                >
                  Book a showing
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} Madeira Canyon | Homes by Dr Jan Duffy · Berkshire Hathaway
              HomeServices Nevada Properties. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/faq" className="text-slate-400 hover:text-white transition-colors">
                FAQ
              </Link>
              <Link
                href="/photo-credits"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Photo Credits
              </Link>
              <Link href="/sitemap.xml" className="text-slate-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-4 text-center">
            Dr. Jan Duffy, REALTOR® | License S.0197614.LLC | Berkshire Hathaway HomeServices Nevada
            Properties
          </p>
          <p className="text-slate-600 text-xs mt-2 text-center max-w-3xl mx-auto">
            When you work with a Berkshire Hathaway HomeServices agent, you're backed by a name
            synonymous with trust, ethical standards, and financial strength.
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}
