export class Deezer{
    data: Song[];
    next: string;
    total: Number;
}

export class Song{
    duration: number;
    explicit_content_cover: number;
    explicit_content_lyrics: number;
    explicit_lyrics: Boolean;
    id:  number;
    link: string;
    md5_image: string;
    preview: string;
    rank:  number;
    readable: Boolean;
    title: string;
    title_short: string;
    title_version: string;
    type: string;
    album: Album;
    artist: Artist;
}

class Album{
    cover: string;
    cover_big: string;
    cover_medium: string;
    cover_small: string;
    cover_xl: string;
    id: number;
    md5_image: string;
    title: string;
    tracklist: string;
    type: string;
}


class Artist{
    id: number;
    link: string;
    name: string;
    picture: string;
    picture_big: string;
    picture_medium: string;
    picture_small: string;
    picture_xl: string;
    tracklist: string;
    type: string;
}