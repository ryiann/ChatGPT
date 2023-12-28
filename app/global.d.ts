declare module "*.jpg";
declare module "*.png";
declare module "*.woff2";
declare module "*.woff";
declare module "*.ttf";
declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.svg";

declare interface Window {
  __TAURI__?: {
    writeText(text: string): Promise<void>;
    invoke(command: string, payload?: Record<string, unknown>): Promise<any>;
    dialog: {
      save(options?: Record<string, unknown>): Promise<string | null>;
    };
    fs: {
      writeBinaryFile(path: string, data: Uint8Array): Promise<void>;
    };
    process: {
      relaunch(): Promise<void>;
    };
    notification:{
      requestPermission(): Promise<Permission>;
      isPermissionGranted(): Promise<boolean>;
      sendNotification(options: string | Options): void;
    };
    updater: {
      checkUpdate(): Promise<UpdateResult>;
      installUpdate(): Promise<void>;
      onUpdaterEvent(handler: (status: UpdateStatusResult) => void): Promise<UnlistenFn>;
    };
    // no longer needed now, because tauri app basically it's build own browser
    globalShortcut: {
      isRegistered(shortcut: string): Promise<boolean>;
      register(shortcut: string, handler: ShortcutHandler): Promise<void>;
      registerAll(shortcuts: string[], handler: ShortcutHandler): Promise<void>;
      unregister(shortcut: string): Promise<void>;
      unregisterAll(): Promise<void>;
    };
  };
}

declare module '@tauri-apps/api/window';
