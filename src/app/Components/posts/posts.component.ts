import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { getPost, searchPost } from 'src/app/store/crud.actions';
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
  inputValor = [];
  obj =[]
  constructor(private store : Store) {
    this.obj = [{
      title: ''
    }]
  }
  //Selects
  @Select(PostsStateModel.getPosts) posts$: Observable<Posts[]>;
  @Select(PostsStateModel.searchPost) postS$: Observable<any>;
  ngOnInit(): void {
    this.store.dispatch(new getPost());
    this.posts$.subscribe((res) => {
      this.posts = res;
      this.inputValor = res;
      console.log(this.posts)
    })
  }
  //Función eliminar posts
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
  //Función buscar posts por titulo
  searchPost(title:any){
    console.log("title " , title)
    let swt = false;
    this.inputValor.forEach(element => {
      if(element.title === title){
        const content = element
        console.log(content)
        this.posts = this.posts.filter(x=> x.title == element.title)
        swt = true
        return true
      }
    });

    if(!swt){
      Swal.fire("dato no encontrado")
    }

    this.obj = []
  }
}
