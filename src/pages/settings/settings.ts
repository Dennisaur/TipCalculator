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
  tipSubtotal: boolean = false;
  tips : number[] = [];
  activeTip : number = 0;
  customTip: number;
  taxes : number[] = [];
  minTax: number;
  maxTax: number;

  constructor(public navCtrl: NavController,
              private settingsService: SettingsService) {

  }

  ionViewWillEnter() {
    this.settingsService.getTipSubtotal()
      .then(
        (tipSubtotal) => this.tipSubtotal = tipSubtotal
      );
    this.settingsService.getMinTax()
      .then(
        (minTax) => this.minTax = minTax
      );
    this.settingsService.getMaxTax()
      .then(
        (maxTax) => this.maxTax = maxTax
      );
    this.settingsService.getCustomTip()
      .then(
        (customTip) => this.customTip = customTip
      );
    this.settingsService.getTips()
      .then(
        (tips) => this.tips = tips
      );
  }

  addTip(value: any) {
    this.tips = [15, 18, 20];

    // Prevent negative values
    if (!value.percentage || value.percentage < 0) {
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

  saveSettings(form: any) {
    this.addTip({percentage: form.customTip});
    this.settingsService.saveSettings(form.tipSubtotal, form.customTip,
      this.tips, this.activeTip, form.minTax, form.maxTax);
    this.back();
  }

  back() {
    this.navCtrl.pop();
  }
}
