import * as React from "react";
import { SVGProps } from "react";
const TruckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={34} cy={38} r={4} stroke="#141B34" strokeWidth={2} />
    <circle cx={14} cy={38} r={4} stroke="#141B34" strokeWidth={2} />
    <path
      d="M4 18V27.894C4 32.658 4 35.04 5.46447 36.52C6.43821 37.5041 7.80655 37.8338 10 37.9443M24.8541 10C26.6807 10.5998 28.1128 12.0471 28.7063 13.8931C29 14.8064 29 15.935 29 18.1923C29 19.6971 29 20.4495 29.1958 21.0584C29.5914 22.289 30.5462 23.2539 31.7639 23.6538C32.3665 23.8516 33.111 23.8516 34.6 23.8516H44V27.894C44 32.658 44 35.04 42.5355 36.52C41.5618 37.5041 40.1935 37.8338 38 37.9443M18 38H30"
      stroke="#141B34"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M29 14H32.6424C35.5531 14 37.0085 14 38.1928 14.7074C39.3772 15.4148 40.0672 16.6962 41.4472 19.259L44 24"
      stroke="#141B34"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.6531 16L17.6262 13.6516C19.2087 12.4017 20 11.7767 20 11M14.6531 6L17.6262 8.34835C19.2087 9.59835 20 10.2234 20 11M20 11L4 11"
      stroke="#141B34"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default TruckIcon;
