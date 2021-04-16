import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Song } from 'src/app/common/Song';
import { Album } from 'src/app/common/Track';
import { DeezerService } from 'src/app/services/deezer.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // MESSAGE FROM SERVICE
  song: Song;
  subscription: Subscription;
  imageUrl: string;
  audioUrl: string = '';

  // TRACKLIST
  trackId: number;
  myTracks: Album;
  trackIndex: number = 0;
  
  // THE REAL AUDIO
  @ViewChild('audioElement', { static: false }) audioElement:  ElementRef;
  private audio: HTMLMediaElement;

  //MUTE
  myCustomStyle: string = "color: white;";

  constructor(
    private messageService: MessageService,
    private deezerService: DeezerService
    ) {
  }

  ngOnInit(): void {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.myTracks = null; // TO INITIALIZE A NEW TRACK 
        this.trackIndex = 0; // TO INITIALIZE A NEW TRACK
        console.log(message)
        if(message != undefined){
          this.imageUrl = message.data.album.cover_medium;
          this.audioUrl = message.data.preview;
          this.trackId =  message.data.album.id;
          this.loadData();
        }
      } else {
        this.song = null;
      }
    });    
  }

   // ASING VALUES BEFORE RENDERING
    loadData(): void{
      this.audio = this.audioElement.nativeElement;
      if (this.audio) {
        this.audio.volume = 0.8; // 1 IS THE LOUDEST
        this.audio.autoplay = true;
      }
    }
  
  

  
  paused(): boolean {
    if (this.audio) { // IF AUDIO WAS ASIGNED TO LOCAL VARIABLE
      return this.audio.paused; // IT'S -FALSE- AT THE BEGINING
    } else {
      return true;
    }
  }

  public play(): void {
    if (this.audio) { // IF AUDIO WAS ASIGNED TO LOCAL VARIABLE
      if (this.audio.readyState >= 2) { // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
        this.audio.play();
      }
    }
  }

  public pause(): void {
    if (this.audio) { // IF AUDIO WAS ASIGNED TO LOCAL VARIABLE
      this.audio.pause();
    }
  }


  changeVolume(volume: number){
    if (this.audio) {
      if(volume == 0){
        if(this.myCustomStyle ==  "color: red;"){
          this.audio.volume = 1; // 1 IS THE LOUDEST
          this.myCustomStyle = "color: white;";
        }else{
          this.audio.volume = 0;
          this.myCustomStyle = "color: red;";
        }
      }else{
        this.audio.volume = volume; // 1 IS THE LOUDEST
        this.myCustomStyle = "color: white;";
      }
    }
  }

  

  // CHANGING TRACKS
  getTrack(keyword?: string): void{
    if(this.myTracks != null){
      console.log('ya hay tracks')
      this.playTrack(keyword);
    }else{
      console.log(this.trackId)
      this.deezerService.getTrack(this.trackId)
        .subscribe( data => {
          this.myTracks = data.tracks;
          this.playTrack('nuevo');
        })
    }
  }

  playTrack(nextOrNot?: string){

    console.log('nextOrNot:' + nextOrNot);
    if(nextOrNot == 'nuevo'){
      this.audioUrl = this.myTracks.data[0].preview;
      this.trackIndex = 0;
    }
    
    if(nextOrNot == 'siguiente'){
      if(this.myTracks.data[this.trackIndex + 1]){
        this.audioUrl = this.myTracks.data[this.trackIndex + 1].preview;
        this.trackIndex++;
      }
    }
    if(nextOrNot == 'atras'){
      if(this.myTracks.data[this.trackIndex - 1]){
        this.audioUrl = this.myTracks.data[this.trackIndex - 1].preview;
        this.trackIndex--;
      }
    }

    this.play();
    console.log('mp3:' + this.audioUrl);
    console.log('index: ' + this.trackIndex);
  }

}
