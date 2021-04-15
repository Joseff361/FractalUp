import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/common/Song';
import { DeezerService } from '../../services/deezer.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  songs: Song[];

  constructor(
    private deezerService: DeezerService
  ) { }

  ngOnInit(): void {
    
  }

  doSearch(keyword: string): void {
    this.deezerService.getCatalogueBySongOrArtist(keyword)
    .subscribe( data => {
      this.songs = data.data;
      console.log(this.songs);
    }, err => {
      console.log(err);
    })
  }
}
