import { EXPORT_DEFAULTS } from '../constants';
import { LayoutConfig } from '../types';

export class LayoutManager {
  private config: LayoutConfig;

  constructor(config: Partial<LayoutConfig> = {}) {
    this.config = {
      width: config.width ?? EXPORT_DEFAULTS.width,
      padding: config.padding ?? EXPORT_DEFAULTS.padding,
      headerWidth: config.headerWidth ?? EXPORT_DEFAULTS.headerWidth,
      rowHeight: config.rowHeight ?? EXPORT_DEFAULTS.rowHeight,
      itemHeight: config.itemHeight ?? EXPORT_DEFAULTS.itemHeight
    };
  }

  calculateContentWidth(): number {
    return this.config.width - this.config.headerWidth - (this.config.padding * 2);
  }

  calculateTotalHeight(rowCount: number): number {
    return EXPORT_DEFAULTS.titleHeight + 
           (rowCount * this.config.rowHeight) + 
           (this.config.padding * 2);
  }

  getHeaderPosition(index: number): { x: number; y: number } {
    return {
      x: this.config.padding,
      y: EXPORT_DEFAULTS.titleHeight + (index * this.config.rowHeight)
    };
  }

  getContentPosition(index: number): { x: number; y: number } {
    return {
      x: this.config.headerWidth + this.config.padding,
      y: EXPORT_DEFAULTS.titleHeight + (index * this.config.rowHeight)
    };
  }
}