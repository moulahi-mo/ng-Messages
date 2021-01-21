import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Post } from 'src/app/Models/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @ViewChild('secret') secret: ElementRef;
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isError: string = null;
  isLoading: boolean = false;
  isAuth: boolean;
  post: Post;
  indexDown: number = null;
  indexUp: number = null;
  posts: Post[] = [];
  isThumbUp: boolean = true;
  isThumbDown: boolean = false;
  bodyInner: string[];
  constructor(
    private auth: AuthService,
    private Pservice: PostsService,
    private snackBar: MatSnackBar,
    private storage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.auth.authState().subscribe(
      (user) => {
        if (user) {
          this.isAuth = true;
          this.fetchPosts();
          //* init posts
        } else {
          this.isAuth = false;
        }
      },
      (err) => (this.isError = err.message)
    );
  }

  //! get posts
  public fetchPosts() {
    this.Pservice.getPosts().subscribe(
      (data) => {
        console.log(data);
        this.posts = data;
        this.bodyInner = this.posts.map((item) => {
          const bd = document.createElement('p');
          bd.innerHTML += item.body;

          return bd.textContent;
        });

        console.log(this.bodyInner);
      },
      (err) => (this.isError = err.message)
    );
  }
  //! filtr search
  public filtring(val: string) {
    this.posts.forEach((art, index) => {
      if (
        art.title.toLowerCase().trimEnd().includes(val) ||
        art.author.toLowerCase().trimEnd().includes(val) ||
        art.body.toLowerCase().trimEnd().includes(val)
      ) {
        document.getElementById(index.toString()).classList.remove('d-none');
        console.log('is here');
      } else {
        document.getElementById(`${index}`).classList.add('d-none');
        console.log('is Not here');
      }
    });
  }

  //!  on delete
  public onDelete(id: string, post: Post) {
    if (confirm('Are you sure ?')) {
      this.Pservice.deletePost(id)
        .then(() => {
          const filePath = `/posts/${post.indexImg}`;
          this.storage
            .ref(filePath)
            .delete()
            .subscribe((data) => {
              console.log(data, 'image deleted alsso');
            });
          //* snackbar
          this.snackBar.open('post deleted ..', 'undo', {
            duration: 4000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        })
        .catch((err) => (this.isError = err.message));
    }
  }

  //! on thumb
  public onThumbDown(i: number) {
    this.isThumbDown = !this.isThumbDown;
    this.indexDown = i;
  }
  public onThumbUp(i: number) {
    this.isThumbUp = !this.isThumbUp;
    this.indexUp = i;
  }
}
