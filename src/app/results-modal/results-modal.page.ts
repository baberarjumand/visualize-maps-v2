import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-results-modal',
  templateUrl: './results-modal.page.html',
  styleUrls: ['./results-modal.page.scss'],
})
export class ResultsModalPage implements OnInit {
  @Input() imagesResultSet: string[];

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  ionViewDidEnter() {
    console.log(this.imagesResultSet);
  }

  dismissModal() {
    this.modalController.dismiss({ dismissed: true });
  }
}
