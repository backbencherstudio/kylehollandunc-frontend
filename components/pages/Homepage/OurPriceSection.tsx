import RightArrowIcon from "@/components/icons/RIghtArrowIcon";
import SectionLabel, { SectionHeading } from "@/components/reusable/SectionLabel";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";

export default function OurPriceSection() {
    return (
      <section className="relative overflow-hidden max-w-[2180px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[140px] py-16 sm:py-20 lg:py-[120px]">
  
        {/* Content Wrapper */}
        <div className="max-w-[1320px] mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
  
          {/* Left Side */}
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <SectionLabel className="w-fit">Our Price</SectionLabel>
              <SectionHeading>Industry best Pricing</SectionHeading>
            </div>
  
            <p className="max-w-[615px] text-[#4A4C56] text-base md:text-lg font-normal leading-[150%] tracking-[0.09px]">
              At Lake Norman Labs, we believe in transparent, straightforward
              pricing with no surprises. Our testing fees are clearly listed so
              you can choose the right service with confidence. Each price
              reflects the accuracy and reliability our clients across the
              Carolinas trust.
            </p>
          </div>
  
          {/* Right Side Card */}
          <div className="w-full lg:max-w-[596px] flex flex-col items-start gap-[42px] bg-[#023347] p-6 md:p-8 rounded-xl relative z-10">
  
            {/* Top Content */}
            <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 w-full">
  
              {/* Price Info */}
              <div className="flex flex-col justify-between max-w-[174px]">
                <h4 className="text-white font-syne text-2xl md:text-[32px] font-bold leading-[120%]">
                  Standard Panel
                </h4>
  
                <div>
                  <p className="text-white font-syne text-4xl md:text-5xl mb-1 font-bold leading-[120%]">
                    <span>$</span>199
                  </p>
  
                  <p className="text-[#E9E9EA] text-base md:text-lg font-normal leading-[150%] tracking-[0.09px]">
                    Per sample
                  </p>
                </div>
              </div>
  
              {/* Includes */}
              <div className="flex-1">
                <p className="text-white mb-4 font-syne text-xl md:text-2xl font-bold leading-[120%]">
                  What's Includes
                </p>
  
                <div className="flex flex-col gap-3">
                  {[
                    "Identity Verification",
                    "Purity Assessment",
                    "Amount Check",
                    "Detailed Report",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircleIcon className="w-5 h-5 text-white" />
                      <p className="text-white text-base md:text-lg font-normal leading-[150%] tracking-[0.09px]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
  
            </div>
  
            {/* Bottom Button */}
            <div className="w-full">
              <Link href="/services"className="w-full px-6 py-3 rounded-lg bg-[linear-gradient(180deg,#84B6DE_0%,#1C5E96_100%)] text-white flex items-center justify-center gap-3 hover:opacity-90 transition-opacity duration-300">
                View services
                <RightArrowIcon className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
  
        </div>
  
        {/* ================= Background Blur Layer ================= */}
  
        <div className="absolute inset-0 -z-10">
  
          <div className="w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] absolute left-[-120px] sm:left-[-183px] bottom-[-120px] sm:bottom-[-134px] bg-[#84B6DE] blur-[200px] sm:blur-[264px] rounded-full" />
  
          <div className="w-[300px] sm:w-[448px] h-[300px] sm:h-[448px] absolute right-[-60px] sm:right-[-88px] top-[-40px] sm:top-[-54px] bg-[#1C5E96] blur-[200px] sm:blur-[264px] rounded-full" />
  
        </div>
  
      </section>
    );
  }
  