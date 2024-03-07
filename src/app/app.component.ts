import { Component } from '@angular/core';
import { IonApp, IonFab, IonFabButton, IonIcon, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chatbubbleEllipsesOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, IonFab, IonFabButton, IonIcon],
})
export class AppComponent {
  constructor() {
    addIcons({chatbubbleEllipsesOutline})
  }
}