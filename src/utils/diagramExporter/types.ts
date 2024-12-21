export interface ExportOptions {
  width?: number;
  height?: number;
  padding?: number;
  headerWidth?: number;
  rowHeight?: number;
  itemHeight?: number;
}

export interface LayoutConfig {
  width: number;
  padding: number;
  headerWidth: number;
  rowHeight: number;
  itemHeight: number;
}

export interface SvgAttributes {
  width: number;
  height: number;
  xmlns: string;
  'xmlns:xlink': string;
  version?: string;
  viewBox?: string;
}

export interface TechLogoData {
  url: string;
  name: string;
  backgroundColor?: string;
  base64?: string;
}