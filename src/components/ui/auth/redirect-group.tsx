import WrappedLink from '../wrapped-link';

export const RedirectGroup = ({
  href,
  title,
  text,
	containerClass,
	linkClass
}: {
  href: string;
  title: string;
  text: string;
	feature?: string;
  containerClass?: string;
  linkClass?: string;
}) => {
  return (
    <div className={`flex flex-row items-center justify-center gap-2 py-6 font-['Exo_2'] ${containerClass ?? ''}`}>
      <div className="text-center text-white">{text}</div>
      <WrappedLink
        name={href.replace('/', '')}
        href={href}
        className={`text-md text-white uppercase font-extrabold racking-[0.8px] [text-shadow:0_2px_0_rgba(0,0,0,0.2)] text-center p-3 w-36 md:w-32 h-12 no-underline hover:brightness-110 bg-cover bg-no-repeat bg-center contrast-[120%] ${linkClass ?? ''}`}
        style={{ backgroundImage: 'url(/images/btns/login.png)' }}
      >
        {title}
      </WrappedLink>
    </div>
  );
};
