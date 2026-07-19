import { Phone, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import CalendlyButton from "@/components/calendly/CalendlyButton";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready for Madeira Canyon Real Estate Help?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule a buyer consult, listing appointment, or private showing with Dr. Jan Duffy —
            Berkshire Hathaway HomeServices Nevada Properties.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
              <a
                href="http://drjanduffy.realscout.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Home className="h-5 w-5" />
                Browse Properties
              </a>
            </Button>
            <CalendlyButton
              url="appointment"
              text="Schedule consultation"
              className="inline-flex items-center justify-center bg-blue-800 hover:bg-blue-900 text-white px-6 py-3 rounded-md font-semibold text-lg transition-colors"
            />
            <CalendlyButton
              url="showing"
              text="Book a showing"
              className="inline-flex items-center justify-center border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-semibold text-lg transition-colors"
            />
            <a
              href="tel:+17025001942"
              className="inline-flex items-center justify-center border border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-semibold text-lg transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-blue-100 text-sm">
            <span className="font-semibold text-white">Free Consultation</span>
            <span className="font-semibold text-white">Calendly Booking</span>
            <span className="font-semibold text-white">Madeira Canyon Expert</span>
          </div>
        </div>
      </div>
    </section>
  );
}
