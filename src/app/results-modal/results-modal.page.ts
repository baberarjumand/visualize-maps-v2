import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-results-modal',
  templateUrl: './results-modal.page.html',
  styleUrls: ['./results-modal.page.scss'],
})
export class ResultsModalPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss({ dismissed: true });
  }
}
