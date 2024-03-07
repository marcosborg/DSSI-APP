import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'pt.appdssi.app',
  appName: 'DSSI',
  webDir: 'www/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
