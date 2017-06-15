import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  private tipSubtotal: boolean = false;
  private tips: number[] = [15, 18, 20];
  private activeTip: number = 18;
  private customTip: number;

  private minTax: number;
  private defaultMinTax: number = 8;
  private maxTax: number;
  private defaultMaxTax: number = 9;
  private taxStep: number = 0.25;
  private currentTax: number = 8.5;

  private taxes: number[] = [];
  private activeTax: number = 8.5;

  private defaultTips: number[] = [15, 18, 20];
  private defaultTaxes: number[] = [8, 8.25, 8.5, 8.75, 9];

  constructor (private storage: Storage) {
    this.tips = this.defaultTips;
    this.taxes = this.defaultTaxes;
    this.minTax = 8;
    this.maxTax = 9;
  };

  getTipSubtotal() {
    return this.storage.get('tipSubtotal')
      .then(
        (tipSubtotal) => {
          this.tipSubtotal = tipSubtotal == null ? false : tipSubtotal;
          return this.tipSubtotal;
        }
      );
  }

  getCustomTip() {
    return this.storage.get('customTip')
      .then(
        (customTip) => {
          this.customTip = customTip;
          return this.customTip;
        }
      )
  }

  getTips() {
    return this.storage.get('tips')
      .then(
        (tips) => {
          this.tips = (tips == null || tips.length == 0) ? this.defaultTips : tips;
          return this.tips;
        }
      );
  }

  setActiveTip(index: number) {
    this.activeTip = index;
    this.storage.set('activeTip', this.activeTip);
  }

  getActiveTip() {
    return this.storage.get('activeTip')
      .then(
        (activeTip) => {
          this.activeTip = activeTip;
          return this.activeTip;
        }
      );
  }

  getMinTax() {
    return this.storage.get('minTax')
      .then(
        (minTax) => {
          this.minTax = (minTax == null) ? this.defaultMinTax : minTax;
          return this.minTax;
        }
      );
  }

  getMaxTax() {
    return this.storage.get('maxTax')
      .then(
        (maxTax) => {
          this.maxTax = (maxTax == null) ? this.defaultMaxTax : maxTax;
          return this.maxTax;
        }
      );
  }

  getTaxes() {
    return this.storage.get('taxes')
      .then(
        (taxes) => {
          this.taxes = taxes == null || taxes.length == 0 ? this.defaultTaxes : taxes;
          return this.taxes.slice();
        }
      );
  }

  setActiveTax(tax: number) {
    this.activeTax = tax;
    this.storage.set('activeTax', this.activeTax);
  }

  getActiveTax() {
    return this.storage.get('activeTax')
      .then(
        (activeTax) => {
          this.activeTax = activeTax;
          return this.activeTax;
        }
      );
  }

  saveSettings(tipSubtotal: boolean, customTip: number,
               tipButtons: number[], activeTip: number,
               minTax: number, maxTax: number) {
    this.tipSubtotal = tipSubtotal;
    this.storage.set('tipSubtotal', this.tipSubtotal);

    this.customTip = customTip;
    this.storage.set('customTip', this.customTip);

    this.tips = tipButtons;
    this.storage.set('tips', this.tips);
    this.activeTip = activeTip;
    this.storage.set('activeTip', this.activeTip);

    this.minTax = +minTax;
    this.maxTax = +maxTax;
    this.storage.set('minTax', this.minTax);
    this.storage.set('maxTax', this.maxTax);
    this.taxes = [];
    for (var i = this.minTax; i <= this.maxTax; i += 0.25) {
      this.taxes.push(i);
    }
    this.storage.set('taxes', this.taxes);
    this.setActiveTax(this.minTax);
  }
}
