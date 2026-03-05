import React, { ComponentType, useEffect, useState } from 'react';
import Spinner from '@/components/ui/spinner';
import { fileRequest } from '@/services/request-handler';
import { useSearchParams } from 'next/navigation';

// Environment variable for the base URL (replace with your actual env var)
const LOBBY_IDS_BASE_URL =
  process.env.NEXT_PUBLIC_LOBBY_IDS_URL ||
  'https://sws-cdn.goldenspin.com/lobby/builds/webgl/ids';

const withBuildId = <P extends object>(
  Component: ComponentType<P & { webglBuildId: string }>
): ComponentType<P> => {
  return function ComponentWithResolvedBuildID(props: P) {
    const [resolvedBuildId, setResolvedBuildId] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();

    // Memoize default lobby build and ultimate fallback for stability in useEffect deps (though env vars usually stable)
    const defaultLobbyBuildEnv = process.env.NEXT_PUBLIC_DEFAULT_LOBBY_BUILD;
    const ultimateFallbackBuildId = defaultLobbyBuildEnv || 'latest';

    useEffect(() => {
      const buildIdFromParams = searchParams.get('buildId');

      if (buildIdFromParams) {
        if (buildIdFromParams !== resolvedBuildId) {
          console.log(`Using buildId from URL params: ${buildIdFromParams}`);
          setResolvedBuildId(buildIdFromParams);
          setLoading(false);
        }
        return; // Exit effect
      }

      // If we already have a resolved ID and no param override, don't re-fetch
      if (resolvedBuildId) {
        return;
      }

      setLoading(true);

      let envSuffix = '';
      switch (defaultLobbyBuildEnv) {
        case 'stage':
          envSuffix = 'stg';
          break;
        case 'prod':
          envSuffix = 'prod';
          break;
        default:
          envSuffix = defaultLobbyBuildEnv || 'prod';
      }

      const url = `${LOBBY_IDS_BASE_URL}/${envSuffix}.txt`;
      console.log(`Workspaceing buildId from: ${url}`);

      fileRequest(url)
        .then((id) => {
          const trimmedId = String(id).trim(); // Trim whitespace/newlines
          if (trimmedId) {
            console.log(`Workspaceed buildId: ${trimmedId}`);
            setResolvedBuildId(trimmedId);
          } else {
            console.warn(
              `Workspaceed build ID from ${url} was empty, using fallback: ${ultimateFallbackBuildId}`
            );
            setResolvedBuildId(ultimateFallbackBuildId); // Use fallback if fetched ID is empty after trim
          }
        })
        .catch((e) => {
          // If fetch fails, use the fallback ID
          console.warn(
            `Failed to fetch build ID from ${url}, using fallback: ${ultimateFallbackBuildId}`,
            e
          );
          setResolvedBuildId(ultimateFallbackBuildId);
        })
        .finally(() => {
          // Stop loading whether fetch succeeded or failed
          setLoading(false);
        });

      // Re-run effect if searchParams change
    }, [
      searchParams,
      ultimateFallbackBuildId,
      defaultLobbyBuildEnv,
      resolvedBuildId
    ]);

    if (loading) {
      return (
        <div className="w-full h-full min-h-[100vh] flex flex-col justify-center">
          <Spinner size={100} />
        </div>
      );
    }

    // Pass down original props and the resolved webglBuildId
    return <Component {...props} webglBuildId={resolvedBuildId} />;
  };
};

export default withBuildId;
