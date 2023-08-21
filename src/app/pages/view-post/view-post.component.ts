import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interface/post.interface';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent {
  activateRoute = inject(ActivatedRoute);
  postService = inject(PostsService)
  onePost: Post | any;
  router = inject(Router)


  //OPCION 1 OBSERVABLES
  ngOnInit(){
    this.activateRoute.params.subscribe((params:any)=>{
      let id = Number(params.idpost);
      //RECORDAD QUE ESTO ES UN OBSERVABLE
      //no una promesa
      this.onePost = this.postService.getById(id).subscribe((response)=>{
        this.onePost = response
      })
    })
  }


  //LO MISMO PEROC ON PROMESA
   /* ngOnInit2():void{
    this.activateRoute.params.subscribe( async (params:any):Promise<void> =>{
      let id = Number(params.idpost);
      try{
        this.onePost = await this.postService.getByidPromise(id)

      }catch(error){
        console.log(error)
      }
    })
  } */
 

  async deletePost(id:number):Promise<void>{
    //AQUI DECIDO ELIMINO MEDIANTE PROMESA O OBERVABLE (como quiera)
    //LO HAREMOS CON PROMESA
    alert('estas seguro de borrar este post')
    let response = await this.postService.delete(id);
    console.log(response)
    if (response){
      this.router.navigate(['/home'])
       //lo podria quitar
    }
  }


  //ESTO ES LO MISMO PERO SERIA MUY LENTO
  /* async deletePost(id:number):Promise<void>{
    //AQUI DECIDO ELIMINO MEDIANTE PROMESA O OBERVABLE (como quiera)
    //LO HAREMOS CON PROMESA
    alert('estas seguro de borrar este post')
    try{
      let response = await this.postService.delete(id);
      console.log(response)
      this.router.navigate(['/home'])

    }catch(error){
      console.log(error)
    }
       //lo podria quitar
    } */

  
}
