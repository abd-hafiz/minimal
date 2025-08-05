import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeService } from '../../../core/services/employe.service';
import { Employe } from '../../../core/models/employe.models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent  implements OnInit {
  // employeForm!: FormGroup;
  // employeId: number | null = null;
  //
  // constructor(
  //     private fb: FormBuilder,
  //     private employeService: EmployeService,
  //     private router: Router,
  //     private route: ActivatedRoute
  // ){
  //   this.employeForm = this.fb.group({
  //     nom: ['', Validators.required],
  //     prenom: ['', Validators.required],
  //     matricule: ['', Validators.required],
  //     telephone: ['', Validators.required],
  //     age: ['', Validators.required],
  //     idService: ['', Validators.required],
  //
  //   });
  // }
  //
  ngOnInit() {
  //   this.employeId = this.route.snapshot.params['id'];
  //   if (this.employeId) {
  //     this.employeService.getEmployeById(this.employeId).subscribe(employe => {
  //       console.log('Employe recuperer:', employe);
  //       this.employeForm.patchValue(employe);
  //     });
  //   }
  // }
  //
  // onSubmit() {
  //   if (this.employeForm.invalid) return;
  //   const employe: Employe = {...this.employeForm.value, id: this.employeId};
  //   if (this.employeId) {
  //     this.employeService.updateEmploye(employe).subscribe(() => {
  //       alert('Employé mis à jour avec succès');
  //       this.router.navigate(['employes']);
  //     });
  //   } else {
  //     this.employeService.createEmploye(employe).subscribe(() => {
  //       alert('Employé créé avec succès');
  //       this.router.navigate(['employes']);
  //     });
  //   }
   }


}
