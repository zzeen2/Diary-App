export default {
  expo: {
    name: "MoodCloudApp",
    slug: "moodcloudapp",
    scheme: "moodcloudapp",
    version: "1.0.0",
    owner: "jieunkim1203",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      userInterfaceStyle: "light",
      package: "com.kimjieun.moodcloud",
      bundleIdentifier : "com.kimjieun.moodcloud"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true,
      package: "com.kimjieun.moodcloud"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    // 환경 변수 추가
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL || "http://192.168.0.6:4000",
      apiTimeout: process.env.EXPO_PUBLIC_API_TIMEOUT || "5000",
      debugMode: process.env.EXPO_PUBLIC_DEBUG_MODE || "true",
    }
  }
};