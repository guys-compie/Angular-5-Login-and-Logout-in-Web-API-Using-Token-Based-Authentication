import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { Employer } from '../../shared/models/employer.model';
import { EmployerService } from '../../shared/services/employer.service';
import { Gender } from '../../shared/models/gender.enum';

@Component({
  selector: 'app-add-employer',
  templateUrl: './add.employer.component.html',
  styleUrls: ['./add.employer.component.css']
})
export class AddEmployerComponent implements OnInit {
  employer: Employer;
  //Gender: typeof Gender = Gender;
  //active: Gender;

  constructor(private employerService: EmployerService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.employer = {
      firstName: '',
      lastName: '',
      gender: Gender.Male,
      dateOfBirth: ''
    }
  }

  OnSubmit(form: NgForm) {
    this.employerService.addEmployer(form.value)
      .subscribe((data: any) => {
        if (data.succeeded == true) {
          this.resetForm(form);
          this.toastr.success('Employer addition successful');
        }
        else
          this.toastr.error(data.errors[0]);
      });
  }

}
