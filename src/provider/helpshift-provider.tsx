'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Spinner from '@/components/ui/spinner';
import { request } from '@/services/request-handler';
import { HelpshiftUserInfo } from '@/types/helpshift';
import { format } from "date-fns";

const restrictedRoutes = [
  '/game',
  '/compliance/deposit',
  '/compliance/withdrawal',
  '/withdrawal',
  '/vip-chat',
  '/otp'
];

let querySent = false;
const HelpShiftProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [hsQuery, setHsQuery] = useState<object | null>(null);
  const [hsScriptLoaded, setHSScriptLoaded] = useState(true);
  const { data: session, status } = useSession();

  const init = () => {
    try {
      (window as any).helpshiftWidgetConfig = {
        platformId: process.env.NEXT_PUBLIC_HELPSHIFT_PLATFORM_ID,
        domain: process.env.NEXT_PUBLIC_HELPSHIFT_DOMAIN,
        appId: process.env.NEXT_PUBLIC_HELPSHIFT_APP_ID,
        widgetType: 'helpcenter_and_webchat',
        language: 'en'
      };
      (window as any).HelpshiftWidget('init');
      (window as any).helpShiftInited = true;
    } catch (e) {
      console.log(e);
    }
  };

  const destroy = () => {
    const widget = document.getElementById(
      'hs-widget-wrapper'
    ) as HTMLIFrameElement;
    widget?.remove();
    (window as any).helpShiftInited = false;
    querySent = false;
    setHsQuery(null);
  };

  useEffect(() => {
    if (restrictedRoutes.includes(pathname)) {
      destroy();
      return;
    }
    init();
  }, [pathname]);

  const setUserForSupport = (user?: HelpshiftUserInfo) => {
    if (!session) {
      return;
    }
    const helpshiftUserMeta = {
      userId: user?.userId ?? session.user.id ?? 'Undefined',
      email: user?.email ?? session.user.email ?? 'Undefined',
      firstName: user?.firstName ?? session.user.socialProfile?.firstName ?? 'Undefined',
      lastName: user?.lastName ?? session.user.socialProfile?.lastName ?? 'Undefined',
      state: user?.state ?? 'Undefined',
      createdAt: user?.createdAt ? format(new Date(user?.createdAt), "yyyy-MM-dd HH:mm:ss a") : 'Undefined',
      totalRedeemed: user?.totalRedeemed ?? 0,
      totalPayed: user?.totalPayed ?? 0
    };

    (window as any).helpshiftWidgetConfig.userId = helpshiftUserMeta.userId;
    (window as any).helpshiftWidgetConfig.userEmail = helpshiftUserMeta.email;
    (window as any).helpshiftWidgetConfig.userName = `${helpshiftUserMeta.firstName} ${helpshiftUserMeta.lastName}`;
    (window as any).helpshiftWidgetConfig.cifs = { // cifs - Custom Issue Fields
      created_at: {
        type: "singleline",
        value: helpshiftUserMeta.createdAt,
      },
      state: {
        type: "singleline",
        value: helpshiftUserMeta.state,
      },
      total_payed: {
        type: "number",
        value: helpshiftUserMeta.totalPayed,
      },
      total_redeemed: {
        type: "number",
        value: helpshiftUserMeta.totalRedeemed,
      }
    };
  };

  const clearUserForSupport = () => {
    (window as any).helpshiftWidgetConfig.userId = undefined;
    (window as any).helpshiftWidgetConfig.userEmail = undefined;
    (window as any).helpshiftWidgetConfig.userName = undefined;
    (window as any).helpshiftWidgetConfig.cifs = undefined;
  };

  const visibilityChange = (evt: { visible: boolean }) => {
    if (evt.visible || !restrictedRoutes.includes(pathname)) return;
    destroy();
  };

  const updateHSConfig = async () => {
    if ((window as any).HelpshiftWidget && (window as any).helpShiftInited) {
      if (
        status === 'authenticated' &&
        session?.user?.id &&
        !(window as any).helpshiftWidgetConfig.userName // meta info not present in config
      ) {
        const userInfo = await request<HelpshiftUserInfo>('/api/helpshift/user', undefined, 'GET', false)
        setUserForSupport(userInfo);
      } else {
        clearUserForSupport();
      }
      (window as any).HelpshiftWidget('updateHelpshiftWidgetConfig');
      (window as any).HelpshiftWidget(
        'addEventListener',
        'widgetToggle',
        visibilityChange
      );
    }
  };

  useEffect(() => {
    updateHSConfig();
  }, [status]);

  const handleHSQuery = (evt: MessageEvent) => {
    const { data } = evt;
    const { name, data: query } = data;

    if ('common.initialize_hs_scripts' === name) {
      setHSScriptLoaded(false);
      setHsQuery(query);
      init();
    }
  };

  let observer: MutationObserver | null = null;

  const config = { childList: true };
  const callback = (mutationsList: any) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const widget = document.getElementById(
          'hs-widget-iframe'
        ) as HTMLIFrameElement;
        if (widget && widget.contentDocument) {
          widget.onload = () => {
            updateHSConfig();
            setHSScriptLoaded(true);
            (window as any).helpShiftInited = true;
            widget.onload = null;
          };
        }
      }
    }
  };

  if (typeof MutationObserver !== 'undefined') {
    observer = new MutationObserver(callback);
    observer.observe(document.body, config);
  }

  useEffect(() => {
    window.addEventListener('message', handleHSQuery);

    return () => {
      if ((window as any).HelpshiftWidget) {
        (window as any).HelpshiftWidget(
          'removeEventListener',
          'widgetToggle',
          visibilityChange
        );
      }
      window.removeEventListener('message', handleHSQuery);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!hsScriptLoaded || !hsQuery || querySent) return;
    setTimeout(() => {
      window.postMessage(hsQuery, '*');
      querySent = true;
    }, 300);
  }, [hsScriptLoaded, hsQuery]);

  return (
    <>
      {!hsScriptLoaded && (
        <div className="absolute top-0 left-0 w-full h-full z-[10000] flex flex-col justify-center bg-[#33194cb0]">
          <Spinner size={70}>
            <p className="text-white">Loading support chat...</p>
          </Spinner>
        </div>
      )}
      {children}
    </>
  );
};

export default HelpShiftProvider;
