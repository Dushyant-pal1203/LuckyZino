import { isAndroidUserAgent } from "./utils";

// types.ts
export interface DeviceScreenSpec {
  w: number;
  h: number;
  dpr: number;
}

export interface DeviceInfoResult {
  platform: 'iOS' | 'Android' | 'Desktop' | 'Unknown' | 'SSR';
  model: string;          // "iPhone 14 Pro" или "Samsung S21"
  renderer: string;       // "Apple GPU" или "NVIDIA GeForce RTX 3060"
  specs: {
    ram: string;          // "6 GB"
    screen: string;       // "393x852"
    gpuTier: 'low' | 'medium' | 'high'; // Примерная оценка
  };
  confidence: number;     // 0..1
}

export interface IOSDeviceResult {
  platform: 'iOS (browser)' | 'SSR' | 'Non-iOS';
  signature: string;
  screen: DeviceScreenSpec;
  safeAreaTop: number;
  hasNotchLikely: boolean;
  hasDynamicIslandLikely: boolean;
  isProMotion?: boolean;
  fps?: number;
  // Device Identity
  family: string;
  candidates: string[];

  // Specs
  totalRAM: string; // e.g., "6 GB" or "4 - 6 GB"

  confidence: number;
}

interface DeviceMapEntry {
  family: string;
  candidates: string[];
  ram: string; // Stored as string range for display
  baseConfidence: number;
}

