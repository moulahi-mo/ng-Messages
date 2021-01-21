import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class WheatherService {
  emitWheather = new Subject<any>();
  city: string = null;

  whClient: object = {};
  IpUrl: string = 'https://api.ipify.org/?format=json';
  constructor(private http: HttpClient) {}

  public getIp() {
    this.http.get<any>(this.IpUrl).subscribe((data) => {
      this.getCityInfos(data.ip)
        .pipe(
          map((data) => {
            console.log(data);
            return {
              ip: data.ip,
              city: data.city,
            };
          })
        )
        .subscribe((data) => {
          this.getCityWeather(
            `https://api.openweathermap.org/data/2.5/weather?q=${data.city}&units=metric&appid=995cc6f35016835b933f7d52a016e299`
          )
            .pipe(
              map((data) => {
                return {
                  temp: data.main.temp,
                  humidity: data.main.humidity,
                  description: data.weather[0].description,
                  icon: data.weather[0].icon,
                };
              })
            )
            .subscribe((data) => {
              this.emitWheather.next(data);
            });
        });
    });
  }
  public getCityInfos(ip: string): Observable<any> {
    return this.http.get<any>(`https://ipapi.co/${ip}/json`);
  }

  public getCityWeather(link: string): Observable<any> {
    return this.http.get<any>(link);
  }
}
