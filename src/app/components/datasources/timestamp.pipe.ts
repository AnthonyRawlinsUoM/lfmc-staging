import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'timestamp'})
export class TimestampPipe implements PipeTransform {
  transform(seconds_since_epoch: number): Date {
    let date = new Date(seconds_since_epoch);
    return date;
  }
}
