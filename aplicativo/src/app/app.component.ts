import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from "@angular/common/http";
import { PreferencesService } from './services/preferences.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent implements OnInit {
  constructor(private preferencesService: PreferencesService) { }

  ngOnInit(): void {
    this.preferencesService.checkTheme();
  }
}