function detectRefreshRate(): Promise<number> {
  return new Promise((resolve) => {
    let frameCount = 0;
    const startTime = performance.now();
    
    const checkParams = () => {
      frameCount++;
      const currentTime = performance.now();
      
      // 500ms sample is enough to distinguish 60 vs 120
      if (currentTime - startTime >= 500) {
        const fps = Math.round((frameCount * 1000) / (currentTime - startTime));
        resolve(fps);
      } else {
        requestAnimationFrame(checkParams);
      }
    };
    
    requestAnimationFrame(checkParams);
  });
}
// deviceDetection.ts
export function detectIOSDeviceClass(): IOSDeviceResult {
  // 1. SSR / Environment Safety Check
  if (typeof window === "undefined" || typeof screen === "undefined") {
    return createEmptyResult("SSR");
  }

  // 2. Extract Basic Metrics
  // iOS typically reports screen dimensions in CSS points, independent of rotation for 'screen.width/height' 
  // but better to force min/max to normalize portrait orientation logic.
  const w = Math.round(Math.min(screen.width, screen.height));
  const h = Math.round(Math.max(screen.width, screen.height));
  const dpr = window.devicePixelRatio || 1;

  // 3. Heuristic: Safe Area Inset (Crucial for Notch vs Dynamic Island)
  const safeTop = getSafeAreaTop();

  // Heuristics based on 2024/2025 data:
  // - Old devices (Touch ID): 20px
  // - Notch (iPhone X - 13): ~44px - 48px
  // - Dynamic Island (14 Pro, 15/16 series): ~59px
  const hasDynamicIslandLikely = safeTop >= 50;
  const hasNotchLikely = safeTop >= 30 && safeTop < 50;
  // Detect iPad OS (User Agent contains 'Macintosh' often, but touch points > 0)
  const isIPad = (navigator.maxTouchPoints > 0 && /Macintosh/.test(navigator.userAgent)) || /iPad/.test(navigator.userAgent);
  // 4. Create Signature
  const key = `${w}x${h}@${dpr}`;

  // 5. Initialize Result
  const result: IOSDeviceResult = {
    platform: "iOS (browser)",
    signature: key,
    screen: { w, h, dpr },
    safeAreaTop: safeTop,
    hasNotchLikely,
    hasDynamicIslandLikely,
    family: "Unknown iOS Device",
    candidates: [],
    totalRAM: "Unknown",
    confidence: 0.1,
  };

  // 6. Device Signature Map (Updated for iPhone 15/16 + RAM Specs)
  const map: Record<string, DeviceMapEntry> = {
    // --- Legacy / SE ---
    // iPhone 5s (1GB), SE 1 (2GB)
    "320x568@2": {
      family: "iPhone SE 1 / 5s",
      candidates: ["iPhone 5s", "iPhone SE 1st gen"],
      ram: "1 - 2 GB",
      baseConfidence: 0.9
    },
    // iPhone 6/6s/7/8 (2GB usually, 6 is 1GB), SE 2 (3GB), SE 3 (4GB)
    "375x667@2": {
      family: "iPhone 4.7\"",
      candidates: ["iPhone 6/7/8", "iPhone SE 2nd gen", "iPhone SE 3rd gen"],
      ram: "1 - 4 GB",
      baseConfidence: 0.8
    },
    // iPhone 6/7/8 Plus (3GB usually, 6 Plus is 1GB)
    "414x736@3": {
      family: "iPhone Plus",
      candidates: ["iPhone 6/7/8 Plus"],
      ram: "1 - 3 GB",
      baseConfidence: 0.8
    },

    // --- Notch Era (FaceID) ---
    // iPhone 12/13 mini (4GB)
    "360x780@3": {
      family: "iPhone Mini",
      candidates: ["iPhone 12 mini", "iPhone 13 mini"],
      ram: "4 GB",
      baseConfidence: 0.9
    },
    // iPhone X (3GB), XS (4GB), 11 Pro (4GB)
    "375x812@3": {
      family: "iPhone X/XS",
      candidates: ["iPhone X", "iPhone XS", "iPhone 11 Pro"],
      ram: "3 - 4 GB",
      baseConfidence: 0.8
    },
    // iPhone XR (3GB), 11 (4GB)
    "414x896@2": {
      family: "iPhone XR/11",
      candidates: ["iPhone XR", "iPhone 11"],
      ram: "3 - 4 GB",
      baseConfidence: 0.8
    },
    // iPhone XS Max (4GB), 11 Pro Max (4GB)
    "414x896@3": {
      family: "iPhone XS Max/11 Pro Max",
      candidates: ["iPhone XS Max", "iPhone 11 Pro Max"],
      ram: "4 GB",
      baseConfidence: 0.8
    },
    // iPhone 12/13 (4GB), 12 Pro/13 Pro (6GB), 14 (6GB)
    "390x844@3": {
      family: "iPhone 6.1\" (Notch)",
      candidates: ["iPhone 12", "iPhone 12 Pro", "iPhone 13", "iPhone 13 Pro", "iPhone 14"],
      ram: "4 - 6 GB",
      baseConfidence: 0.7
    },
    // iPhone 12 Pro Max (6GB), 13 Pro Max (6GB), 14 Plus (6GB)
    "428x926@3": {
      family: "iPhone Max (Notch)",
      candidates: ["iPhone 12 Pro Max", "iPhone 13 Pro Max", "iPhone 14 Plus"],
      ram: "6 GB",
      baseConfidence: 0.7
    },

    // --- Dynamic Island Era (Modern) ---
    // iPhone 14 Pro (6GB), 15 (6GB), 15 Pro (8GB), 16 (8GB)
    "393x852@3": {
      family: "iPhone 6.1\" Dynamic Island",
      candidates: ["iPhone 14 Pro", "iPhone 15", "iPhone 15 Pro", "iPhone 16", "iPhone 17"],
      ram: "6 - 8 GB",
      baseConfidence: 0.85
    },
    // iPhone 14 Pro Max (6GB), 15 Plus (6GB), 15 Pro Max (8GB), 16 Plus (8GB)
    "430x932@3": {
      family: "iPhone Max Dynamic Island",
      candidates: ["iPhone 14/15/16 Pro Max", "iPhone 17 Light (Slim)"],
      ram: "6 - 12 GB",
      baseConfidence: 0.85
    },

    // --- iPhone 16 Pro New Sizes ---
    // iPhone 16 Pro (8GB)
    "402x874@3": {
      family: "iPhone 16/17 Pro",
      candidates: ["iPhone 16 Pro", "iPhone 17 Pro"],
      ram: "8 - 12 GB",
      baseConfidence: 0.9
    },
    // iPhone 16 Pro Max (8GB)
    "440x956@3": {
      family: "iPhone 16/17 Pro Max",
      candidates: ["iPhone 16 Pro Max", "iPhone 17 Pro Max"],
      ram: "8-12 GB",
      baseConfidence: 0.9
    },
    // iPad Mini 6
    "744x1133@2": { family: "iPad Mini", candidates: ["iPad Mini 6th Gen"], ram: "4 GB", baseConfidence: 0.9 },
    // iPad 10.2" (7th, 8th, 9th Gen)
    "810x1080@2": { family: "iPad standard", candidates: ["iPad 7/8/9"], ram: "3 GB", baseConfidence: 0.85 },
    // iPad Air 4/5 & Pro 11"
    "820x1180@2": { family: "iPad Air", candidates: ["iPad Air 4", "iPad Air 5"], ram: "4 - 8 GB", baseConfidence: 0.8 },
    "834x1194@2": { family: "iPad Pro 11\"", candidates: ["iPad Pro 11\" (1st-4th gen)"], ram: "4 - 16 GB", baseConfidence: 0.8 },
    // iPad Pro 12.9"
    "1024x1366@2": { family: "iPad Pro 12.9\"", candidates: ["iPad Pro 12.9\" (All gens)"], ram: "4 - 16 GB", baseConfidence: 0.8 },
  };

  // 7. Match and Refine
  if (map[key]) {
    const m = map[key];
    result.family = m.family;
    result.candidates = [...m.candidates];
    result.totalRAM = m.ram;
    result.confidence = m.baseConfidence;
  } else {
    // FALLBACK for completely new devices
    if (isIPad) {
        result.family = "Unknown iPad";
        result.candidates = [`Unknown iPad (${w}x${h})`];
    } else if (hasDynamicIslandLikely) {
        result.family = "Future iPhone (Dynamic Island)";
        result.candidates = ["iPhone 17+ or newer"];
        result.confidence = 0.5;
    }
  }

  // Refinement: Differentiate "390x844" (iPhone 13 Pro vs iPhone 14)
  if (key === "390x844@3") {
    if (hasDynamicIslandLikely) {
      result.candidates = ["Unknown New Device (Scaled)"];
      result.totalRAM = "Unknown";
    } else {
      // Standard Notch behavior
      // iPhone 12/13 are 4GB. iPhone 12 Pro/13 Pro/14 are 6GB.
      result.candidates = ["iPhone 12/13 (4GB)", "iPhone 12 Pro/13 Pro/14 (6GB)"];
      result.totalRAM = "4 - 6 GB";
    }
  }

  // Refinement: Confirm Dynamic Island for 393 width devices
  if (key === "393x852@3") {
    if (!hasDynamicIslandLikely && safeTop > 0) {
      result.confidence -= 0.3;
      result.candidates.push("(Warning: Safe Area mismatch)");
    } else if (hasDynamicIslandLikely) {
      result.confidence += 0.1;
    }
  }

  // Clamp confidence
  result.confidence = Math.min(1.0, Math.max(0.0, result.confidence));

  return result;
}

