import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link, useLocation } from "react-router-dom";

export default function CompleteProfileLinks() {
  const location = useLocation();
  
  const links = [
    { label: "Profile", path: "/userprofile" },
    { label: "Personal Info", path: "/userprofile/personalinfo" },
    // { label: "Contact Info", path: "/userprofile/contactInfo" },
    { label: "Education Info", path: "/userprofile/education-info" },
    { label: "Job Details", path: "/userprofile/job-details-info" },
    { label: "Documents", path: "/userprofile/documents" },
    { label: "Bank Details", path: "/userprofile/bank-details" },
    { label: "Skills", path: "/userprofile/skills" },
    { label: "Certificates", path: "/userprofile/certificates" },
  ];

  return (
    <div>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        spaceBetween={15}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {links.map((link, index) => {
          const isActive = location.pathname === link.path;
          
          return (
            <SwiperSlide key={index}>
              <Link
                to={link.path}
                className={`block px-4 py-2 rounded-lg text-center transition ${
                  isActive
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-[#34495e] text-white hover:opacity-90"
                }`}
              >
                {link.label}
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
 
      <div className="custom-pagination mt-3 flex justify-center space-x-2"></div>
    </div>
  );
}