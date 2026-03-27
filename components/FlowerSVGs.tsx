import React from 'react';

// For HTML representation (e.g. Toolbar)
interface FlowerProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}

export const Rose = ({ color = '#ff9eb5', size = 100, ...props }: FlowerProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100" {...props}>
    <path d="M50 75 Q45 90 50 100" stroke="#84dcc6" strokeWidth="4" fill="none" />
    <path d="M50 85 Q65 80 60 70" stroke="#84dcc6" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M50 15 C70 -10, 90 20, 75 45 C90 70, 60 90, 50 75 C40 90, 10 70, 25 45 C10 20, 30 -10, 50 15 Z" fill={color} />
    <path d="M50 15 C60 0, 70 15, 60 35 C50 45, 40 45, 40 35 C30 15, 40 0, 50 15 Z" fill="rgba(255,255,255,0.3)" />
  </svg>
);

export const Tulip = ({ color = '#ffb3c6', size = 100, ...props }: FlowerProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100" {...props}>
    <path d="M50 65 Q50 90 50 100" stroke="#84dcc6" strokeWidth="4" fill="none" />
    <path d="M50 80 Q35 70 35 55" stroke="#84dcc6" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M50 85 Q65 75 65 60" stroke="#84dcc6" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M30 35 Q50 85 70 35 Q60 15 50 30 Q40 15 30 35 Z" fill={color} />
    <path d="M40 35 Q50 60 60 35 Q55 20 50 30 Q45 20 40 35 Z" fill="rgba(255,255,255,0.4)" />
  </svg>
);

export const Sunflower = ({ color = '#fff3b0', size = 100, ...props }: FlowerProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100" {...props}>
    <path d="M50 50 L50 100" stroke="#84dcc6" strokeWidth="4" fill="none" />
    <path d="M50 75 Q30 75 25 60" stroke="#84dcc6" strokeWidth="4" fill="none" strokeLinecap="round"/>
    <g fill={color}>
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse key={i} cx="50" cy="25" rx="8" ry="25" transform={`rotate(${i * 30} 50 50)`} />
      ))}
    </g>
    <circle cx="50" cy="50" r="15" fill="#a47148" />
    <circle cx="50" cy="50" r="12" fill="#8c5836" />
  </svg>
);

// For Canvas (Konva Image rendering)
const encodeSvg = (svgString: string) => {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
};

export const getFlowerImageSrc = (type: string, color: string) => {
  if (type === 'rose') {
    return encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 100 100"><path d="M50 75 Q45 90 50 100" stroke="#84dcc6" stroke-width="4" fill="none" /><path d="M50 85 Q65 80 60 70" stroke="#84dcc6" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M50 15 C70 -10, 90 20, 75 45 C90 70, 60 90, 50 75 C40 90, 10 70, 25 45 C10 20, 30 -10, 50 15 Z" fill="${color}" /><path d="M50 15 C60 0, 70 15, 60 35 C50 45, 40 45, 40 35 C30 15, 40 0, 50 15 Z" fill="rgba(255,255,255,0.3)" /></svg>`);
  }
  if (type === 'tulip') {
    return encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 100 100"><path d="M50 65 Q50 90 50 100" stroke="#84dcc6" stroke-width="4" fill="none" /><path d="M50 80 Q35 70 35 55" stroke="#84dcc6" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M50 85 Q65 75 65 60" stroke="#84dcc6" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M30 35 Q50 85 70 35 Q60 15 50 30 Q40 15 30 35 Z" fill="${color}" /><path d="M40 35 Q50 60 60 35 Q55 20 50 30 Q45 20 40 35 Z" fill="rgba(255,255,255,0.4)" /></svg>`);
  }
  
  let petals = '';
  for(let i=0; i<12; i++) {
    petals += `<ellipse cx="50" cy="25" rx="8" ry="25" transform="rotate(${i * 30} 50 50)" />`;
  }
  return encodeSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 100 100"><path d="M50 50 L50 100" stroke="#84dcc6" stroke-width="4" fill="none" /><path d="M50 75 Q30 75 25 60" stroke="#84dcc6" stroke-width="4" fill="none" stroke-linecap="round"/><g fill="${color}">${petals}</g><circle cx="50" cy="50" r="15" fill="#a47148" /><circle cx="50" cy="50" r="12" fill="#8c5836" /></svg>`);
};
