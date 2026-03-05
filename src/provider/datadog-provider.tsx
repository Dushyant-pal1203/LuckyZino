// Necessary if using App Router to ensure this file runs on the client
'use client';

import { isDevEnv, isProdEnv, isStageEnv } from '@/lib/utils';
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: 'c6f173db-e100-4d13-9a3b-8da91e46c54f',
  clientToken: 'pub18e7fe6f3a50e9c651221ba5a51d09f7',
  site: 'datadoghq.com',
  service: 'next-app',	
  env:
    (isProdEnv() && 'prod') ||
    (isDevEnv() && 'dev') ||
    (isStageEnv() && 'stage') ||
    'stage',
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 20,
  trackUserInteractions: false,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input'
  // Specify URLs to propagate trace headers for connection between RUM and backend trace
});

export default function DatadogInit() {
  // Render nothing - this component is only included so that the init code
  // above will run client-side
  return null;
}
