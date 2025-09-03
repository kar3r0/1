import React from 'react';
import type { LinkData } from '../types';
import { InstagramIcon } from './icons/InstagramIcon';
import { TikTokIcon } from './icons/TikTokIcon';
import { SnapchatIcon } from './icons/SnapchatIcon';
import { TellonymIcon } from './icons/TellonymIcon';

interface LinkButtonProps {
  link: LinkData;
}

const PlatformIcon: React.FC<{ iconName: string; className?: string }> = ({ iconName, className }) => {
  switch (iconName) {
    case 'instagram_icon_svg':
      return <InstagramIcon className={className} />;
    case 'tiktok_icon_svg':
      return <TikTokIcon className={className} />;
    case 'snapchat_icon_svg':
      return <SnapchatIcon className={className} />;
    case 'tellonym_icon_svg':
      return <TellonymIcon className={className} />;
    default:
      return null;
  }
};

export const LinkButton: React.FC<LinkButtonProps> = ({ link }) => {
  const style: React.CSSProperties = {
    color: link.style.textColor,
  };

  if (link.style.backgroundColor.startsWith('linear-gradient')) {
    style.backgroundImage = link.style.backgroundColor;
  } else {
    style.backgroundColor = link.style.backgroundColor;
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-full p-4 rounded-xl font-bold text-lg transition-transform hover:scale-105 shadow-md"
      style={style}
    >
      <PlatformIcon iconName={link.icon} className="w-6 h-6 mr-3" />
      <span>{link.platform}</span>
    </a>
  );
};