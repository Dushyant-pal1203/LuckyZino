import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import heading from 'remark-heading-id';
import '../../markdown.css';
// TODO: Replace with data from DB
const data = `
**SWEEPSTAKES RULES**

Version: 1.6

Date: 20 February 2026

**NO PURCHASE OR PAYMENT NECESSARY TO ENTER OR WIN. A PARTICIPANT’S CHANCES OF WINNING WILL NOT INCREASE WITH ANY PURCHASE OR PAYMENT.** 

**BY ENTERING, YOU AGREE TO THESE SWEEPSTAKES RULES, WHICH CONSTITUTE A CONTRACT, SO PLEASE READ THEM CAREFULLY BEFORE ENTERING. THIS CONTRACT INCLUDES, WITHOUT LIMITATION, INDEMNITIES FROM YOU AND A LIMITATION OF YOUR RIGHTS AND REMEDIES.**

**PARTICIPATION IS VOID WHERE PROHIBITED OR RESTRICTED BY LAW. YOU MUST BE AT LEAST EIGHTEEN (18) YEARS OF AGE OR SUCH HIGHER MINIMUM LEGAL AGE OF MAJORITY IN YOUR JURISDICTION TO PARTICIPATE.** **PLEASE READ ALL [TERMS AND CONDITIONS](/terms-and-conditions) OF THESE RULES CAREFULLY. THESE RULES ARE SUBJECT TO OUR [TERMS AND CONDITIONS](/terms-and-conditions), WHICH INCLUDE AN AGREEMENT TO RESOLVE DISPUTES BY ARBITRATION ON AN INDIVIDUAL BASIS AND A WAIVER OF CLASS, GROUP OR REPRESENTATIVE ACTION.**

These Sweepstakes Rules are to be read in conjunction with Luckyzino’s [Terms and Conditions](/terms-and-conditions) and are not meant as a replacement. Terms defined in the [Terms and Conditions](/terms-and-conditions) shall have the same meaning in these Sweepstakes Rules.

Additionally, Luckyzino’s [Privacy Policy](/privacy-policy) applies to these Sweepstakes Rules, and any information provided by a Participant pursuant to these Sweepstakes Rules will be subject to the terms of the [Privacy Policy](/privacy-policy).

Luckyzino is an online social platform that offers a variety of game content for entertainment and enjoyment. Games are played using our in-game currency known as “**Gold Coins**”. To promote gameplay activity, Luckyzino also offers Participants sweepstakes entries referred to as “**Sweeps Coins**” or “**Sweep Coins**” or “**Sweepstakes Coins**” (“**SC**” or “**SCs**”) as set out in these Sweepstakes Rules. SCs may be used to play Games in Promotional Play for a chance to accumulate eligible SCs, which may, under the circumstances outlined below, be redeemable for prizes and cash. SCs cannot be purchased under any circumstances.

_1._ **SPONSOR/PROMOTER.** The Sponsor/Promoter of the Sweepstakes is Silver Rhino LTD, a legal entity registered at 2 Poreias, Limassol, 3011, Republic of Cyprus (“**Luckyzino**”, “**we**” or “**our**”).

_2._ **ELIGIBILITY TO PARTICIPATE IN SWEEPSTAKES**

_a._ **Luckyzino’s Sweepstakes (the “Sweepstakes”) is open only to legal residents (individuals who are at least eighteen (18) years old or such higher minimum legal age of majority in their jurisdiction (whichever occurs later) at the time of entry) of the fifty (50) United States (excluding Alabama, Arizona, California, Connecticut, Idaho, Kentucky, Louisiana, Michigan, Montana, Nevada, New Jersey, New York, Tennessee, Washington) and the District of Columbia. PARTICIPATION IS VOID WHERE PROHIBITED BY LAW.**

_b._ **PARTICIPATION IS VOID IN THE STATES OF ALABAMA, ARIZONA, CALIFORNIA, CONNECTICUT, IDAHO, KENTUCKY, LOUISIANA, MICHIGAN, MONTANA, NEVADA, NEW JERSEY, NEW YORK, TENNESSEE, WASHINGTON. See Luckyzino’s [Terms and Conditions](/terms-and-conditions) for more information.**

_c._ A person who participates in the Sweepstakes is a “**Participant**”.

_d._ Employees of Luckyzino and its respective parents, subsidiaries, divisions, affiliates, suppliers, distributors, and advertising, promotional, and judging agencies, including the administrator of this Sweepstakes (if any), and each of their respective officers, directors, and employees, and the immediate family members (spouses, parents, step-parents, legal guardians, children, step-children, siblings and step-siblings, and their spouses) and household members of each (whether or not related), are not eligible to participate or win.

_e._ The Sweepstakes is subject to all applicable federal, state, provincial, territorial, and local laws and regulations. It is the sole responsibility of the Participant to determine whether their participation in the Sweepstakes is legal and compliant with all regulations in the jurisdiction where they reside.

_f._ Participation in Promotional Play constitutes the Participant’s full and unconditional agreement to these Sweepstakes Rules, Luckyzino’s [Terms and Conditions](/terms-and-conditions), [Privacy Policy](/privacy-policy), and all decisions made by Luckyzino, which are final and binding in all matters related to the Sweepstakes.

_g._ Winning a Prize is contingent upon fulfilling all requirements set out in these Sweepstakes Rules and the [Terms and Conditions](/terms-and-conditions). If a Participant is, in Luckyzino’s best judgment, determined to have participated in unethical behavior, Luckyzino reserves the right to limit or exclude the Participant from the Sweepstakes.

_h._ Luckyzino’s decisions as to the administration and operation of the Sweepstakes are final and binding.

_3._ **HOW TO ENTER/PARTICIPATE IN SWEEPSTAKES**

_a._ To participate in the Sweepstakes, Participants must have an active Customer Account. If you do not have a Customer Account, you can create one free of charge at [https://luckyzino.com](https://luckyzino.com). Luckyzino offers two modes of gameplay: (1) Standard Play (social mode) in which games are played using a virtual currency known as “Gold Coins”, and (2) Promotional Play, in which Participants can play games with SCs. Participants can choose to play in either mode, and they can go back-and-forth between modes as they choose. 

_b._ Participants can change between each mode of play by selecting a toggle switch, which is clearly displayed in the top bar of the Platform. 

_c._ When Participants play in Promotional Play, they will play Games using SCs for the chance to win further SCs, which may be redeemable for prizes and/or cash. SCs may be obtained in numerous ways as described below. NO PURCHASE OR PAYMENT OF ANY KIND IS EVER REQUIRED TO OBTAIN SWEEPS COINS. A PURCHASE OR PAYMENT DOES NOT INCREASE YOUR CHANCES OF WINNING.

_d._ **Participants** **may obtain SCs, which can never be purchased, in the following ways:**

_i._ **Signup bonus:** At its sole discretion, Luckyzino may issue a set amount of free SCs to users who sign up and log into the Platform for the first time. To create a Customer Account, Participants must visit [https://luckyzino.com](https://luckyzino.com) and follow the required steps. Customer Accounts are free to create. Only one (1) Customer Account is allowed per Participant.

_ii._ **Daily bonus:** A Participant may be awarded a set amount of free SCs the first time that they log into their Customer Account each day. Participants can only claim a Daily Bonus once per day (the daily clock resets every 24 hours). To collect SCs, follow the next steps:   
_\\-_ sign into Customer Account;  
_\\-_ click the “Get Coins” button at the top of the Platform page;  
_\\-_ click the “Daily Bonus” button at the top of the “Get Coins” pop up;  
_\\-_ if the Participant is eligible, click the “Claim” button at the bottom of the Daily Bonus tab.

_iii._ **Promotional bonus**: A Participant may be awarded a set amount of free SCs as a bonus upon the purchase of specifically marked packs of Gold Coins. The number of SCs a Participant will receive as a bonus for each relevant Gold Coin purchase will vary by package and be clearly displayed to Participants.

_iv._ **No-cost giveaway contests on Luckyzino social media pages.** Luckyzino may hold no-cost giveaway contests which Participants can enter by following the instructions provided in the contest. These giveaways may require sharing posts or answering various game related questions to be eligible for entry, etc. The amount of SCs given away will be stated on the applicable no-cost contest post and will be added to each contest winner’s account at the conclusion of the giveaway. These giveaways may be subject to additional restrictions and rules, as referenced in the applicable materials / posts at the time of the contest.

_v._ **ALTERNATIVE MODE OF ENTRY - Sending a Request Card by Post:** Participants can receive free SCs by sending a standard postcard or blank piece of white paper made to size (“**Request Card**”) which must be 4” x 6”, unfolded, blank and unlined and placed inside a stamped \#10 envelope addressed in handwriting, to the following address and satisfying the requirements set out below, including a unique Mail-In Request Code described below:

**LuckyZino** \n
**PO Box 9063** \n
**Portland ME 04104** \n


Participants must:

_1._ Legibly handwrite the following on the outer envelope:

On the front, top left of the envelope: Their return/residential address; and

On the back, mid-center (not top) of the envelope: Their unique Mail-In Request Code generated to their Luckyzino Customer Account (instructions on how to obtain the Mail-In Request Code are below).

_2._ Legibly handwrite the following on only one side of the Request Card inserted inside the envelope IN THE FOLLOWING ORDER:

On the top left of the card:

_\\-_ Their unique Mail-In Request Code generated to their Luckyzino Customer Account (instructions on how to obtain the Mail-In Request Code are below);

_\\-_ Participant’s full name as shown on their Luckyzino Customer Account and government-issued identification;

_\\-_ The email address registered to their Luckyzino Customer Account;

_\\-_ The return/residential address registered to their Luckyzino Customer Account.

On the top right of the card:

_\\-_ The date on which the letter was prepared by the Participant (MM-DD-YYYY format).

_3._ Additionally, on the front side of the Request Card, the Participant must write the following statement clearly, underneath the information outlined above:

**"I wish to receive Sweeps Coins to participate in the Luckyzino Sweepstakes. By submitting this request, I hereby declare that I have read, understood and agree to be bound by Luckyzino’s [Terms and Conditions](/terms-and-conditions) and Sweepstakes Rules."**

**FOR THE AVOIDANCE OF DOUBT, COMBINED REQUESTS SENT VIA PACKAGE OR PARCEL DO NOT MEET THE REQUIREMENTS SET OUT ABOVE AND ARE INVALID.**

_e._ **Mail-In Request Code.** In order for a Request Card to be processed and deemed valid, it must include a unique Mail-In Request Code. To obtain a Mail-In Request Code, the Participant must be logged in to their Luckyzino Customer Account. Once logged in, the Participant must open the settings menu and select “My Account”. On the “My Account” screen, the Participant must select “Get Mail-In Request Code”. A unique code will then be generated within a reasonable amount of time. The Participant must write this code on the outer envelope and Request Card (as described above) in the exact format as displayed on the screen. **The purpose of the Mail-In Request Code is to assist Luckyzino with the efficient, effective, and timely processing of a Participant’s Request Card. A POSTAL REQUEST CARD MAY ONLY BE USED ONCE and may only be used by the Participant whose Luckyzino Customer Account was used to generate the Mail-In Request Code. Any person suspected by Luckyzino to have either directly or indirectly provided a Mail-In Request Code to another Participant may, in Luckyzino’s sole discretion, be disqualified from the Sweepstakes and may risk suspension or termination of their Luckyzino Customer Account. MAIL-IN REQUEST CODES ARE VALID FOR THIRTY (30) DAYS AFTER THEY ARE GENERATED.**

_f._ There is a limit of one request per outer envelope. For each Request Card a Participant submits in accordance with the above requirements, the Participant will receive three (3) SCs. The SCs will be added to the Participant's Customer Account within a reasonable amount of time after being received by Luckyzino in the mail and verified.

_g._ A Participant must ensure that their handwriting is legible. If the Participant’s handwriting is not legible, as determined in Luckyzino’s sole discretion, the request will be void and the SCs will not be added to the Participant’s Customer Account. Additionally, all required information must be written in one color of ink (black ink is recommended). The use of multiple colors will result in disqualification of the Request Card. Failure to comply with any of the requirements set out in this Section will result in disqualification of that particular Request Card.

_h._ **THE REQUEST MUST BE MADE ONLY BY THE PARTICIPANT AND MUST BE POSTED FROM THE SAME STATE OR PROVINCE AS THE PARTICIPANT’S VERIFIED RESIDENTIAL ADDRESS**. **Requests made by any other individual or any entity (including but not limited to commercial sweepstakes subscription notification and/or entering services) or posted from a state or province different to the Participant’s verified residential address will be declared invalid and SCs will not be added to the Participant’s Customer Account. The name written on the Request Card must match the name associated with the Luckyzino Customer Account in question.** If the name provided to Luckyzino upon registration of the Customer Account is different from the name on the Request Card, the Request Card will be deemed invalid.

_i._ Tampering with the entry process or the operation of the Sweepstakes, including but not limited to the use of any device or software to automate the SCs request/entry process or to unfairly assist the Participant with meeting the handwritten requirement, is prohibited and any Request Cards deemed by Luckyzino, in its sole discretion, to have been submitted in this manner will be void. Any Participant caught tampering with the AMOE Request Card process, outsourcing the drafting of Request Cards, or manipulating Request Card entries will result in disqualification of their Request Cards and Luckyzino Customer Account suspension. Where there is an issue or fault with an envelope used by a Participant to request free SCs, such that it does, or is reasonably likely to, cause damage to, or otherwise adversely affect, equipment used or procedures implemented to process mailed in requests (for example, handmade envelopes that are not suitable for machine processing due to poor quality or non-standard adhesive or paper), such entry will be void. 

_j._ In the event a dispute regarding the identity of the individual who actually submitted a request or whether a request satisfies the requirements set out above cannot be resolved to Luckyzino’s satisfaction, the affected request/entry will be deemed ineligible.

_k._ Luckyzino is not responsible for lost, late, incomplete, invalid, unintelligible or misdirected SCs requests or allocations.

_l._ Luckyzino reserves the right to add other methods or alter the above methods of obtaining SCs from time to time. Luckyzino will allow for a grace period for those Request Cards already in the mail but not received by Luckyzino before any update to these Sweepstakes Rules. If it is determined that the Participant has tampered with the initial date written on the Request Card or with the postage date, the Request Card will be disqualified. All Request Cards received during the grace period will be reviewed in conformance with the Sweepstakes Rules that had been in effect at the time the Mail-In Request Code was issued. Request Cards received after the grace period expires will be reviewed in accordance with the updated Sweepstakes Rules.

_m._ Please note the following rules regarding AMOE Request Card submissions, which if not followed, could result in the suspension or blocking of your Luckyzino Customer Account:

> _i._ Information regarding the status of pending Request Cards will not be available until the review, approval, and crediting of Request Cards is complete;

> _ii._ Luckyzino will be unable to provide updates on the status of Request Cards until the review period is complete;

> _iii._ All qualifying and approved Request Cards will be credited to the Luckyzino Customer Accounts which meet the AMOE Request Card requirements described in these Sweepstakes Rules;

> _iv._ Luckyzino is only able to comment and advise on approved and credited Request Cards and is unable to provide information on non-qualifying and disqualified Request Cards;

> _v._ Luckyzino will only be able to advise on questions related to Request Card format if the Participant provides a picture or copy of their Request Card. No template Request Card will be provided;

> _vi._ Disqualified Request Cards will not be reconsidered, all decisions related to Request Card approval are final and no reconsiderations will be allowed;

> _vii._ Any missing Request Cards or Request Cards that do not reach Luckyzino will not qualify for approval.

_n._ A Participants’ SCs balance can be viewed in any gameplay mode. SCs can only be used to play Games in Promotional Play. The amount of SCs to be allocated to Participants can be changed at any time by Luckyzino in its sole discretion.

_o._ A Participant will be able to see both their total, un-played, and redeemable SCs balance by clicking their SC wallet while on the Platform. Only SCs earned while Participating in Promotional Play may be redeemed for prizes.

_p._ Use of any automated or other system(s) to participate, to acquire SCs, or win prizes is strictly prohibited and will result in disqualification from playing Games on the Platform. Utilizing methods such as utilizing multiple accounts and identities and other collusive methods are not permitted and may result in account closure and forfeiture of SCs, at our sole discretion. To opt-out of the Sweepstakes, a Participant can simply play Games on the Platform with Gold Coins (Standard Play) and not play in Promotional Play.

_q._ SCs are only valid for sixty (60) days from the date of a Participant’s last gameplay involving SCs on their Luckyzino Customer Account. If a Participant does not engage in any gameplay using SCs for sixty (60) consecutive days, all accrued SCs shall automatically expire.

_r._ In the event of a dispute as to any registration of a Customer Account, the authorized account holder of the email address used to register the Customer Account will be deemed to be the participating Account. The “authorized account holder” is the natural person assigned the email address by an internet access provider, online service provider or other organization responsible for assigning email addresses for the domain associated with the submitted address.

_s._ SCs may be forfeited if a Participant’s Customer Account is deactivated, closed or terminated for any reason, or otherwise at Luckyzino’s sole discretion.

_4._ **USING SWEEPS COINS TO PLAY GAMES** 

_a._ Participants with SCs can use those SCs to play Games on the Platform for a chance to win additional SCs. SCs won through gameplay can be redeemed for real prizes. Only Games played with SCs provide the opportunity to win additional SCs that may be redeemed for real prizes subject to these Sweepstakes Rules. 

_b._ Unless Luckyzino requires otherwise, any SCs must be played a minimum of one (1) time to be eligible for redemption. Luckyzino may, in its sole discretion, require that any SCs allocated to a Participant must be played a greater number of times before they are eligible to be redeemed for prizes. All SCs won while playing Games in Promotional Play will be added to the Participant’s redeemable SCs balance.

_c._ In the event that a Participant uses SCs in Promotional Play but their unplayed SCs balance is insufficient to cover the minimum amount required for play, the additional SCs needed to reach the minimum will be withdrawn from the Participant’s redeemable SCs balance. In the event that there is a technical issue with this spin, the spin will be voided and the SCs that are used for the spin will be returned to the Participant in their unplayed SCs balance.

_d._ Once a Participant accumulates the minimum number of redeemable SCs as determined by the Platform from time to time, they will be able to submit a redemption request. To submit a redemption request, a Participant must select the side bar in the top right corner of the page, click the “Manage account” button and then click the “REDEEM” button. When a Participant clicks “REDEEM”, a drop-down menu will appear where they can select to request SCs redemption. A number of verified payment options will appear for the Participant to select how they would like to receive their redemption in the event it is approved by Luckyzino.

_e._ FOR PURPOSES OF REDEMPTION ONLY. One (1) SC that has been won through gameplay (rather than collected using one of the methods described in Section 3 of these Sweepstakes Rules) can be redeemed for a prize with value being equivalent to $1 USD. SCs possess no real monetary value and may only be used to request a prize redemption to be approved and processed by Luckyzino. There is no guarantee that a redemption request will be granted. Approval is subject to the Participant completing all verifications to confirm eligibility and adherence to all Sweepstakes Rules and [Terms and Conditions](/terms-and-conditions) of the Platform. Approval of redemption requests is at the sole discretion of Luckyzino.

_f._ Luckyzino reserves the right to change the prize win rates and odds of any Game, including in Standard Play for Gold Coins and Promotional Play. It is a Participant’s responsibility to check the prize win rate on each occasion before they participate.

_g._ If Luckyzino believes that a Participant has abused or attempted to abuse SCs, Luckyzino may, at its sole discretion, deny, withhold, or withdraw any SCs from the Participant, or rescind any policy either temporarily or permanently, or terminate the Participant’s access to the website/Platform and/or block their Customer Account. Luckyzino shall be under no obligation to refund any SCs or funds that may be in the Participant’s account.

_5._ **VERIFICATION AND CONFIRMATION OF POTENTIAL WINNERS AND NOTIFICATION OF WINNING**

_a._ Potential Sweepstakes winners are subject to verification by Luckyzino (in any manner we may choose) and the decisions of Luckyzino are final and binding in all matters related to the Sweepstakes. A Participant is not a winner of any prize, even if the online screen indicates they are, unless and until the Participant’s eligibility and the potential winning play has been verified and the Participant has fully complied with these Sweepstakes Rules and been notified that verification is complete. Luckyzino will not accept screenshots or other purported evidence of winning in lieu of its validation process. Any determination as to what is considered evidence of winning shall be made at Luckyzino’s sole discretion. 

_b._ Participants may be required to successfully complete a Know-Your-Customer (“KYC”) verification to validate eligibility to participate before redeeming any prize. This may include, but is not limited to, providing a copy of their government-issued identification and additional required verification to confirm eligibility.

_c._ Potential prize winners must comply with these Sweepstakes Rules, and winning is contingent upon fulfilling all requirements.

_d._ A potential prize winner may be required to sign and return to Luckyzino, an affidavit/declaration of eligibility, and liability/publicity release (except where prohibited) in order to claim their prize (if applicable). 

_e._ If a potential winner cannot be contacted, fails to comply with this Section 5 within the required time period, or fails to comply with these Sweepstakes Rules, or if the prize or prize notification is returned as undeliverable, that potential winner forfeits the prize.

_f._ In the event that a potential winner of a Sweepstakes prize is disqualified for any reason, Luckyzino may, in its sole discretion, put the prize back into the Sweepstakes.

_6._ **PRIZES AND REDEMPTION OF PRIZES**

_a._ A Participant’s SCs balance is shown in the Customer Account.

_b._ A Participant must successfully complete the Know-Your-Customer verification process provided by Luckyzino to confirm eligibility before redeeming any prize. 

_c._ Prizes may only be obtained by redeeming redeemable SCs earned while playing Games in Promotional Play. 

_d._ Prizes are not awarded until redeemed. A Participant has no rights to SCs that have not been redeemed.

_e._ Where a Participant has chosen to redeem prizes for cash, the payment will be made in USD to the financial account or online wallet from which the Participant purchased Gold Coins, or if this is not technically possible, then to an alternative bank account the Participant nominates. We reserve the right to require the use of the same payment method for redemption of prizes as was used to purchase Gold Coins, or a specific payment method at our discretion.

_f._ Where a Participant has chosen to redeem prizes for gift cards, the gift cards will be allocated to the email address that the Participant has registered against their Customer Account.

_g._ Sponsor/Promoter will only process a prize redemption if the redeemed value of the prize meets or exceeds the minimum redemption threshold established by the Platform from time to time.

_h._ To be eligible to receive a prize:

> i. A Participant must meet the eligibility criteria in accordance with Section 2 of these Sweepstakes Rules; and

> ii. The Participant’s details must match those of their Customer Account.

_i._ Luckyzino has the right to involve its affiliated companies and/or other third-party service providers for the purpose of processing the redemption of prizes in connection with the Sweepstakes. By participating in the Sweepstakes, Participants acknowledge and agree that Luckyzino may share necessary information, including but not limited to, the Participant’s details and redemption choices, with such affiliated companies and/or other third-party service providers for the sole purpose of facilitating prize redemption.

_j._ For security reasons and for the prevention of money laundering, Luckyzino will only authorize the redemption of prizes to a bank or bank account held in the Participant’s name. If the Participant provides account details which relate to a bank account held jointly between the Participant and another person, the Participant acknowledges and accepts that any prizes will be paid into that joint account, and the Participant may be required to supply additional documentation relating to the person who jointly holds the bank account with the Participant so that Luckyzino may identify and verify the joint account holder. Luckyzino reserves the right to require the use of the same payment method for redemption of Prizes as was used to purchase Gold Coins, or a specific payment method at Luckyzino’s discretion.

_k._ Luckyzino is not responsible for any taxes or fees associated with a winning prize. Participants are responsible for all applicable taxes and fees associated with prize receipt and/or redemption. A Participant’s total annual prize redemptions will be made available upon request.

_l._ Luckyzino may limit the frequency of redemption requests at its sole discretion in accordance with its internal risk management and compliance procedures. Redemption requests are subject to review and approval. Reviews are conducted Monday-Friday during business hours (8am-5pm EST). Any redemption request received on a Saturday, Sunday, or holiday will be reviewed on a business day within a reasonable amount of time. Redemption requests will be processed in the order that they are approved, not in the order they are received. Processing times may vary depending on verification requirements, payment method, and risk assessment. You acknowledge and agree that processing redemption requests may take longer due to our identity-verification, security, and fraud-prevention checks. We make our best efforts to process requests within the quoted timeframes but do not guarantee processing times for prizes. 

_m._ Luckyzino is not responsible for any foreign exchange transaction fees, charges or related costs that may be incurred as a result of, or in relation to, a prize redemption, including but not limited to any losses or additional costs arising from foreign exchange fluctuations.

_n._ SCs are not transferable, and no substitution will be made except as provided herein at Luckyzino’s sole discretion. Luckyzino reserves the right to substitute the listed prize of equal or greater value for any reason owing to circumstances outside Luckyzino’s reasonable control. SCs are not to be offered for sale, substitution, or transfer in any manner. SCs may only be used for playing Games in Promotional Play.

_o._ Prize winners will be notified in accordance with Section 5 of these Sweepstakes Rules.

_p._ In New York (if not excluded) and Florida, the maximum redemption value of a SCs prize won on any one spin or play, via a Participant’s participation in the Sweepstakes is US$5,000. Any prize valued in excess of US$5,000 will be reduced to a maximum value of US$5,000.

_q._ Luckyzino reserves the right to limit total daily redemptions to any amount over any time that Luckyzino considers necessary, including to satisfy its regulatory obligations or the requirements of its partners and suppliers. No more than the stated number of prizes will be awarded.

_r._ It is the Participant’s responsibility to:

> i. Ensure that their bank information is accurate, complete, correct and up-to-date and that their bank will accept and process payments from us; and

> ii. Ensure that all information provided, such as your legal name, address, age, and contact information is accurate and complete.

_s._ Luckyzino will not be responsible or liable for any issues arising if the Participant’s chosen financial institution or bank declines payment. Luckyzino is not responsible for any inaccurate information provided by the Participant.

_t._ If a Participant’s total redemption value exceeds $600 USD, the Participant will need to provide a social security number prior to the redemption for tax purposes.

_u._ If any identification, credit or other verification check required by Luckyzino cannot be successfully completed to its satisfaction because a Participant has not provided the requested document(s) in the required form within ten (10) days from the date the document was first requested, the redemption request will be disqualified and deemed null and void. In addition, Luckyzino shall be under no obligation to continue the verification process and may, in its sole discretion, deactivate Customer Account.

_v._ The Participant acknowledges that there may be delays in the redemption process due to Luckyzino’s identity verification process. Additionally, certain payment methods may require further verification at the time of redemption.

_7._ **ENTRY CONDITIONS AND RELEASE**

_a._ By Participating, each Participant agrees to:

> i. Comply with and be bound by:

>> _1._ the [Terms and Conditions](/terms-and-conditions);

>> _2._ these Sweepstakes Rules; and

>> _3._ the decisions of Luckyzino which are binding and final.

> ii. Release and hold harmless Luckyzino and its parent, subsidiary, and affiliated companies, the prize suppliers and any other organizations responsible for sponsoring, fulfilling, administering, advertising, or promoting the Sweepstakes, and all of their respective past and present officers, directors, employees, agents and representatives (collectively “the **Released Parties**”) from and against any and all claims, expenses, and liability, including but not limited to negligence and damages of any kind to persons and property, including but not limited to invasion of privacy (under appropriation, intrusion, public disclosure of private facts, false light in the public eye or other legal theory), defamation, slander, libel, violation of publicity, infringement of trademark, copyright or other intellectual property rights, property damage, or death or personal injury arising out of or relating to a Participant’s entry, creation of an entry or submission of an entry, participation in the Sweepstakes, acceptance or use or misuse of prizes (including travel or activity related thereto) and/or broadcast, exploitation or use of entry; and

> iii. Indemnify, defend, and hold harmless the Released Parties from and against any and all claims, expenses, and liabilities (including reasonable attorneys/legal fees) arising out of or relating to a Participant’s participation in the Sweepstakes and/or Participant’s acceptance, use or misuse of prizes.

_8._ **LIMITATION OF LIABILITY**

_a._ Insofar as permitted by law in the respective states, the Released Parties (as defined above) assume no responsibility for:

> i. Any incorrect or inaccurate entry information, whether caused by a Participant, printing error, or for any faulty or failed electronic data transmissions;

> ii. Any unauthorized access to, or theft, destruction, or alteration of entries at any point in the operation of Games played in Promotional Play;

> iii. Any technical malfunction, failure, error, omission, interruption, deletion, defect, delay in operation or communication line failure, regardless of cause, with regard to any equipment, systems, networks, lines, satellites, servers, camera, computers or providers utilized in any respect of the operation of the Sweepstakes;

> iv. Unauthorized human intervention in any part of the entry process or the Sweepstakes;

> v. Inaccessibility or unavailability of any network or wireless service, the Internet or website or any combination thereof;

> vi. Suspended or discontinued internet, wireless, or landline phone services; or

> vii. Any injury or damage to Participant’s or to any other person's computer or mobile device which may be related to or resulting from any attempt to participate in Games played or download any materials related to Luckyzino.

_b._ Luckyzino reserves the right at its sole discretion to cancel, terminate, modify, or suspend the Sweepstakes in whole or in part. In such an event, Luckyzino shall immediately suspend all drawings and prize awards, and Luckyzino reserves the right to award any remaining prizes in a manner deemed fair and equitable by Luckyzino. Luckyzino and Released Parties shall not have any further liability to any Participant in connection with the Sweepstakes.

_c._ If for any reason a Participant’s SCs are confirmed to have been erroneously deleted, lost, or otherwise destroyed or corrupted, Participant’s sole remedy shall be the replacement of an equivalent amount of SCs by Luckyzino.

_9._ **PUBLICITY AND SUBMISSIONS**

_a._ Except where prohibited by law, participation in the Sweepstakes constitutes each Participant’s consent to Luckyzino’s and its agents’ / service providers’ / business partners’ use of Participant’s name, likeness, photograph, image, voice, opinions and/or hometown and state/territory for promotional purposes in any media, worldwide, without further payment, notice or consideration.

_b._ A submission to Luckyzino or a post to any of its social media pages constitutes Participant’s consent to give Luckyzino a royalty-free, irrevocable, perpetual, non-exclusive license to use such submission or post on a worldwide basis, and to incorporate it into other works, in any form, media or technology not known or later developed, including for promotional or marketing purposes. If requested, Participant will sign any documentation that may be required for Luckyzino or its designees to make use of the non-exclusive rights Participant is granting to use the submission or post.

_10._ **GENERAL CONDITIONS**

_a._ Luckyzino reserves the right to cancel, suspend and/or modify the Sweepstakes or rules while playing Games in Promotional Play or these Sweepstakes Rules, or any part thereof, with immediate effect owing to circumstances outside its reasonable control and only where circumstances it made unavoidable if any fraud, technical failures or any other factor beyond Luckyzino’s reasonable control impairs the integrity or proper functioning of the Sweepstakes, as determined by Luckyzino in its sole discretion.

_b._ Luckyzino reserves the right in its sole discretion to disqualify any individual it finds to be tampering with the entry process or the operation of the Sweepstakes or to be acting in violation of these Sweepstakes Rules or any other promotion or in an unsportsmanlike or disruptive manner. Such Participant’s SCs will be deemed invalid.

_c._ Any attempt by any person to deliberately undermine the legitimate operation of the Sweepstakes may be in violation of criminal and civil law and, should such an attempt be made, Luckyzino reserves the right to terminate such individual's use of the services and seek damages from any such person to the fullest extent permitted by law. Luckyzino’s failure to enforce any term of these Sweepstakes Rules shall not constitute a waiver of that provision. Such Participant’s SCs will be deemed invalid.

_d._ In all other cases, Luckyzino reserves the right to cancel, suspend and/or modify the Sweepstakes. Any notice regarding cancellation, suspension and/or modification will be posted on Luckyzino website (to the extent practicable).

_e._ In the event of modifying the Sweepstakes or these Sweepstakes Rules, a Participant’s continued enrolment and/or participation in the Sweepstakes constitutes acceptance of the modified terms. If the Participant does not agree to the amended Sweepstakes Rules, they may not participate in any Promotional Play Games.

_11._ **GOVERNING LAWS AND DISPUTES**

_a._ Clause 23 of the [Terms and Conditions](/terms-and-conditions) (Dispute Resolution and Agreement to Arbitrate on an Individual Basis) is incorporated herein by reference with the same force and effect as though fully set forth herein. By agreeing to these Sweepstakes Rules, the Participant agrees to be bound by the dispute resolution and arbitration provisions contained in clause 23 of the [Terms and Conditions](/terms-and-conditions). 

_b._ If the Participant has any complaints about the Sweepstakes, they must contact Customer Support within fourteen (14) days of any incident or issue. Luckyzino will use all reasonable efforts to resolve the reported matter promptly.

_c._ All issues and questions concerning the construction, validity, interpretation and enforceability of these Sweepstakes Rules, or the rights and obligations of the Participant and Luckyzino in connection with the Sweepstakes, are governed by, and construed in accordance with, the laws of the State of Delaware, without giving effect to any choice of law or conflict of law rules (whether of the State of Delaware or any other jurisdiction), which would cause the application of the laws of any jurisdiction other than the State of Delaware.

_12._ **OTHER**

_a._ Under no circumstances will any Participant be permitted to obtain awards for, and Participant hereby waives all rights to claim, punitive, incidental or consequential damages, or any other damages, including attorneys’ fees, other than Participant’s actual out-of-pocket expenses (i.e., costs associated with participating in this Sweepstakes), and Participant further waives all rights to have damages multiplied or increased. SOME JURISDICTIONS DO NOT ALLOW THE LIMITATIONS OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE MAY NOT APPLY TO YOU.

_b._ Any Participant posting or seen to be posting comments on Sponsor’s/Promoter’s Facebook page or elsewhere during the promotion that are considered bullying, spiteful or upsetting to other Participants, players and fans of Luckyzino or directly aimed at the Sponsor/Promoter, will have their comments removed and will be disqualified from the Sweepstakes. The Sponsor/Promoter reserves the right to alert Facebook to any such behaviour and Participant may have his/her Facebook account frozen pending investigation.

_13._ **PARTICIPANT'S PERSONAL INFORMATION:**

Information collected from Participants is subject to Luckyzino’s [Privacy Policy](/privacy-policy).

_14._ **QUESTIONS:**

If you have questions, you may contact Luckyzino at [support@luckyzino.com](mailto:support@luckyzino.com).
`;

export default function SweepstakesRules() {
	return (
		<div className="text-white bg-[#00000070] font-['Exo_2'] h-full w-full">
			<div className="max-w-[1050px] w-full h-full m-auto p-8 overflow-y-scroll no-scrollbar md-wraper">
				<Markdown remarkPlugins={[remarkGfm, heading]}>{data}</Markdown>
			</div>
		</div>
	);
}