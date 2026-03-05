import Link from 'next/link';
import { sendBIEvent } from '@/lib/trackers';
import { CSSProperties } from 'react';
import { TrackerEvents } from '@/enum/trackers';
interface WrappedLinkProps {
  href: string;
  target?: string;
  style?: CSSProperties;
  className?: string;
  children: React.ReactNode;
  name?: string;
  featureName?: string;
}

const WrappedLink = ({
  href,
  className,
  children,
  name = '',
  style,
  target
}: WrappedLinkProps) => {
  return (
    <Link
      target={target}
      onClick={() => {
        sendBIEvent(TrackerEvents.LinkClicked, {
          link: { name }
        });
      }}
      style={style}
      href={href}
      className={className}
    >
      {children}
    </Link>
  );
};

export default WrappedLink;
