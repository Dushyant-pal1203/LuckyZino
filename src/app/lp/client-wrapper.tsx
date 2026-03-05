'use client';
import { TrackerEvents } from "@/enum/trackers";
import { sendBIEvent } from "@/lib/trackers";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

const ClientWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  useEffect(() => {
    sendBIEvent(TrackerEvents.PageView);
  }, [pathname]);
  return <>{ children }</>;
};

export default ClientWrapper;
