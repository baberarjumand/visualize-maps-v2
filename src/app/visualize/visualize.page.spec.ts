import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisualizePage } from './visualize.page';

describe('VisualizePage', () => {
  let component: VisualizePage;
  let fixture: ComponentFixture<VisualizePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
