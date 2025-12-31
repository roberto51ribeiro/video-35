
import React from 'react';

const iconProps = {
  className: "w-6 h-6",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const CameraIcon = () => (
  <svg {...iconProps}>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

export const GalleryIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <circle cx="8.5" cy="8.5" r="1.5"></circle>
    <polyline points="21 15 16 10 5 21"></polyline>
  </svg>
);

export const LandscapeIcon = () => (
  <svg {...iconProps} className="w-8 h-8" viewBox="0 0 24 24">
    <rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect>
  </svg>
);

export const PortraitIcon = () => (
    <svg {...iconProps} className="w-8 h-8" viewBox="0 0 24 24">
    <rect x="7" y="2" width="10" height="20" rx="2" ry="2"></rect>
  </svg>
);

export const SquareIcon = () => (
    <svg {...iconProps} className="w-8 h-8" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
  </svg>
);

export const DownloadIcon = () => (
  <svg {...iconProps}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

export const ShareIcon = () => (
  <svg {...iconProps}>
    <circle cx="18" cy="5" r="3"></circle>
    <circle cx="6" cy="12" r="3"></circle>
    <circle cx="18" cy="19" r="3"></circle>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
  </svg>
);

export const CloseIcon = () => (
  <svg {...iconProps} className="w-8 h-8">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const SparklesIcon = () => (
    <svg {...iconProps} stroke="currentColor" fill="currentColor">
        <path d="M9.25 2.75a.75.75 0 0 1 1.5 0V4h-1.5V2.75Z M13.25 4.75a.75.75 0 0 1 0-1.5h1.25V2a.75.75 0 0 1 1.5 0v1.25h1.25a.75.75 0 0 1 0 1.5h-1.25v1.25a.75.75 0 0 1-1.5 0V4.75h-1.25Z M20 9.75a.75.75 0 0 1 .75-.75h1.25a.75.75 0 0 1 0 1.5H20.75a.75.75 0 0 1-.75-.75Z M13 18.25a.75.75 0 0 1 1.5 0v1.25h1.25a.75.75 0 0 1 0 1.5h-1.25V22a.75.75 0 0 1-1.5 0v-1.25h-1.25a.75.75 0 0 1 0-1.5h1.25v-1.25Z M10 8a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z M5.25 6.75a.75.75 0 0 1 0-1.5h1.25V4a.75.75 0 0 1 1.5 0v1.25h1.25a.75.75 0 0 1 0 1.5H7.75v1.25a.75.75 0 0 1-1.5 0V6.75H5.25Z M4 13a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z M2.75 20.75a.75.75 0 0 1 1.5 0V22a.75.75 0 0 0 1.5 0v-1.25h1.25a.75.75 0 0 0 0-1.5H5.75v-1.25a.75.75 0 0 0-1.5 0v1.25H2.75a.75.75 0 0 0 0 1.5Z"/>
    </svg>
)
