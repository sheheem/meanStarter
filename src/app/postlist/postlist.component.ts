import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css'],
})
export class PostlistComponent implements OnInit, OnDestroy {
  // @Input() posts = [
  //   // {
  //   //   title: 'First Post',
  //   //   content: 'First Post Content',
  //   // },
  //   // {
  //   //   title: 'Second Post',
  //   //   content: 'Second Post Content',
  //   // },
  //   // {
  //   //   title: 'Third Post',
  //   //   content: 'Third Post Content',
  //   // },
  // ];

posts: Post[] = [];
private postsSub: Subscription;

  constructor(public postService: PostService) {

  }

  ngOnInit(){
      this.postService.getPosts()
      this.postsSub = this.postService.getPostUpdateListener().subscribe((posts: Post[]) => {
         this.posts = posts;
      })
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy() {
      this.postsSub.unsubscribe(); 
  }
}
