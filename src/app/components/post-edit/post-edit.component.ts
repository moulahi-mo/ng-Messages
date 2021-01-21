import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { Authors, Post } from 'src/app/Models/interfaces';
import { AuthorsService } from 'src/app/services/authors.service';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { uniqueid } from 'src/app/shared/functions';
import { finalize } from 'rxjs/operators';
let id: string = null;
@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
})
export class PostEditComponent implements OnInit {
  @ViewChild('editor') myEditor: any;
  @ViewChild('postForm') editForm: NgForm;
  data: string;
  post: Post;
  index: string = null;
  isError: string = null;
  isLoading: boolean = false;
  listAuthors: Authors[];
  uploadProgress: number = null;
  indexImage: string = uniqueid();
  filePath: string = null;
  downloadURL: any;
  link: string = null;
  isUploading: boolean = false;
  public Editor = ClassicEditor;
  public config = {
    placeholder: 'Create new post...',
  };
  public model = {
    editorData: '',
  };
  constructor(
    private authors: AuthorsService,
    private Pservice: PostsService,
    private storage: AngularFireStorage,
    private activated: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    id = this.activated.snapshot.paramMap.get('id');
    this.post = {
      title: '',
      body: '',
      author: '',
      image: null,
      indexImg: null,
    };

    this.Pservice.getPostById(id).subscribe((data) => {
      this.post = data;

      this.model.editorData = this.post.body;
    });
    this.authors.fetchAuthors().subscribe((data) => {
      console.log(data);
      this.listAuthors = data.map((item) => {
        return { name: item.name };
      });
      console.log(this.listAuthors);
    });
  }

  public onChange({ editor }: ChangeEvent) {
    this.data = editor.getData();
    console.log(this.data);
  }

  public onSubmit(form: NgForm) {
    this.isLoading = true;
    const p = {
      ...form.value,
      date: new Date(),
      id: id,
      image:
        this.link !== null && this.uploadProgress == 100
          ? this.link
          : this.post.image,
    };
    console.log(p);
    this.Pservice.updatePost(p).subscribe(
      () => {
        setTimeout(() => {
          // if (this.link !== null && this.uploadProgress == 100) {
          this.isLoading = false;
          this.route.navigate(['/posts']);
          // }
        }, 2000);

        form.reset();
      },
      (err) => (this.isError = err.message)
    );
  }

  //! file upload

  public uploadFile(e: Event) {
    this.isUploading = true;
    console.log(e);

    const file = e.target.files[0];
    this.filePath = `/posts/${this.post.indexImg}`;
    const fileRef = this.storage.ref(this.filePath);
    if (this.filePath) {
      const task = this.storage.upload(this.filePath, file);
      task

        .snapshotChanges()
        .pipe(finalize(() => (this.downloadURL = fileRef.getDownloadURL())))
        .subscribe(
          (t) => {
            fileRef.getDownloadURL().subscribe((link) => {
              this.link = link;
              console.log(link, 'new one to check');
            });
            this.link = this.downloadURL;
            console.log('Down', this.downloadURL);
          },
          (err) => (this.isError = err.message),
          () => {
            // console.log('final link', this.downloadURL);
          }
        );
      //! percentage
      task.percentageChanges().subscribe((data) => {
        this.uploadProgress = data;
        console.log(data);
        this.uploadProgress == 100 ? (this.isUploading = false) : '';
      });
    }
  }
}
