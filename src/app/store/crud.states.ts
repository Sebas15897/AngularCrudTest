import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ApiService } from "../Services/api/api.service";
import { deletePost, getPost, searchPost } from './crud.actions';
import { Posts } from "./crud.models";
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@State<Posts>({
    name: 'posts',
    defaults: {
        posts: [],
        postsD: [{
            id: ''
        }],
        postsS: [{
            id: ''
        }]
    }
})
@Injectable()
export class PostsStateModel {
    constructor(private htpp: ApiService) {}
    //Selector get
    @Selector()
    static getPosts(state : Posts) {
        return state.posts;
    };
    //Selector detalle
    @Selector()
    static deletePost(state : Posts) {
        return state.posts;
    }
    //Selector busqueda
    @Selector()
    static searchPost(state : Posts) {
        return state.posts
    }
    //Acción Obtener posts
    @Action(getPost)
    getPost({getState, setState}: StateContext<Posts>) {
        return this.htpp.getPost().pipe(
            tap(res => {
                const state = getState();
                setState({
                    ...state,
                    posts : res
                })
            })
        )
    }
    //Acción eliminar
    @Action(deletePost)
    deletePost({getState, setState}: StateContext<Posts>, { payload }: deletePost) {
        return this.htpp.deletePost(payload).pipe(
            tap((res) => {
                const state = getState();
                const ids = {
                    id: res.id
                }
                setState({
                    ...state,
                    postsD: ids
                })
            })
        )
    }
    //Acción buscar
    @Action(searchPost)
    searchPost({getState, setState}: StateContext<Posts>, { payload }: searchPost) {
        return this.htpp.searchPost(payload).pipe(
            tap((res) =>{
                const state = getState();
                const serch = res.title
                console.log("payload" + payload)
                console.log("res" + res)
                setState({
                    ...state,
                    postsS : serch
                })
            })
        )
    }
}