import { useDailyLimitTimer } from '@/hooks/useDailyLimitTimer';
import { WithdrawalStepProps } from '@/types/withdrawal';
import { FiClock } from 'react-icons/fi';
import { PiWarning } from 'react-icons/pi';

const CooldownStep = ({ data: { account } }: WithdrawalStepProps) => {

  const minAmount = account?.eligibility?.minRedeemAmount;
  const initialTimeLeft = account?.eligibility?.nextAvailableAtUtc || '';
  const balance = account?.balance || 0;

  const timeLeft = useDailyLimitTimer(initialTimeLeft);

  const baseContainer = 'flex flex-col items-center w-full'; 
  const cooldownBalanceStyles =
    `${baseContainer} text-white font-["Exo_2"]`;
  const headerStyles =
    'text-white text-center text-[42px] font-semibold leading-[112%] tracking-[0.92px] mb-6';
  const subHeaderStyles =
    'text-white text-center text-[18px] font-semibold leading-[112%] tracking-[0.92px] mb-2';
  const coinFieldStyles =
    'flex items-center gap-1 text-center text-[#9469B1] text-[12px] font-semibold leading-[104%] tracking-[0.72px]';
  const amountStyles =
    'flex flex-row items-center justify-center gap-6 text-[#9469B1] mb-3';
  const textStyles =
    'font-semibold text-[14px] leading-[100%] tracking-[0.56px]';
  const currencyStyles =
    'text-[#57E576] text-center text-[14px] font-bold tracking-[0.88px] [text-shadow:0px_1.5px_0px_#241056]';
  const coinRateStyles =
    'coin-rate flex flex-row items-center justify-center gap-1 font-semibold text-[14px] leading-[88%] tracking-[0.56px]';
  const sweepCoinsIcon = 'sweep-coins-icon w-3 h-3';
  const coinsIconPath = '/withdrawal_imgs/SweepCoinsIcon.png';

  return (
    <>
      <div className="middle flex-1 flex flex-col justify-center overflow-y-auto gap-8">
        <div className={baseContainer}>
          <PiWarning size={100} color="#fda755" />
          <h1 className={headerStyles}>Redemtions Limit Reached</h1>
        </div>
        <div className="flex items-center justify-between bg-[rgba(93,12,180,0.75)] rounded-[8px] w-full px-4 py-2">
          <div className={baseContainer}>
            <h2 className={subHeaderStyles}>Next redemptions availible in:</h2>
            {timeLeft !== '' && (
              <div className="text-[#FFA347] text-[34px] font-bold leading-[100%] tracking-[0.56px] flex items-center justify-center">
                <FiClock className="shrink-0" />
                &nbsp;
                <span className="min-w-[64px]">{timeLeft}</span>
              </div>
            )}
          </div>
        </div>
        <div className={cooldownBalanceStyles}>
          <div className={amountStyles}>
            <div className="flex flex-row items-center justify-center gap-1">
              <span className={textStyles}>Balance: </span>
              <h3 className={currencyStyles}>{`SC ${balance}`}</h3>
            </div>
            <div className={coinRateStyles}>
              <img src={coinsIconPath} className={sweepCoinsIcon}></img>
              <p>
                1 = <span>$1</span>
              </p>
            </div>
          </div>
          <div className={coinFieldStyles}>
            <span>
              The redeemed value of your sweepstakes <br /> prize will be {'$'}
              {minAmount}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CooldownStep;
