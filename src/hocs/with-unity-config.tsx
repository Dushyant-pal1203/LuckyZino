import React, { ComponentType, useEffect, useState } from 'react';
import Spinner from '@/components/ui/spinner';
import { IUnityProviderConfig } from '@/hooks/use-unity-loader';

const isASTCSupported = () => {
  const c =
    document.getElementsByTagName('canvas')[0] ??
    document.createElement('canvas');
  const gl = c.getContext('webgl');
  const gl2 = c.getContext('webgl2');
  return Boolean(
    (gl && gl.getExtension('WEBGL_compressed_texture_astc')) ||
      (gl2 && gl2.getExtension('WEBGL_compressed_texture_astc'))
  );
};

const requestBuildInfo = async (
  path: string,
  successCallback: (config: IUnityProviderConfig) => void,
  failCallback: () => void
) => {
  return fetch(path)
    .then(async (res) => {
      const config = await res.json();
      successCallback(config);
    })
    .catch((e) => {
      console.warn(`Failed to fetch Unity BuildInfo, using fallback.`, e);
      failCallback();
    });
};

const withUnityConfig = <P extends object>(
  Component: ComponentType<P>
): ComponentType<P> => {
  return function ComponentWithResolvedBuildID(props: P) {
    const [resolvedConfig, setResolvedConfig] =
      useState<IUnityProviderConfig>();
    const [isConfigLoaded, setIsLoaded] = useState(false);
    const [dirPrefix, setDirPrefix] = useState('');

    const { webglBuildId, url } = props as unknown as {
      webglBuildId: string;
      url: string;
    };
    let srcPath = '';

    if (webglBuildId) {
      srcPath = webglBuildId.startsWith('http')
        ? webglBuildId
        : `${process.env.NEXT_PUBLIC_LOBBY_BUILD_URL}/${webglBuildId}`;
      if (!srcPath.endsWith('/')) srcPath += '/';
    }

    if (url) {
      srcPath = url;
    }

    useEffect(() => {
      setIsLoaded(false);
      const buildDirPrefix = isASTCSupported() ? 'mobile/' : 'desktop/';
      requestBuildInfo(
        `${srcPath}${buildDirPrefix}build_info.json`,
        (config) => {
          setResolvedConfig(config);
          setDirPrefix(buildDirPrefix);
          setIsLoaded(true);
        },
        () => {
          requestBuildInfo(
            `${srcPath}build_info.json`,
            (config) => {
              setResolvedConfig(config);
              setIsLoaded(true);
            },
            () => setIsLoaded(true)
          );
        }
      );
    }, [srcPath, webglBuildId]);

    if (!isConfigLoaded) {
      return (
        <div className="w-full h-full min-h-[100vh] flex flex-col justify-center">
          <Spinner size={100} />{' '}
        </div>
      );
    }

    return (
      <Component
        {...props}
        webglBuildId={`${srcPath}${dirPrefix}`}
        url={`${url}${dirPrefix}`}
        unityConfig={resolvedConfig}
      />
    );
  };
};

export default withUnityConfig;
