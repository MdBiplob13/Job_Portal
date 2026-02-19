"use client";

import useUser from "@/app/hooks/user/userHook";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function Hero() {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Location");
  const comboboxRef = useRef(null);

  // Full list of Caribbean locations
  const locations = [
    "Antigua and Barbuda",
    "The Bahamas",
    "Barbados",
    "Belize",
    "Cuba",
    "Dominica",
    "Dominican Republic",
    "Grenada",
    "Guyana",
    "Haiti",
    "Jamaica",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Suriname",
    "Trinidad and Tobago",
    "Anguilla",
    "Bermuda",
    "British Virgin Islands",
    "Cayman Islands",
    "Montserrat",
    "Turks and Caicos Islands",
    "Guadeloupe",
    "Martinique",
    "Saint Barthélemy",
    "Saint Martin",
    "Aruba",
    "Curaçao",
    "Sint Maarten",
    "Bonaire",
    "Saba",
    "Sint Eustatius",
    "Puerto Rico",
    "United States Virgin Islands",
    "Saint Pierre and Miquelon",
  ];

  // Filter locations based on search term
  const filteredLocations = locations.filter((loc) =>
    loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (comboboxRef.current && !comboboxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative w-full h-[720px] -mt-[62px] overflow-hidden">
      {/* Background Image */}
      <img
        src="/home_banner.png"
        alt="Home Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#0B2C4A]/75"></div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center">
        <div className="max-w-3xl text-white space-y-6">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Post Job.
            <br />
            Win Bid & Earn.
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-white/90">
            We value your time and Bidpole proves it.
            <br />
            Come to Bidpole and your search for best professional.
            <br />
            If you are professional come to Bidpole and start earning.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/pages/browse/professional"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0B2C4A] font-semibold rounded-full hover:bg-[#53CBFB] hover:text-white transition cursor-pointer"
            >
              🔍 Looking for Professional
            </Link>

            <Link
              href={user?.email ? "/pages/dashboard/professional" : "/pages/auth/login"}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0B2C4A] font-semibold rounded-full hover:bg-[#53CBFB] hover:text-white transition cursor-pointer"
            >
              💼 Earn as a Professional
            </Link>
          </div>

          {/* Search Section */}
          <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row gap-3 shadow-xl max-w-3xl border border-white/20">
            <input
              type="text"
              placeholder="Search job or professional"
              className="flex-1 px-4 py-3 rounded-xl bg-transparent border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#53CBFB]"
            />

            {/* Combobox */}
            <div className="relative w-full sm:w-[220px]" ref={comboboxRef}>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-4 py-3 rounded-xl bg-transparent border border-white/30 text-white flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#53CBFB]"
              >
                <span className={selectedLocation === "Location" ? "text-white/70" : "text-white"}>
                  {selectedLocation}
                </span>
                <svg
                  className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search location..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-[#53CBFB]"
                      autoFocus
                    />
                  </div>
                  <ul className="py-1">
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((location) => (
                        <li
                          key={location}
                          onClick={() => {
                            setSelectedLocation(location);
                            setIsOpen(false);
                            setSearchTerm("");
                          }}
                          className="px-4 py-2 text-black hover:bg-[#53CBFB] hover:text-white cursor-pointer transition"
                        >
                          {location}
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-gray-500">No locations found</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <button className="px-6 py-3 bg-[#53CBFB] text-white font-semibold rounded-xl hover:bg-[#0B2C4A] transition cursor-pointer">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}