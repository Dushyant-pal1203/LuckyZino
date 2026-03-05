/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 27/03/2025 23:30
 */
import Cookies from 'js-cookie';
import { IAnalyticsContext } from '@/lib/trackers';
import { stringToBase64 } from '@/lib/utils'
import { useUnityContext } from 'react-unity-webgl';
import { USER_ANALYTICS_CONTEXT } from '@/constants/auth';

export interface IUnityProviderConfig {
	version: string,
	isDevelopment: boolean,
	unityInstanceConfig: {
		loaderUrl: string,
		dataUrl: string,
		frameworkUrl: string,
		codeUrl: string,
		streamingAssetsUrl: string
	}
}

export enum UnityInstanceType {
	LOBBY_INSTANCE = 'lobbyInstance',
	SLOT_INSTANCE = 'slotInstance',
}

export interface IUnityLoaderParams {
	instanceType: UnityInstanceType,
	companyName?: string,
	productName?: string,
	productVersion?: string,
	token?: string,
	userId?: string,
	deepLinkToken?: string | null
}

export interface ILaunchConfig {
	accessToken?: string | null,
	userId?: string | null,
	deepLinkToken?: string | null,
	slotAccessToken?: string | null,
	serverWebSocketUrl?: string | null,
	serverHttpUrl?: string | null,
	envName?: string,
	analyticsContext?: {
		gaClientId: string | null,
		adjustAdid: string | null,
		adjustWebUuid: string | null,
		fbClickId: string | null
	}
}

const defaultUnityProviderConfig = {
	"version": "1.0.0",
	"isDevelopment": false,
	"unityInstanceConfig": {
		"loaderUrl": "Build/Build.loader.js",
		"dataUrl": "Build/Build.data",
		"frameworkUrl": "Build/Build.framework.js",
		"codeUrl": "Build/Build.wasm",
		"streamingAssetsUrl": "StreamingAssets"
	}
}

const serverWebSocketUrl = process.env.NEXT_PUBLIC_UNITY_SERVER_WEBSOCKET_URL ?? "wss://stg-api.luckyzino.com/ws";
const serverHttpUrl = process.env.NEXT_PUBLIC_UNITY_SERVER_HTTP_URL ?? "https://stg-is-api.luckyzino.com";

export const buildLaunchConfig = (params: IUnityLoaderParams, analyticsContext?: IAnalyticsContext) => {
	const launchConfig: ILaunchConfig = {
		envName: process.env.NEXT_PUBLIC_DEFAULT_LOBBY_BUILD ?? 'stg',
	};
	const type = params.instanceType;
	if (type === UnityInstanceType.LOBBY_INSTANCE) {
		launchConfig.accessToken = params?.token ?? null;
		launchConfig.serverWebSocketUrl = serverWebSocketUrl;
		launchConfig.analyticsContext = {
			'gaClientId': analyticsContext?.['user.ga_client_id'] ?? null,
			'adjustAdid': analyticsContext?.['user.adjust_adid'] ?? null,
			'adjustWebUuid': analyticsContext?.['user.adjust_web_uuid'] ?? null,
			'fbClickId': analyticsContext?.['user.fb_click_id'] ?? null,
		};
	}

	if (type === UnityInstanceType.SLOT_INSTANCE) {
		launchConfig.slotAccessToken = params?.token ?? null;
		launchConfig.serverHttpUrl = serverHttpUrl;
	}

	launchConfig.userId = params?.userId ?? null;
	launchConfig.deepLinkToken = params?.deepLinkToken ?? null;

	return launchConfig;
};

const useUnityLoader = (buildId: string, params: IUnityLoaderParams, config?: IUnityProviderConfig) => {
	const unityConfig = config ?? defaultUnityProviderConfig;
	const companyName = params?.companyName ?? 'LuckyZino';
	const productName = params?.productName ?? 'Sweepstakes Lobby';
	const productVersion = params?.productVersion ?? unityConfig.version ?? '1.0.0';
	const analyticsContext: IAnalyticsContext = JSON.parse(Cookies.get(USER_ANALYTICS_CONTEXT) || (""));

	const launchConfig: ILaunchConfig = buildLaunchConfig(params, analyticsContext);

	const context = useUnityContext({
		arguments: ['-launchConfig', stringToBase64(JSON.stringify(launchConfig))],
		loaderUrl: `${buildId}${unityConfig.unityInstanceConfig.loaderUrl}`,
		dataUrl: `${buildId}${unityConfig.unityInstanceConfig.dataUrl}`,
		frameworkUrl: `${buildId}${unityConfig.unityInstanceConfig.frameworkUrl}`,
		codeUrl: `${buildId}${unityConfig.unityInstanceConfig.codeUrl}`,
		streamingAssetsUrl: `${buildId}${unityConfig.unityInstanceConfig.streamingAssetsUrl}`,
		companyName,
		productName,
		productVersion,
		webglContextAttributes: { preserveDrawingBuffer: true },
		cacheControl: (url: string) => {
			if (url.match(/\.data/) || url.match(/\.bundle/)) {
				return "must-revalidate";
			}
			return "no-store";
		}
	});

	return context;
};

export default useUnityLoader;
