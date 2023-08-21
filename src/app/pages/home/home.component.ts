import { Component, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Post } from 'src/app/interface/post.interface';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  arrPost: Post[] = []
  postsServicio = inject(PostsService)

  /* ngOnInit():void{
    //OPCION 1 PARA GESTIONAR LA PROMESA
    this.postsServicio.getAll()
      .then((response)=> {
        this.arrPost = response
      } )
      .catch((error) =>{
        console.log(error)
      })
    } */

    //OPCIÓN 2
     async ngOnInit():Promise<void>{
      try{
        this.arrPost = await this.postsServicio.getAll()
      }catch(error){
        console.log(error)
      }
    } 

  

}
