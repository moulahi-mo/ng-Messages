import { Component, OnDestroy, OnInit } from '@angular/core';
import { timeStamp } from 'console';
import { Subscription } from 'rxjs';
import { WheatherService } from 'src/app/services/wheather.service';

@Component({
  selector: 'app-wheather',
  templateUrl: './wheather.component.html',
  styleUrls: ['./wheather.component.scss'],
})
export class WheatherComponent implements OnInit, OnDestroy {
  unsb: Subscription;
  wheatherIcon: string = `http://openweathermap.org/img/wn/${'02n'}@2x.png`;
  wheather: {
    temp: string;
    humidity: string;
    description: string;
    icon: string;
  } = {
    temp: null,
    humidity: null,
    description: null,
    icon: null,
  };
  constructor(private wt: WheatherService) {}

  ngOnInit(): void {
    this.wt.getIp();

    this.unsb = this.wt.emitWheather.subscribe((data) => {
      console.log(data);
      this.wheather = data;
    });
  }
  ngOnDestroy() {
    this.unsb.unsubscribe();
  }
}
