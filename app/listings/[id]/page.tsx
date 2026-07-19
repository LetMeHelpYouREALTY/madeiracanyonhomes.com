import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RealScoutListings from "@/components/realscout/RealScoutListings";
import PageHero from "@/components/sections/PageHero";
import Image from "next/image";
import { Bed, Bath, Square, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { getHero } from "@/lib/hero-images";
import CalendlyButton from "@/components/calendly/CalendlyButton";
import CalendlyWidget from "@/components/calendly/CalendlyWidget";

export const metadata: Metadata = {
  title: "Property Details | Las Vegas & Henderson Real Estate",
  description: "View detailed information about this property listing in Las Vegas or Henderson, NV.",
};

// This would typically fetch from RealScout API
async function getProperty(id: string) {
  // Placeholder - replace with RealScout API call
  return {
    id,
    name: "Modern Luxury Home",
    location: "Summerlin, Las Vegas, NV",
    price: "$850,000",
    image: getHero("modern").src,
    bedrooms: 4,
    bathrooms: 3,
    squareFeet: 3200,
    yearBuilt: 2018,
    description:
      "Stunning modern home in desirable Summerlin community. Features open floor plan, updated kitchen, and beautiful backyard. Close to schools, shopping, and entertainment.",
  };
}

type PropertyPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const property = await getProperty(id);

  const heroImage = {
    src: property.image,
    alt: `${property.name} in ${property.location}`,
  };

  return (
    <>
      <Navbar />
      <PageHero
        title={property.name}
        subtitle={`${property.location} · ${property.price}`}
        image={heroImage}
        ctaHref="http://drjanduffy.realscout.com/"
        ctaLabel="View more listings"
      />
      <main className="pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6 mt-8 text-sm">
            <ol className="flex items-center space-x-2 text-slate-600">
              <li>
                <a href="/" className="hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>/</li>
              <li>
                <a href="http://drjanduffy.realscout.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                  Properties
                </a>
              </li>
              <li>/</li>
              <li className="text-slate-900">{property.name}</li>
            </ol>
          </nav>

          <div className="mb-8 flex items-center text-slate-600">
            <MapPin className="h-5 w-5 mr-2" />
            {property.location}
            <span className="mx-3 text-slate-300">|</span>
            <span className="text-2xl font-bold text-blue-600">{property.price}</span>
          </div>

          {/* Gallery image */}
          <div className="relative h-64 md:h-96 overflow-hidden mb-8">
            <Image
              src={property.image}
              alt={property.name}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>

          <RealScoutListings title="More Homes from Our Office" />

          {/* Property Details Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Main Content */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Property Details</h2>
              <p className="text-slate-700 mb-6">{property.description}</p>

              <div className="bg-slate-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-slate-700">{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-slate-700">{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-slate-700">
                      {property.squareFeet.toLocaleString()} sq ft
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-slate-700">Built {property.yearBuilt}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Schedule a Showing</h3>
                <p className="text-slate-700 mb-4">
                  Book a private viewing with Dr. Jan Duffy — Madeira Canyon &amp; Henderson specialist.
                </p>
                <CalendlyButton
                  url="showing"
                  text="Book showing on Calendly"
                  className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-semibold"
                />
                <div className="mt-4 overflow-hidden rounded-md bg-white">
                  <CalendlyWidget url="showing" height="520px" />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white border border-slate-200 rounded-lg p-6 sticky top-24">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Agent</h3>
                <p className="text-slate-600 mb-4">Dr. Jan Duffy</p>
                <p className="text-sm text-slate-600 mb-6">
                  Berkshire Hathaway HomeServices Nevada Properties
                </p>
                <div className="space-y-3">
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <a href="tel:+17025001942">Call (702) 500-1942</a>
                  </Button>
                  <CalendlyButton
                    url="appointment"
                    text="Schedule consultation"
                    className="flex w-full items-center justify-center border border-slate-300 rounded-md px-4 py-2 font-semibold text-slate-800 hover:bg-slate-50"
                  />
                  <CalendlyButton
                    url="showing"
                    text="Book a showing"
                    className="flex w-full items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
