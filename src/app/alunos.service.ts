import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Student from './student';


@Injectable({
  providedIn: 'root'
})
export class AlunosService {
  baseURL: string = 'https://5f6e6265adc24200166e080e.mockapi.io/alunos';

  constructor(private http: HttpClient) { }

  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.baseURL);
  }

  getSpecificStudent(idStudent: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseURL}/${idStudent}`);
  }
}
