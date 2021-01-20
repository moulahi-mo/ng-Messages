import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/Models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  isError: string = null;
  isLoading: boolean = false;
  isAuth: boolean;
  post: Post;
  posts: Post[];
  constructor(private auth: AuthService, private Pservice: PostsService) {}

  ngOnInit(): void {
    this.auth.authState().subscribe((user) => {
      if (user) {
        this.isAuth = true;
        this.fetchPosts();
      } else {
        this.isAuth = false;
      }
    });
  }

  public fetchPosts() {
    this.Pservice.getPosts().subscribe((data) => {
      console.log(data);
      this.posts = data;
    });
  }

  public filtring(val: string) {
    // this.posts.forEach((art, index) => {
    //   if (
    //     art.content.toLowerCase().trimEnd().includes(val) ||
    //     art.author.toLowerCase().trimEnd().includes(val) ||
    //     art.title.toLowerCase().trimEnd().includes(val) ||
    //     art.publishedAt.toString().toLowerCase().trimEnd().includes(val)
    //   ) {
    //     document.getElementById(index.toString()).classList.remove('d-none');
    //     console.log('is here');
    //   } else {
    //     document.getElementById(`${index}`).classList.add('d-none');
    //     console.log('is Not here');
    //   }
    // });
  }
}
