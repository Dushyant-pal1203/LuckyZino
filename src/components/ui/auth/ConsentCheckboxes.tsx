import { TrackerEvents } from '@/enum/trackers';
import { sendBIEvent } from '@/lib/trackers';
import clsx from 'clsx';
import { CheckIcon } from 'lucide-react';
import Link from 'next/link';

const ConsentCheckboxes = ({
  box1Checked,
  box2Checked,
  setBox1Checked,
  setBox2Checked
}: {
  box1Checked: boolean;
  box2Checked: boolean;
  setBox1Checked: (v: boolean) => void;
  setBox2Checked: (v: boolean) => void;
}) => {
  return (
    <div className="text-white space-y-4 mt-2 text-sm relative z-[20]">
      <label className="flex items-start relative">
        <input
          type="checkbox"
          name="box1"
          onChange={() => {
						setBox1Checked(!box1Checked);
						sendBIEvent(TrackerEvents.CheckboxAccept, {
							legal: { name: 'age_territory', version: '1.2' }
						});
          }}
          checked={box1Checked}
          className={clsx(
            'w-[44px] h-[20px] mt-[4px] mr-[4px] z-10 rounded border-4 md:border-2 appearance-none flex items-center justify-center',
            box1Checked
              ? 'bg-green-500 border-green-500'
              : 'bg-transparent border-gray-400'
          )}
        />

        {box1Checked && (
          <CheckIcon
            className="w-4 h-4 text-white absolute pointer-events-none"
            style={{ top: '6px', left: '2px', zIndex: 11 }}
          />
        )}
        <span className="text-sm text-gray-300">
          I confirm that I am at least 18 years old and not a resident of the 
          <Link
            className="underline font-semibold"
            target="_blank"
            href={'/terms-and-conditions#excluded-territories'}
          >
            Excluded Territories
          </Link>
          . I do not have any existing Luckyzino accounts.
        </span>
      </label>

      <label className="flex items-start relative">
        <input
          type="checkbox"
          name="box2"
          checked={box2Checked}
          onChange={() => {
						setBox2Checked(!box2Checked);
						sendBIEvent(TrackerEvents.CheckboxAccept, {
							legal: { name: 'terms_pp_sr', version: '1.2' }
						});
          }}
          className={clsx(
            'w-[50px] h-[20px] mt-[4px] mr-[4px] z-10 rounded border-4 md:border-2 appearance-none flex items-center justify-center',
            box2Checked
              ? 'bg-green-500 border-green-500'
              : 'bg-transparent border-gray-400'
          )}
        />

        {box2Checked && (
          <CheckIcon
            className="w-4 h-4 text-white absolute pointer-events-none"
            style={{ top: '6px', left: '2px', zIndex: 11 }}
          />
        )}
        <span className="text-sm text-gray-300">
          By creating an account or using the services, I acknowledge that I
          have read and agree to the 
          <Link
            className="underline font-semibold"
            target="_blank"
            href={'/terms-and-conditions'}
          >
            Terms and Conditions
          </Link>
          , 
          <Link
            className="underline font-semibold"
            target="_blank"
            href={'/sweepstakes-rules'}
          >
            Sweepstakes Rules
          </Link>
          , and 
          <Link
            className="underline font-semibold"
            target="_blank"
            href={'/privacy-policy'}
          >
            Privacy Policy
          </Link>
          .
        </span>
      </label>
    </div>
  );
};

export default ConsentCheckboxes;
