import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Song } from 'src/app/common/Song';
import { MessageService } from 'src/app/services/message.service';
import { DeezerService } from '../../services/deezer.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  songs: Song[];
  keyword: string;
  background: string = '';

  constructor(
    private deezerService: DeezerService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( () => {
      this.doSearch();
    })
  }

  doSearch(): void {

    const hasKeyword: boolean = this.route.snapshot.paramMap.has('keyword');

    if(hasKeyword){
      this.keyword = this.route.snapshot.paramMap.get('keyword');
    }else{
      this.keyword = 'adele'; // ADELE BY DEFAULT
    }

    this.deezerService.getCatalogueBySongOrArtist(this.keyword)
    .subscribe( data => {
      this.songs = data.data;
      this.messageService.sendMessage(this.songs[0]);
      this.background = 
      `background-image: url(${data.data[0].artist.picture_big});`
    }, err => {
      console.log(err);
    })
  }

  sendSong(song: Song){
    this.messageService.sendMessage(song);
  }
}
