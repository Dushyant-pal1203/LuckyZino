import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import heading from 'remark-heading-id';
import '../../markdown.css';
// TODO: Replace with data from DB
const data = `
**COOKIE POLICY** 

Version: 1.0

Date: 2 June 2025

This Cookie Policy is part of our [Privacy Policy](/privacy-policy). It explains how Luckyzino (“**Luckyzino**”, “**we**”, “**us**”, or “**our**”) and our partners use cookies and similar technologies on our Website. For more information about us, and how we process Personal Information, please see our Privacy Policy.

_1._ **WHAT ARE COOKIES**  
   

A cookie is a small text file sent from a website to your computer or mobile device, where it is stored by your browser. They are used to enhance your experience by making websites work more efficiently. Cookies may store information such as your IP address (or other device identifier), browser type, and details about the pages you view and interact with on our Website. By storing such information, cookies make your experience more convenient (e.g., by remembering your user preferences). Cookies cannot read data from your hard drive or any other files on your device. Cookies may be either first party cookies set directly by us to your device, or third-party cookies set by a third-party provider, on our behalf. Third-party cookies may inform third-party organisations about your visit to our Website, which may be used by those organisations to deliver targeted messages and advertising to you. When you first access our Website, you will be given the option to enable or disable cookies through our cookie banner. You can revisit your choice at any time via your browser settings or cookie preference tools. Most browsers allow you to block and delete cookies. Please note that disabling cookies may impact your experience and certain features of the Website or Services may not function properly.

_2._ **CATEGORIES OF COOKIES WE COLLECT**

When we use cookies on our Website, we may classify them into any one of the categories below. More detailed information about each service or cookie is described in the cookie banner shown on the Website.

_\\-_  **Strictly necessary (essential) cookies.** These cookies are necessary for the Website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser or device settings to block or alert you about these cookies, but some parts of our Website may no longer function properly.  
_\\-_ **Functional and performance cookies.** These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our Website. They help us to know which pages are the most and least popular, and see how visitors move around the Website. All information collected by these cookies is aggregated and thus anonymous. These cookies also enable the Website to provide enhanced functionality. 

_\\-_ **Marketing (targeting) cookies.** These cookies may be set through our Website by our advertising partners. They may be used by those companies to show you relevant advertisements on other sites. They do not store directly personal information but are based on uniquely identifying your browser and device. If you do not allow these cookies, you will experience less targeted advertising. They include:  
> * > Facebook (Meta) Pixel – this is a tracking technology offered by Meta and used by other Meta services. It is used to track interactions of visitors with websites after they have clicked on an ad placed on Facebook or other services provided by Meta. The maximum age of cookie storage is 1 year.  
> * > Facebook Social Plugins – this is a social plug-in from Meta, which allows the user to connect the website with the social network. The data will be deleted as soon as they are no longer needed for the processing purposes.

_3._ **OTHER TECHNOLOGIES WE USE**

Luckyzino and our partners may also use industry standard identifiers collected via other technologies to provide an enhanced experience. These technologies allow us to record certain pieces of information whenever you visit or interact with the Website. Information may include browser type, operating system, device type, an estimate of your geographic location associated with your IP address, the page served, the time, referring URLs and other information normally transmitted in HTTP requests. Usage information is generally non-identifying but if we associate it with you as a specific and identifiable person, we will treat it as Personal Information. Some examples of these technologies are:

_\\-_ **APIs.** APIs work by allowing different types of software to communicate with each other. APIs make it easier for developers to integrate features and improve your overall experience.  
_\\-_ **Event tagging.** Event tagging (such as Facebook App Events) may allow us to track actions that occur on the Website such as installs and purchase events. By tracking these events we can view analytics, measure ad performance, and build audiences for ad targeting.  
_\\-_ **Pixel tags/web beacons.** A pixel tag (also known as a web beacon) is a piece of code embedded on the Website that collects information about your engagement on that web page. The use of a pixel allows us to record, for example, that a user has visited a particular web page or clicked on a particular advertisement. We may also include web beacons in e-mails to understand whether messages have been opened, acted on or forwarded.  
_\\-_ **Local storage.** Local storage stores data on your device for an extended period. For example, we might store your cookie preference there, so the Website remembers your settings.  
_\\-_ **Scripts.** Scripts run in your browser and may set cookies or dynamically load content.   
_\\-_ **Mobile device identifiers.** For mobile apps, we may collect industry-standard identifiers such as Apple’s IDFA (Identifier for Advertisers) or Google’s GAID (Google Advertising ID). These identifiers allow us to provide personalized advertising and measure campaign effectiveness. You can opt out via your device settings. For instructions for using the advertising choice mechanisms provided by the most popular mobile operating systems, visit the NAI’s Mobile Choices page [here](https://thenai.org/opt-out/mobile-opt-out/).

_4._ **WHO WE SHARE YOUR COOKIE INFORMATION WITH**

We may share your personal information with third parties like advertising partners, third party ad servers, technology vendors, providers of sponsored content, research and analytics companies and our group of companies to improve our Website’s performance and help us to provide more relevant advertising and product recommendations on our Website or Services for you, as our customers. We may also use social networking and other third-party platforms (such as Meta or Google) to deliver tailored advertisements to you on third-party websites and applications, and to measure how our users interact with those advertisements. 

Under some privacy laws, sharing data for targeted advertising may be considered a “sale” of personal information. You may have the right to opt out of this sharing (sale). For more details, please refer to our Privacy Policy. 

_5._ **MANAGING COOKIES**

You can control and manage cookies in various ways. For any cookies that are not strictly necessary, we will ask you to consent to our use of cookies when you first visit our Website. You do not have to accept all of the cookies used by our Website. Please keep in mind that if you reject cookies, you may still use our Website, but your ability to use some areas of our Website or Services may be limited. You may also be able to change your browser settings to manage and control cookies. Your browser or device may be configured to allow you to refuse or delete cookies or to be notified when a cookie is stored on your device. Please note that disabling cookies may affect the functionality and performance of the Website. For more information, visit [aboutcookies.org](https://aboutcookies.org/). For instructions on how to manage and delete cookies in your browser, please see [here](https://www.aboutcookies.org/how-to-manage-and-delete-cookies). 

_6._ **UPDATES TO THIS COOKIE POLICY**

We may update this Cookie Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. Any changes to this Cookie Policy will become effective when the updated version is posted on our Website, unless otherwise specified. We advise you to periodically review this Cookie Policy to be informed about how we use cookies. This Cookie Policy, in effect as of the last modified date stated below, supersedes and replaces any and all Cookie Policies previously in effect.

_7._ **CONTACT INFORMATION**

If you have questions about this Cookie Policy, please contact us at [support@luckyzino.com](mailto:support@luckyzino.com).  
`
export default function CookiePolicy() {
	return (
		<div className="text-white bg-[#00000070] font-['Exo_2'] h-full w-full">
			<div className="max-w-[1050px] w-full h-full m-auto p-8 overflow-y-scroll no-scrollbar md-wraper">
				<Markdown remarkPlugins={[remarkGfm, heading]}>{data}</Markdown>
			</div>
		</div>
	);
}
