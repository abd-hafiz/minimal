import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Direction} from "../direction.models";
import { DirectionService } from "../direction.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
import {EmployeService} from "../../../core/services/employe.service";
import {Employe} from "../../../core/models/employe.models";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  directions: Direction[] = [];
  directionForm: FormGroup;
  submitted = false;
  selectedDirection: Direction | null = null;
  modalRef: any;
  deleteId: number | null = null;
  employes: Employe[] = [];

  constructor(
      private modalService: NgbModal,
      private fb: FormBuilder,
      private directionService: DirectionService,
      private employeService: EmployeService,
  ) {
    this.directionForm = this.fb.group({
      nom: ['', Validators.required],
      chefDirectionId: [null]
    });
  }
    ngOnInit(): void {
        this.breadCrumbItems = [
        { label: 'Pages' },
        { label: 'Directions', active: true }
        ];
        this.employeService.getEmployes().subscribe(employes =>{
            this.employes = employes;
        });

        this.loadDirections();
    }

    loadDirections(): void {
        this.directionService.getDirections().subscribe({
            next: (data) => {
                console.log('Directions recus:', data);
                this.directions = data;
            },
            error: (err) => {
                console.error('Erreur lors du chargement des directions', err);
            }
        });
    }
  openAddModal(content: any) {
    this.submitted = false;
    this.selectedDirection = null;
    this.directionForm.reset();
    this.modalRef = this.modalService.open(content, { size: 'md', centered: true });
  }

  openEditModal(content: any, direction: Direction) {
    this.submitted = false;
    this.selectedDirection = direction;
    this.directionForm.patchValue(direction);
    this.modalRef = this.modalService.open(content, { size: 'md', centered: true });
  }

  saveDirection() {
    this.submitted = true;
    if (this.directionForm.valid) {
      if (this.selectedDirection) {
        this.directionService
            .updateDirection(this.selectedDirection.id!, this.directionForm.value)
            .subscribe(() => {
              this.loadDirections();
              this.modalRef.close();
              Swal.fire({
                icon: 'success',
                title: 'Modification réussie',
                text: 'Direction modifiée avec succès !',
                confirmButtonColor: '#239eba',
              });
              this.selectedDirection = null;
              this.directionForm.reset();
            });
      } else {
        this.directionService
            .createDirection(this.directionForm.value)
            .subscribe(() => {
              this.loadDirections();
              this.modalRef.close();
              Swal.fire({
                icon: 'success',
                title: 'Ajout réussi',
                text: 'Direction ajoutée avec succès !',
                confirmButtonColor: '#239eba',
              });
              this.directionForm.reset();
            });
      }
    }
  }

  confirmDelete(content: any, id: number | undefined) {
    if (id !== undefined) {
      this.deleteId = id;
      this.modalService.open(content, { centered: true });
    }
  }

  deleteDirection() {
    if (this.deleteId) {
      this.directionService.deleteDirection(this.deleteId).subscribe({
        next: () => {
          this.loadDirections();
          this.modalService.dismissAll();
          Swal.fire({
            icon: 'success',
            title: 'Suppression réussie',
            text: 'Direction supprimée avec succès !',
            confirmButtonColor: '#239eba',
          });
          this.deleteId = null;
        },
        error: (err) => {
          this.modalService.dismissAll();
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'La suppression a échoué !',
            confirmButtonColor: '#e74c3c',
          });
          console.error(err);
        }
      });
    }
  }

}
