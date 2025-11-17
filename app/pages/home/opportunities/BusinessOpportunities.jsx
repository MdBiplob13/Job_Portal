// components/BusinessOpportunities.jsx
import { Trophy } from "lucide-react"; // using lucide-react icons

export default function BusinessOpportunities() {
  return (
    <section className="bg-[#24334d] py-10 px-6 md:px-12 lg:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white">
        
        {/* Left Content */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <Trophy className="h-10 w-10 shrink-0" />
          <div>
            <p className="text-sm font-semibold">Win More New Business</p>
            <h2 className="text-xl md:text-2xl font-bold leading-snug">
              Thousands of business opportunities at your finger tips
            </h2>
          </div>
        </div>

        {/* Right Button */}
        <div>
          <a
            href="#"
            className="bg-white text-[#24334d] font-medium px-4 py-2 rounded-md shadow hover:bg-gray-100 transition"
          >
            Register now
          </a>
        </div>
      </div>
    </section>
  );
}
