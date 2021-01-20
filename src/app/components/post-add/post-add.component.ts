import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { Authors, Post } from 'src/app/Models/interfaces';
import { AuthorsService } from 'src/app/services/authors.service';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.scss'],
})
export class PostAddComponent implements OnInit {
  @ViewChild('editor') myEditor: any;
  data: string;
  post: Post;
  isError: string = null;
  isLoading: boolean = false;
  listAuthors: Authors[];
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

  public onSubmit(form: NgForm) {
    const p = { ...form.value, date: new Date() };
    console.log(p);
    this.Pservice.addPost(p).subscribe(
      () => {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
          this.route.navigate(['/posts']);
        }, 2000);

        form.reset();
      },
      (err) => (this.isError = err.message)
    );
  }
}
