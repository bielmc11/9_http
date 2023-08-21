import { Component, Input } from '@angular/core';
import { Post } from 'src/app/interface/post.interface';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent {
  @Input() miPost: Post |any 

}
