import {Component, OnInit} from '@angular/core';
import {Employe} from "../../../core/models/employe.models";
import {EmployeService} from "../../../core/services/employe.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent  implements OnInit {
  breadCrumbItems!: Array<{}>;
  employes: Employe[] = [];
  loading = true;
  submitted = false;
  selectedEmploye: Employe | null = null;
  modalRef: any;
  employeForm!: FormGroup;
  deleteId: number | null = null;

  constructor(
      private employeService: EmployeService,
      private fb: FormBuilder,
      private modalService: NgbModal,
      ) {
    this.employeForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      matricule: ['', Validators.required],
      telephone: ['', Validators.required],
      age: ['', Validators.required],
      idService: ['', Validators.required],

    });

  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      {label: 'Pages'},
      {label: 'Employes', active: true}
    ];

    this.loadEmployes();

  }

  loadEmployes() {
    this.employeService.getEmployes().subscribe({
      next: (data) => {
        console.log('Employes recu:', data);
        this.employes = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des employés', err);
      }
    });
  }

  openAddModal(content: any) {
    this.submitted = false;
    this.selectedEmploye = null;
    this.employeForm.reset();
    this.modalRef = this.modalService.open(content, { size: 'md', centered: true });
  }

  openEditModal(content: any, emp: Employe) {
    this.submitted = false;
    this.selectedEmploye = emp;
    this.employeForm.patchValue(emp);
    this.modalRef = this.modalService.open(content, { size: 'md', centered: true });
  }

  saveEmploye() {
    this.submitted = true;
    if (this.employeForm.valid) {
      if (this.selectedEmploye) {
        this.employeService
            .updateEmploye(this.selectedEmploye.id!, this.employeForm.value)
            .subscribe(() => {
              this.loadEmployes();
              this.modalRef.close();
              this.selectedEmploye = null;
              this.employeForm.reset();
            });
      } else {
        this.employeService
            .addEmploye(this.employeForm.value)
            .subscribe(() => {
              this.loadEmployes();
              this.modalRef.close();
              this.employeForm.reset();
            });
      }
    }
  }

  openDeleteModal(content: any, emp: Employe) {
    this.selectedEmploye = emp;
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  deleteEmploye() {
    if (this.selectedEmploye && this.selectedEmploye.id) {
      this.employeService.deleteEmploye(this.selectedEmploye.id).subscribe({
        next: () => {
          this.loadEmployes();
          this.modalRef.close();
          this.selectedEmploye = null;
        },
        error: (err) => {
          alert('Erreur lors de la suppression');
          console.error(err);
        }
      });
    }
  }
}
