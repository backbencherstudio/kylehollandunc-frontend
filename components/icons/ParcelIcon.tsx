import * as React from "react";
import { SVGProps } from "react";
const ParcelIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={48}
    height={48}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4 26.8571V16H44V26.8571C44 34.9384 44 38.979 41.3965 41.4895C38.793 44 34.6027 44 26.2222 44H21.7778C13.3973 44 9.20699 44 6.6035 41.4895C4 38.979 4 34.9384 4 26.8571Z"
      stroke="#141B34"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 16L5.92308 11.3846C7.41453 7.80514 8.16025 6.0154 9.6718 5.0077C11.1833 4 13.1222 4 17 4H31C34.8778 4 36.8167 4 38.3282 5.0077C39.8397 6.0154 40.5855 7.80514 42.0769 11.3846L44 16"
      stroke="#141B34"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <path d="M24 16V4" stroke="#141B34" strokeWidth={2} strokeLinecap="round" />
    <path
      d="M20 24H28"
      stroke="#141B34"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);
export default ParcelIcon;
