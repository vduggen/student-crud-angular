import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  idStudent: string;
  studentInfo: object;

  constructor(
    private route: ActivatedRoute,
    private StudentService: AlunosService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idStudent = params.get('id');
    });

    this.getStudentInfo();
  }

  getStudentInfo(): void {
    this.StudentService.getSpecificStudent(this.idStudent).subscribe(data => {
      this.studentInfo = data;
      this.studentInfo["media"] = this.isApproved(data["nota1"], data["nota2"], data["nota3"]);
    });
  }

  isApproved(nota1: number, nota2: number, nota3: number) {
    let resultSum = nota1 + nota2 + nota3 / 3;
    return Math.round(resultSum);
  }
}
