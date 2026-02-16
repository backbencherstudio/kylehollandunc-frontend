
import { SVGProps } from "react";
const RightArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={16}
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_6257_1518)">
      <path
        d="M0.902344 8.03906L19.0436 8.03906"
        stroke="white"
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
      <path
        d="M11.0703 0.710938C11.0703 4.81094 14.6363 8.12807 19.044 8.12807"
        stroke="white"
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
      <path
        d="M19.0967 8.29688C14.6891 8.29688 11.123 11.614 11.123 15.714"
        stroke="white"
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
    </g>
    <defs>
      <clipPath id="clip0_6257_1518">
        <rect width={20} height={16} fill="white" />
      </clipPath>
    </defs>
  </svg>
);
export default RightArrowIcon;
