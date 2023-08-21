import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, last, lastValueFrom } from 'rxjs';
import { Post } from '../interface/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  httpClinet = inject(HttpClient)
  private baseUrl: string = 'https://jsonplaceholder.typicode.com/posts/'

  constructor() { }

  getAll(): Promise<Post[]>{
    //ESTO LO PUEDO HACER EN FORMA DE PROMESAS O OBSERVABLES
    //PEDIR = GET / ENVIAR = POST / ACTUALIZAR = PUT / ELIMINAR = DELETE
    // PROMESA:
    return lastValueFrom(this.httpClinet.get<Post[]>(this.baseUrl) )
  }

  //LO QUE CAMBIA ENTRE ESTOS DOS SERA LA FORMA DE CONSUMIR 
  getById(id:number):Observable<Post> {
    //OBSERVABLE:
    return this.httpClinet.get<Post>(`${this.baseUrl}${id}`)
  }


  //esto todo son promesas
  getByidPromise(id:number): Promise<Post>{ //solo lo hago para tener un ejemplo de promesa y observable de id
    return lastValueFrom(this.httpClinet.get<Post>(`${this.baseUrl}${id}`))
  }

  
  //LO HARE PROMESA
  delete(id:number):Promise<any>{
    return lastValueFrom(this.httpClinet.delete<any>(`${this.baseUrl}${id}`)) 

  }

  insert(formvalue:any):Promise<Post>{
    return lastValueFrom(this.httpClinet.post<Post>(this.baseUrl, formvalue))
  }

  upDate(formvalue: Post): Promise<Post>{
    return lastValueFrom(this.httpClinet.put<Post>(`${this.baseUrl}${formvalue.id}`, formvalue))
  }
 
  
 
}
