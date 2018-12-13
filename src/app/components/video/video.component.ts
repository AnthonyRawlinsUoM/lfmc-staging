import {Component, OnInit} from '@angular/core';
import {TimeseriesService} from '../../services/timeseries.service';
import {LFMCResponseType} from '../charting/charting.component';

@Component({
  selector: 'lfmc-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  preloadDimmed: boolean;
  videoSource: any;
  query: any;
  hasVideoQuery;

  constructor(private tss: TimeseriesService) {
  }

  ngOnInit() {
    this.preloadDimmed = true;
    this.hasVideoQuery = false;
  }

  getVideo(json: any) {
    // this.query = json;
    // this.query.weighted = true,
    // this.query.response_as = LFMCResponseType.MP4
    // console.log(this.query);
    // this.hasVideoQuery = true;
    //
    // return this.tss.mpgAPI(
    //   '/fuel.mp4', this.query).subscribe(m => {
    //   console.log('Got video response');
    //   this.videoSource = m;
    //   this.preloadDimmed = false;
    // });
    return '';
  }

}
