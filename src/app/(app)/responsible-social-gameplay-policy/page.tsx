import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import heading from 'remark-heading-id';
import '../../markdown.css';
// TODO: Replace with data from DB
const data = `
**RESPONSIBLE SOCIAL GAMEPLAY POLICY**

Version: 1.3

Date: 2 December 2025

At Luckyzino, we are committed to protecting our players and promoting responsible social gameplay as a fundamental part of our player care and social responsibility program.

We believe it is our shared responsibility with you, our players, to ensure that you enjoy your experience on our Platform while remaining aware of the potential risks that can be associated with online gameplay if you don’t remain in control. We encourage you to use the responsible social gameplay tools described below, which are available at your disposal.

To help you enjoy fun and affordable play, we have implemented measures designed to assist players in managing their gameplay. Please note that we reserve the right to activate these measures unilaterally if, in our sole discretion, we deem it necessary.

## _1._ **INTRODUCTION**

_1.1._ We have developed this Responsible Social Gameplay Policy (the "**Policy**") to communicate our approach to responsible gameplay and to minimize potential harm to players who may be vulnerable to playing computer games.

_1.2._ This Policy outlines the tools, information, and support resources available to registered players on Luckyzino and forms part of the Luckyzino [Terms and Conditions](/terms-and-conditions). Defined terms in the [Terms and Conditions](/terms-and-conditions) have the same meaning in this Policy.

_1.3._ We may update this Policy from time to time. Any changes will be published on the Luckyzino Platform and will take immediate effect upon publication. If you do not agree to any amendments, you must cease using the Platform.

## _2._ ‍**LUCKYZINO RESPONSIBLE SOCIAL GAMEPLAY PROGRAM**

_2.1._ The Luckyzino Responsible Social Gameplay Program (the "**RSG Program**") is based on our guiding principles of providing players with control tools, information, and access to resources needed to make informed decisions about gameplay and to prevent problem gameplay from occurring on our Platform.

_2.2._ The RSG Program is designed to support players at any stage of their journey — from registration to redemption — and at any level of gameplay. It offers player education, control tools, and links to professional support resources when needed.

_2.3._ Luckyzino also understands that it is a shared responsibility to achieve a fun and affordable gameplay environment and that it is ultimately an individual’s choice to play. We do not provide counseling services, nor do we police player behavior. Our focus is on informing, educating, and empowering players to make responsible and informed decisions.

_2.4._ Luckyzino has well-trained staff available to assist players in relation to responsible gameplay. Our staff are encouraged and empowered to provide information and to offer control tools.

## _3._ **KEEPING TRACK OF YOUR PLAY**

Playing social games should be a fun and enjoyable pastime. To help you maintain control over your gameplay, we recommend the following practices:

_3.1._ Keep It Fun  
* >>> Play social games as a form of entertainment and in moderation.  
* >>> Avoid using gameplay as a means of escaping reality or coping with emotional distress.  
* >>> Ensure that gameplay does not interfere with your employment, relationships, health, or other commitments.

_3.2._ Spend Within Your Means  
* >>> Set a budget for your entertainment and stick to it.  
* >>> Only purchase Gold Coins if you can afford to do so. You can always claim Gold Coins to play for free.

_3.3._ Manage Your Time  
* >>> We’re happy you’ve chosen Luckyzino, and we hope that you can continue to enjoy playing, but don’t let social gaming take up too much of your time.   
* >>> Set time limits for your sessions.  
* >>> Treat gameplay as you would other forms of entertainment, such as attending a sporting event or movie.

_3.4._ Understand the Games  
* >>> Make sure you understand how each Game works before playing.  
* >>> Keep in mind that Game results are random.

_3.5._ Use Our Gameplay Management Tools  
* >>> If you need some time out, you can take a break. Details on how to access this tool are provided below.

## _4._ **ACCESS CONTROL TOOLS**

The access control tools described below are available if you feel that your gameplay may have become, or is at risk of becoming, problematic. 

_4.1._ **Take a Break**

The Take a Break option allows you to take a short break from gameplay. To use this tool, please contact Customer Support.

* >>> Available break periods are 24 hours, 48 hours, 72 hours.

_4.2._ **Permanent Closure**

If you wish to permanently close your account, please contact Customer Support.

* >>> To request a permanent closure, you must send a written email to Customer Support and state the reason for the closure. Account closure requests will be processed in accordance with the [Terms and Conditions](/terms-and-conditions). 
* >>> You will be required to provide a “confirmation of understanding” acknowledging that you understand the consequences of permanently closing your account.

## _5._ **SELF-ASSESSMENT**

If you believe that your gameplay — or someone else's — may be becoming problematic, it may be helpful to consider the self-assessment questions available [here](https://www.mind-diagnostics.org/video_game_addiction-test). We encourage you to use this tool as part of maintaining a healthy and enjoyable social gaming experience.

## _6._ **SUPPORT ORGANIZATIONS**

If you believe that your gameplay may have had — or is at risk of having — a negative impact on your mental health, finances, or relationships with friends or family, we encourage you to seek assistance from the following independent help and support organizations / groups:

Some well-known and easily accessible online support organizations / groups for video game addictions include:

* >>> [Gaming Addicts Anonymous (GAA)](https://www.gamingaddictsanonymous.org/)**:** A fellowship of individuals who support each other in recovering from problems related to excessive game playing.  
* >>> [On-Line Gamers Anonymous (OLGA)](https://www.olganon.org/home).  
* >>> [Game Quitters](https://gamequitters.com).

**Please note:** These organizations are independent support services and are not affiliated with Luckyzino. They do **NOT** provide customer support or dispute resolution services. Should you wish to discuss any matter or complaint related to your account, please contact us directly by reaching out to our Customer Support team.

## _7._ **PLAYER PROTECTION POLICY**

_7.1._ Protection of the vulnerable  
* >>> Make sure that the decision to play on our Platform is your own personal choice and responsibility.  
* >>> We do not recommend playing on our Platform if you:  
>>> a. are currently being treated for, or are in recovery from, an addiction or dependency  
>>> b. are under the influence of alcohol or any other substance  
>>> c. are currently experiencing financial difficulty or have recently faced a traumatic life event  
>>> d. do not understand how to play the Games  
>>> e. are experiencing mental health concerns, cognitive impairment, or have sustained a brain injury.

_7.2._ Protection of Minors  
* >>> You must be eighteen (18) years of age or such higher minimum legal age of majority as stipulated in the jurisdiction of your residence to play any of the Games offered on our Platform.  
* >>> If you share your mobile phone, tablet, laptop, or computer with friends or family who are under the age to participate in online social gameplay, we recommend that you restrict their access to our Platform by using services such as [Netnanny.com](https://www.netnanny.com/).  
* >>> We encourage all players to take appropriate measures to prevent unauthorized access to accounts by individuals under the age of eighteen (18).

## _8._ **CONTACTING US**

If you have any questions, please contact us at [support@luckyzino.com](mailto:support@luckyzino.com). 
`;

export default function ResponsibleGameplayPolicy() {
	return (
		<div className="text-white bg-[#00000070] font-['Exo_2'] h-full w-full">
			<div className="max-w-[1050px] w-full h-full m-auto p-8 overflow-y-scroll no-scrollbar md-wraper">
				<Markdown remarkPlugins={[remarkGfm, heading]}>{data}</Markdown>
			</div>
		</div>
	);
}