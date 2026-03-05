import { usePathname } from 'next/navigation';
import { MainNav } from './main-nav';

const restrictedHeaderPathnames = [
	'/game',
	'/lp/v1',
	'/lp/v2',
	'/lp/v3',
	'/lp/v4',
  '/lp/v5',
  '/lp/v6',
  '/lp/v7',
  '/lp/v8',
  '/lp/v9',
  '/lp/v10',
  '/lp/v11',
  '/lp/v12',
  '/lp/v13',
  '/lp/v14',
  '/vip-chat',
  '/otp'
];

export default function Header() {
	const path = usePathname();
	const isRestricted = restrictedHeaderPathnames.includes(path);
	if (isRestricted) return null;
  return (
    <header
      className="sticky flex justify-center text-white font-['Exo_2']"
      style={{
        backgroundImage: "url('/images/common/effects/gradient/primary-gradient.png')",
        backgroundRepeat: 'repeat-x',
        backgroundSize: 'contain',
      }}
    >
      <div className="mx-auto flex h-14 w-full items-center justify-center px-4 sm:px-6">
        <MainNav />
      </div>
    </header>
  );
}
