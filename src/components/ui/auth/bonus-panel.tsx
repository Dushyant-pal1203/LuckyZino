import { useEffect, useState } from 'react';
import { FormContainer } from './form-container';
import Spinner from '../spinner';
import { getGameServerUrl } from '@/lib/utils';

interface IBonus {
  coins: number;
  sweeps: number;
}

export const BonusPanel = ({
  className,
  variant = 'registration'
}: {
  className?: string;
  variant: 'registration' | 'kyc';
}) => {
  const [panelData, setPanelData] = useState<IBonus | null>(null);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    if (variant === 'kyc') {
      setLoaded(true);
      return;
    }
    setLoaded(false);
    fetch(getGameServerUrl('/welcome-bonus'))
      .then(async (res) => {
        const bonusData = await res.json();
        setPanelData(bonusData as unknown as IBonus);
        setLoaded(true);
      })
      .catch((e) => {
        console.warn(e);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);
  const formatterNoDecimals = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0
  });
  const formatterCurrency = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2
  });
  return (
    <FormContainer
      className={`mb-4 !p-2 md:!p-5 !mt-8 md:!mt-4 min-h-[8.2rem] md:min-h-[8rem] ${className ?? ''}`}
    >
      {!isLoaded && <Spinner size={50}></Spinner>}
      {isLoaded && (
        <div className="relative flex justify-end">
          <img
            className="absolute h-[14rem] md:h-[14rem] md:-top-[7.3rem] object-fill z-[11] -top-[6.5rem] left-2 md:left-1"
            src="/images/auth/Lana_pink.png"
          ></img>
          <div className={`w-[70%] flex flex-col relative z-[12] pl-5 md:pl-4 ${variant === 'kyc' ? 'mt-10 md:mt-6' : ''}`}>
            <h1
              className={`text-white text-xl md:text-2xl font-extrabold uppercase font-['Exo_2'] mb-2 ${variant === 'kyc' ? 'text-center' : ''}`}
              style={{
                textShadow: `0px -0.559px 12.754px #07EDA8, 0px 0.559px 6.992px #048760`,
                lineHeight: '88%',
                letterSpacing: '1.12px'
              }}
            >
              {variant === 'registration' ? 'Welcome bonus' : 'Get 200% extra'}
            </h1>
            {variant === 'kyc' && (
              <div className="flex items-end">
                <p
                  style={{
                    textShadow: `0px -0.559px 12.754px #07EDA8, 0px 0.559px 6.992px #048760`,
                    lineHeight: '88%',
                    letterSpacing: '1.12px'
                  }}
                  className=" font-extrabold uppercase text-md rounded bg-[#241056CC] text-right ml-6 md:ml-16"
                >
                  on first purchase
                </p>
              </div>
            )}
            {variant === 'registration' && (
              <>
                <div className="flex items-center pl-12">
                  <img className="h-6 mt-1" src="/images/GCoinFront.png"></img>
                  <p className="pl-1 font-extrabold uppercase text-xl rounded bg-[#241056CC]">
                    {formatterNoDecimals.format(panelData?.coins ?? 12000000)}
                  </p>
                </div>
                <div className="flex items-center pl-12">
                  <img className="h-6 mt-1" src="/images/SCoinFront.png"></img>
                  <p className="pl-1 font-extrabold uppercase text-xl bg-[#241056CC]">
                    {formatterCurrency.format(panelData?.sweeps ?? 3.0)}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </FormContainer>
  );
};
