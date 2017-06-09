import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  subtotal: number = 100;
  subtotalString: string;

  taxes: number[] = [];
  activeTax: number = 0;
  taxAmount: number;

  total: number = 0;
  totalString: string;
  totalLastChanged: boolean = false;

  tips: number[] = [];
  activeTip: number = 0;
  tipAmount: number;

  amountDue: number;

  persons: number = 1;
  perPersonAmount: number = 0;

  constructor(public navCtrl: NavController, private settingsService: SettingsService) {

  }

  ionViewWillEnter() {
    this.settingsService.getTipButtons()
      .then(
        (tips) => this.tips = tips
      );
    this.settingsService.getActiveTip()
      .then(
        (activeTip) => this.activeTip = activeTip
      );

    this.settingsService.getTaxButtons()
      .then(
        (taxes) => this.taxes = taxes
      );
    this.settingsService.getActiveTax()
      .then(
        (activeTax) => this.activeTax = activeTax
      );

    let updateAmount = setTimeout(() => {this.updateAmountDue();}, 300);
  }

  onLoadSettings() {
    this.navCtrl.push(SettingsPage);
  }

  setActiveTax(index: number) {
    this.activeTax = index;
    this.settingsService.setActiveTax(this.activeTax);
    this.updateAmountDue();
  }

  setActiveTip(index: number) {
    this.activeTip = index;
    this.settingsService.setActiveTip(this.activeTip);
    this.updateAmountDue();
  }

  onSubtotalChange(evtValue) {
    this.totalLastChanged = false;

    // Convert string to x.xx decimal
    let noDecimal = evtValue.replace(/\./g, "");
    this.subtotalString = (+noDecimal / 100).toFixed(2);
    this.subtotal = +this.subtotalString;

    // Set string to 0.00 when amount is 0
    if (this.subtotal == 0) {
      this.subtotalString = "0.00"
      evtValue = "0.00";
    }

    this.updateAmountDue();
  }

  onTotalChange(evtValue) {
    this.totalLastChanged = true;

    // Convert string to x.xx decimal
    let noDecimal = evtValue.replace(/\./g, "");
    this.totalString = (+noDecimal / 100).toFixed(2);
    this.total = +this.totalString;

    // Set string to 0.00 when amount is 0
    if (this.total == 0) {
      this.totalString = "0.00";
    }

    this.updateAmountDue();
  }

  updateAmountDue() {
    // If we last changed the total amount, update subtotal and tax accordingly
    if (this.totalLastChanged) {
      this.subtotal = this.total / (1 + this.taxes[this.activeTax] / 100);
      this.subtotalString = (+this.subtotal).toFixed(2);
      this.subtotal = +this.subtotalString;
      this.taxAmount = this.total * 1 - this.subtotal * 1;
      this.taxAmount = +(this.taxAmount.toFixed(2));
    }
    // If we last changed the subtotal amount, update total and tax accordingly
    else {
      this.subtotalString = (+this.subtotal).toFixed(2);
      this.subtotal = +this.subtotalString;
      this.taxAmount = +(this.subtotal * this.taxes[this.activeTax] / 100).toFixed(2);
      this.total = this.subtotal * 1 + this.taxAmount * 1;
      this.totalString = (+this.total).toFixed(2);
      this.total = +this.totalString;
    }

    // Calculate tip and total amount due
    this.tipAmount = +(this.subtotal * this.tips[this.activeTip] / 100).toFixed(2);
    this.amountDue = this.total * 1 + this.tipAmount * 1;
    this.amountDue = +this.amountDue.toFixed(2);

    // Calculate split cost based on persons count
    this.perPersonAmount = +((+this.amountDue / this.persons).toFixed(2));

  }

  onPersonsChange() {
    this.updateAmountDue();
  }
}
