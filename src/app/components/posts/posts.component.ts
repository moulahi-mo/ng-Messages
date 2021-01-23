import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
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
import {
  trigger,
  state,
  transition,
  style,
  animate,
} from '@angular/animations';
import { SettingsService } from 'src/app/services/settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [
    trigger('intro', [
      state(
        'fadeIn',
        style({
          opacity: 0.2,
        })
      ),
      state(
        'fadeOut',
        style({
          opacity: 0.8,
        })
      ),
      transition('fadeIn <=>fadeOut', animate(1000)),
    ]),
  ],
})
export class PostsComponent implements OnInit, OnDestroy {
  @ViewChild('secret') secret: ElementRef;
  fade: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  isError: string = null;
  isLoading: boolean = false;
  isAuth: boolean;
  unsb: Subscription;
  userId: string = null;
  post: Post;
  indexDown: number = null;
  indexUp: number = null;
  posts: Post[] = [];
  isThumbUp: boolean = true;
  isThumbDown: boolean = false;
  bodyInner: string[];
  settingsAdd: boolean = false;
  settingsEdit: boolean = false;
  settingsDelete: boolean = false;
  close: boolean = false;

  constructor(
    private auth: AuthService,
    private Pservice: PostsService,
    private snackBar: MatSnackBar,
    private storage: AngularFireStorage,
    private set: SettingsService
  ) {}

  ngOnInit(): void {
    this.set.getSettings().subscribe();
    this.unsb = this.set.settingsEmit.subscribe((set) => {
      if (set.posts.length > 0) {
        this.settingsAdd = set.posts.includes('Adding posts');
        this.settingsEdit = set.posts.includes('Editing posts');
        this.settingsDelete = set.posts.includes('Deleting posts');
      }
    });

    this.auth.authState().subscribe(
      (user) => {
        if (user) {
          this.userId = user.uid;
          console.log('userid', this.userId);
          this.isAuth = true;
          this.fetchPosts();
          this.fade = true;
          //* init posts
        } else {
          this.isAuth = false;
          this.fade = true;
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
        art.title.toLowerCase().trim().includes(val) ||
        art.author.toLowerCase().trim().includes(val) ||
        art.body.toLowerCase().trim().includes(val)
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
          const filePath = `/posts/${this.userId}/${post.indexImg}`;
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

  ngOnDestroy() {
    this.unsb.unsubscribe();
  }
}
