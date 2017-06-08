import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  private tips: number[] = [];
  private activeTip: number;
  private taxes: number[] = [];
  private activeTax: number;

  private defaultTips: number[] = [15, 18, 20];
  private defaultTaxes: number[] = [8.5, 8.75, 9];

  constructor (private storage: Storage) {
    this.tips = this.defaultTips;
    this.taxes = this.defaultTaxes;
  };

  getTipButtons() {
    return this.storage.get('tips')
      .then(
        (tips) => {
          this.tips = tips == null || tips.length == 0 ? this.defaultTips : tips;
          return this.tips.slice();
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

  getTaxButtons() {
    return this.storage.get('taxes')
      .then(
        (taxes) => {
          this.taxes = taxes == null || taxes.length == 0 ? this.defaultTaxes : taxes;
          return this.taxes.slice();
        }
      );
  }

  setActiveTax(index: number) {
    this.activeTax = index;
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

  saveSettings(tipButtons: number[], activeTip: number,
               taxButtons: number[], activeTax: number) {
    this.tips = tipButtons;
    this.storage.set('tips', this.tips);
    this.activeTip = activeTip;
    this.storage.set('activeTip', this.activeTip);

    this.taxes = taxButtons;
    this.storage.set('taxes', this.taxes);
    this.activeTax = activeTax;
    this.storage.set('activeTax', this.activeTax);
  }
}
