import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SettingsService } from '../../services/settings.service';

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  tips : number[] = [];
  activeTip : number = 0;
  taxes : number[] = [];
  activeTax : number = 0;

  constructor(public navCtrl: NavController, private settingsService: SettingsService) {
  }

  ionViewWillEnter() {
    this.settingsService.getTipButtons()
      .then(
        (tips) => this.tips = tips
      );
    this.settingsService.getTaxButtons()
      .then(
        (taxes) => this.taxes = taxes
      );
  }

  addTip(value: any) {
    // Prevent negative values
    if (value.percentage < 0) {
      return -1;
    }

    let insertAt = 0;
    for (let tip of this.tips) {
      // Button already exists
      if (+tip == value.percentage) {
        return -1;
      }
      // New tip amount should be inserted here
      if (value.percentage < +tip) {
        break;
      }
      insertAt++;
    }

    // Insert to keep array sorted
    this.tips.splice(insertAt, 0, value.percentage);
    this.setActiveTip(insertAt);
  }

  setActiveTip(index: number) {
    this.activeTip = index;
  }

  clearTips() {
    this.tips = [];
  }

  addTax(value: any) {
    let insertAt = 0;
    for (let tax of this.taxes) {
      // Button already exists
      if (+tax == value.percentage) {
        return -1;
      }
      // New tax amount should be inserted here
      if (value.percentage < +tax) {
        break;
      }
      insertAt++;
    }

    this.taxes.splice(insertAt, 0, value.percentage);
    this.setActiveTax(insertAt);
  }

  setActiveTax(index: number) {
    this.activeTax = index;
  }

  clearTaxes() {
    this.taxes = [];
  }

  saveSettings() {
    this.settingsService.saveSettings(this.tips, this.activeTip, this.taxes, this.activeTax);
    this.back();
  }

  back() {
    this.navCtrl.pop();
  }
}
