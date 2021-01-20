import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { Authors, Post } from 'src/app/Models/interfaces';
import { AuthorsService } from 'src/app/services/authors.service';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
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

    private activated: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    id = this.activated.snapshot.paramMap.get('id');
    this.post = {
      title: '',
      body: '',
      author: '',
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
    const p = { ...form.value, date: new Date(), id: id };
    console.log(p);
    this.Pservice.updatePost(p).subscribe(
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