/**
 * Helper to safely get the top safe area inset.
 */
function getSafeAreaTop(): number {
  if (typeof document === "undefined") return 0;

  const el = document.createElement("div");
  // Проверяем Top, Left и Right. Bottom обычно для Home Indicator, он меньше (около 20-34px).
  el.style.cssText = `
    position: fixed;
    top: 0; left: 0; right: 0;
    width: 0; height: 0;
    padding-top: env(safe-area-inset-top, 0px);
    padding-left: env(safe-area-inset-left, 0px);
    padding-right: env(safe-area-inset-right, 0px);
    visibility: hidden;
    pointer-events: none;
    z-index: -9999;
  `;
  
  document.body.appendChild(el);
  const style = window.getComputedStyle(el);
  
  const top = parseFloat(style.paddingTop) || 0;
  const left = parseFloat(style.paddingLeft) || 0;
  const right = parseFloat(style.paddingRight) || 0;
  
  document.body.removeChild(el);
  
  // Возвращаем максимальное значение. 
  // Если телефон вертикально — это будет top.
  // Если горизонтально — это будет left или right.
  return Math.max(top, left, right);
}

function createEmptyResult(reason: string): IOSDeviceResult {
  return {
    platform: reason === "SSR" ? "SSR" : "Non-iOS",
    signature: "unknown",
    screen: { w: 0, h: 0, dpr: 0 },
    safeAreaTop: 0,
    hasNotchLikely: false,
    hasDynamicIslandLikely: false,
    family: isAndroidUserAgent() ? "Android" : "unknown",
    candidates: [],
    totalRAM: "unknown",
    confidence: 0
  };
}

function refineCandidatesByFPS(info: IOSDeviceResult) {
  if (!info.isProMotion) {
    // --- 60 Hz Detected ---
    // Remove "Pro" models that are known to have 120Hz ALWAYS
    // (Note: Low Power Mode caps Pros to 60Hz, so we keep them as "Possible" but prioritize Base models)
    
    if (info.signature === "390x844@3") {
      // Group: 12, 12 Pro, 13, 13 Pro, 14
      // 13 Pro has ProMotion. The others do not.
      info.candidates = ["iPhone 12", "iPhone 13", "iPhone 14", "iPhone 12 Pro"];
      info.family = "iPhone 12/13/14 (60Hz)";
      info.totalRAM = "4 - 6 GB";
    }

    if (info.signature === "393x852@3") {
      // Group: 14 Pro, 15, 15 Pro, 16, 17
      // 14 Pro and 15 Pro are 120Hz.
      // 15, 16, 17 Base are 60Hz.
      info.candidates = ["iPhone 15", "iPhone 16", "iPhone 17 (Base)"];
      info.family = "iPhone 15/16/17 Base (60Hz)";
      info.confidence += 0.2; // High confidence we successfully filtered out the Pros
    }

  } else {
    // --- 120 Hz Detected ---
    // This is a "Pro" device.
    info.totalRAM = "6 - 12 GB"; // Pros generally have more RAM
    info.confidence += 0.25;

    if (info.signature === "390x844@3") {
      // Only 13 Pro has 120Hz in this size/notch config
      info.candidates = ["iPhone 13 Pro"];
      info.family = "iPhone 13 Pro";
    }

    if (info.signature === "393x852@3") {
      // 14 Pro, 15 Pro, 17 Pro (maybe)
      info.candidates = ["iPhone 14 Pro", "iPhone 15 Pro", "iPhone 17 Pro (if 6.1\")"];
      info.family = "iPhone Pro (Dynamic Island)";
    }
    
    // 16 Pro / 17 Pro sizes (402px width) are implicitly handled by static map
    // but FPS confirms they are indeed functioning correctly.
  }
}

