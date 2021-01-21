import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { Authors, Post } from 'src/app/Models/interfaces';
import { AuthorsService } from 'src/app/services/authors.service';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
import { FireStorageService } from 'src/app/services/fire-storage.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { uniqueid } from '../../shared/functions';
@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss'],
})
export class PostAddComponent implements OnInit {
  @ViewChild('editor') myEditor: any;
  filePath: string = null;
  downloadURL: any;
  profileUrl: any;
  data: string;
  post: Post;
  uploadProgress: number = null;
  id: string = null;
  isError: string = null;
  isLoading: boolean = false;
  listAuthors: Authors[];
  index: string = uniqueid();
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
    private storage: AngularFireStorage,
    private authors: AuthorsService,
    private Pservice: PostsService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.post = {
      title: '',
      body: '',
      author: '',
    };

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
  //! file add
  public onSubmit(form: NgForm) {
    this.isLoading = true;
    const p = {
      ...form.value,
      date: new Date(),
      image:
        this.link !== null && this.uploadProgress == 100 ? this.link : null,
      indexImg: this.index,
    };
    console.log(p);
    this.Pservice.addPost(p).subscribe(
      (data) => {
        this.id = data.id;
        // this.filePath = `/posts/${this.id}`;
        // this.uploadFile(event);
        console.log('data here', data);

        setTimeout(() => {
          if (this.link !== null && this.uploadProgress == 100) {
            this.isLoading = true;
            this.route.navigate(['/posts']);
          }
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
    this.filePath = `/posts/${this.index}`;
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
