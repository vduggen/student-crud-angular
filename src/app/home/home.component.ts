import { Component, OnInit } from '@angular/core';
import { AlunosService } from '../alunos.service';
import Student from '../student';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  students: Student[] = [];
  approved: object[] = [];
  disapproved: any[] = [];
  loading: boolean = true;

  constructor(private alunos: AlunosService) { }

  ngOnInit(): void {
    this.getAllStudents();
  }

  getAllStudents() {
    this.alunos.getAllStudents().subscribe(data => {
      this.students = data;

      this.students.forEach(student => {
        let result = this.isApproved(student.nota1, student.nota2, student.nota3);
        student['media'] = Math.round(result)

        if (result === 300) {
          this.approved.push(student);
        } else {
          this.disapproved.push(student);
        }
      })

      this.loading = false;
    });
  }

  isApproved(nota1: number, nota2: number, nota3: number) {
    let resultSum = nota1 + nota2 + nota3 / 3;
    return resultSum;
  }
}