export async function getDetailedDeviceInfo(): Promise<DeviceInfoResult> {
  if (typeof window === "undefined") return {
    platform: 'SSR', model: 'Server', renderer: '', specs: { ram: '0', screen: '0', gpuTier: 'low' }, confidence: 1
  };

  const nav = navigator as any;
  let platform: DeviceInfoResult['platform'] = 'Unknown';
  let model = 'Unknown';
  let confidence = 0.5;

  // 1. Попытка через Client Hints (Android / Modern Chrome)
  // ВАЖНО: Это асинхронный API
  if (nav.userAgentData) {
    try {
      const data = await nav.userAgentData.getHighEntropyValues(['model', 'platform', 'platformVersion']);
      if (data.platform === 'Android') {
        platform = 'Android';
        model = data.model || 'Android Device';
        confidence = 0.95; // Высокое доверие
      }
    } catch (e) {
      console.warn('UA-CH failed', e);
    }
  }

  // 2. iOS Detection (Наша эвристика)
  // Если Client Hints ничего не дали или мы знаем, что это iOS (по userAgent)
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
  if (isIOS) {
    platform = 'iOS';
    // Импортируем ту функцию, которую мы написали ранее
    const iosData = detectIOSDeviceClass();
    const fps = await detectRefreshRate();
    iosData.fps = fps;
    iosData.isProMotion = fps > 75; // Safe threshold (ProMotion is usually 120, standard is 60)

    // REFINE: Apply FPS logic to split identical models
    refineCandidatesByFPS(iosData);
    model = iosData.candidates[0] || 'iPhone';
    confidence = iosData.confidence;

    // Если наша эвристика дала точное совпадение (например, 14 Pro), используем его
    if (iosData.candidates.length > 1) {
      model = `${iosData.family} (${iosData.candidates.join(', or ')})`;
    }
  }

  // 3. WebGL Renderer (GPU info)
  const gpuInfo = getGPUInfo();

  // 4. Оценка RAM (Memory API или iOS эвристика)
  let ramVal = (nav.deviceMemory ? `${nav.deviceMemory} GB` : 'Unknown');
  if (platform === 'iOS') {
    // Берем из нашей функции detectIOSDeviceClass
    const iosData = detectIOSDeviceClass();
    const fps = await detectRefreshRate();
    iosData.fps = fps;
    iosData.isProMotion = fps > 75; // Safe threshold (ProMotion is usually 120, standard is 60)

    // REFINE: Apply FPS logic to split identical models
    refineCandidatesByFPS(iosData);
    ramVal = iosData.totalRAM;
  }

  return {
    platform,
    model,
    renderer: gpuInfo.renderer,
    specs: {
      ram: ramVal,
      screen: `${window.screen.width}x${window.screen.height}`,
      gpuTier: gpuInfo.tier
    },
    confidence
  };
}

function getGPUInfo() {
  let renderer = 'Unknown';
  let tier: 'low' | 'medium' | 'high' = 'medium';

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      }
    }
  } catch (e) { console.log(e); }

  // Простая эвристика производительности по названию
  const r = renderer.toLowerCase();
  if (r.includes('nvidia') || r.includes('radeon') || r.includes('apple m')) tier = 'high';
  else if (r.includes('intel') || r.includes('mali-g5') || r.includes('adreno 6')) tier = 'medium';
  else if (r.includes('adreno 3') || r.includes('adreno 4') || r.includes('sw')) tier = 'low';

  // Apple GPU на телефонах — это обычно High/Medium, но название всегда одно: "Apple GPU"
  if (r === 'apple gpu') tier = 'high';

  return { renderer, tier };
}