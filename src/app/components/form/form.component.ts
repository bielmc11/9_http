import { Component, inject } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/service/posts.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  postForm:  FormGroup;
  postService = inject(PostsService)
  router = inject(Router)
  activateRoute = inject(ActivatedRoute)

  constructor(){
    this.postForm = new FormGroup({
      title: new FormControl('',[
        Validators.required
      ]),
      body:new FormControl('',[]),
      userId: new FormControl('',[]),
      

    },[])
  }

  ngOnInit():void{
    //la diferencia entre el formulario de registro y el de actulizar es que el de actualizar recibe id
    this.activateRoute.params.subscribe( async (params:any)=>{
      let id = Number(params.idpost)
      //Cuando recibva response quiero rellenar el formulario
      if(!isNaN(id)){
        let response =  await this.postService.getByidPromise(id)
        //para llenar el fomulario tengo que hacer una peticion al servivio con getbyId y traerme todos los datos del post
        this.postForm = new FormGroup({
          //pongo el id porque antes no me hacia falta (este no se verá pero se enviará)
          id: new FormControl(response.id, []),
          title: new FormControl(response.title,[]),
          body:new FormControl(response.body,[]),
          userId: new FormControl(response.userId,[]),
        },[])
      }
    })
  }

  

  async getDataForm():Promise<void>{
    if(this.postForm.value.id){
      //actualizando
      let response = await this.postService.upDate(this.postForm.value)
      if(response){
        alert('objeto aztualizado correctamente')
        this.router.navigate(['/home'])
      }else{
        alert('error de actualizacion')
      }
    }else{
      //INSERTANDO
      let response = await this.postService.insert(this.postForm.value)
      if(response.id){
        alert('objeto insertado correctamente')
        this.router.navigate(['/home'])
        this.postForm.reset()
      }else{
        alert('ha habido un error intentealo de nuevo')
      }
    }

  }

  
}
