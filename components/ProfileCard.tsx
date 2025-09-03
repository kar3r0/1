import React, { useState, useEffect } from 'react';
import type { CardData } from '../types';
import { LinkButton } from './LinkButton';
import { LocationIcon } from './icons/LocationIcon';

interface ProfileCardProps {
  data: CardData;
}

const getShapeClassName = (shape: string): string => {
  switch (shape) {
    case 'circle':
      return 'rounded-full';
    case 'square':
      return 'rounded-none';
    case 'rounded':
      return 'rounded-2xl';
    default:
      return 'rounded-full';
  }
};

const DynamicInfoLine: React.FC<{ subtitle: string; location: string }> = ({ subtitle, location }) => {
  // A more descriptive and professional list of items to cycle through, with specific icons.
  const items = [
    { text: 'Chemistry Student', icon: '🧪' },
    { text: 'University of Samarra', icon: '🎓' },
    { text: 'Barber', icon: '✂️' },
    { text: location, icon: <LocationIcon className="w-4 h-4" /> },
  ];

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (items.length <= 1) return;

    const interval = setInterval(() => {
      setVisible(false); // Trigger fade out
      setTimeout(() => {
        setIndex(prevIndex => (prevIndex + 1) % items.length);
        setVisible(true); // Trigger fade in
      }, 500); // Half-second for the fade transition
    }, 3000); // 3 seconds display time for each item

    return () => clearInterval(interval);
  }, [items.length]);

  const currentItem = items[index];

  return (
    <div className="text-md text-gray-300 mt-2 flex items-center justify-center h-6" aria-live="polite"> {/* Fixed height to prevent layout shifts */}
      <div
        key={index} // Use key to help React differentiate elements for animation
        className={`flex items-center transition-opacity duration-500 ease-in-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="flex items-center justify-center mr-2 w-6">{currentItem.icon}</span>
        <span>{currentItem.text}</span>
      </div>
    </div>
  );
};

const ProfileSection: React.FC<{ profile: CardData['profile'] }> = ({ profile }) => (
  <div className="flex flex-col items-center text-center p-6 w-full">
    <img
      src={profile.picture.url}
      alt={profile.name}
      className={`w-24 h-24 md:w-28 md:h-28 ${getShapeClassName(profile.picture.shape)} border-4 object-cover shadow-lg`}
      style={{ borderColor: profile.picture.borderColor }}
    />
    <h1 className="text-2xl font-bold text-white mt-4">{profile.name}</h1>
    
    <DynamicInfoLine subtitle={profile.subtitle} location={profile.location} />

    {/* Restyled Quote */}
    <blockquote className="mt-5 w-full max-w-xs text-center">
        <p 
          className="text-md text-gray-200 italic relative p-3 
                     before:content-['“'] before:absolute before:left-0 before:top-0 before:text-4xl before:text-white/20
                     after:content-['”'] after:absolute after:right-0 after:bottom-[-0.5rem] after:text-4xl after:text-white/20"
        >
          {profile.quote.text}
        </p>
    </blockquote>
  </div>
);

const LinksSection: React.FC<{ links: CardData['links'] }> = ({ links }) => (
  <div className="flex flex-col gap-4 w-full px-6">
    {links.map((link) => (
      <LinkButton key={link.platform} link={link} />
    ))}
  </div>
);

const FooterSection: React.FC<{ footer: CardData['footer'] }> = ({ footer }) => (
  <footer className="text-center p-6 text-sm" style={{ color: footer.textColor }}>
    {footer.text}
  </footer>
);


const ProfileCard: React.FC<ProfileCardProps> = ({ data }) => {
  const { card, profile, links, footer } = data;
  
  // Helper to convert hex to rgba for transparency
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };


  return (
    <div
      className="w-full max-w-sm mx-auto flex flex-col items-center shadow-2xl overflow-hidden backdrop-blur-md border border-white/20"
      style={{
        backgroundColor: hexToRgba(card.backgroundColor, 0.3), // 70% transparent
        borderRadius: card.borderRadius,
        fontFamily: card.fontFamily,
      }}
    >
      <ProfileSection profile={profile} />
      <LinksSection links={links} />
      <FooterSection footer={footer} />
    </div>
  );
};

export default ProfileCard;