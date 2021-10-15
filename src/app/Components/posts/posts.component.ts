import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { getPost } from 'src/app/store/crud.actions';
import { Posts } from 'src/app/store/crud.models';
import { PostsStateModel } from 'src/app/store/crud.states';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts = [];
  constructor(private store : Store) {}
  //Selects
  @Select(PostsStateModel.getPosts) posts$: Observable<Posts[]>;
  ngOnInit(): void {
    this.store.dispatch(new getPost());
    this.posts$.subscribe((res) => {
      this.posts = res;
      console.log(this.posts)
    })
  }

  deletePosts(id:any) {
    Swal.fire({
      title: 'Seguro que desea eliminar el post?',
      text: "Ya no podrás recuperar el post!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!'
    }).then((result) => {

      if (result.isConfirmed) {
        let content = this.posts.filter((x)=> x.id !== id);
        this.posts = content;
        Swal.fire(
          'Eliminado!',
          'EL post ha sido eliminado.',
          'success'
        )
      }
    })
  }
}
