import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'mobile-web',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    "allowNavigation": [
      "https://empreendedorismo.dynv6.net",
    ]
  }
};

export default config;
