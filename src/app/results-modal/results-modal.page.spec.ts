import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ResultsModalPage } from './results-modal.page';

describe('ResultsModalPage', () => {
  let component: ResultsModalPage;
  let fixture: ComponentFixture<ResultsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
