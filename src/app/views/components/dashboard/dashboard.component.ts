import { Component } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  blogcards:blogcard[];

  constructor() {

    this.blogcards=blogcards;
  }

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

}

export interface blogcard {
  title: string,
  subtitle: string,
  subtext: string,
  image: string
}

export const blogcards: blogcard[] = [

  {
      title: 'This is simple blog',
      subtitle: '2 comments, 1 Like',
      subtext: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'assets/images/bg/bg1.jpg'
  },
  {
      title: 'This is simple blog',
      subtitle: '2 comments, 1 Like',
      subtext: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'assets/images/bg/bg2.jpg'
  },
  {
      title: 'This is simple blog',
      subtitle: '2 comments, 1 Like',
      subtext: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'assets/images/bg/bg3.jpg'
  },
  {
      title: 'This is simple blog',
      subtitle: '2 comments, 1 Like',
      subtext: 'This is a wider card with supporting text below as a natural lead-in to additional content.',
      image: 'assets/images/bg/bg4.jpg'
  },

]
