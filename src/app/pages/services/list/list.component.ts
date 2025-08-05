import { Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EmployeService} from "../../../core/services/employe.service";
import Swal from "sweetalert2";
import {ServicesService} from "../services.service";
import {Services} from "../services.models";
import {DirectionService} from "../../direction/direction.service";
import {Employe} from "../../../core/models/employe.models";
import {Direction} from "../../direction/direction.models";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    breadCrumbItems!: Array<{}>;
    services: Services[] =[];
    servicesForm: FormGroup;
    submitted = false;
    selectedServices: Services | null = null;
    modalRef: any;
    deleteId: number | null = null;
    employes: Employe[] = [];
    directions: Direction[] = [];


    constructor(
        private modalService: NgbModal,
        private fb: FormBuilder,
        private servicesService: ServicesService,
        private employeService: EmployeService,
        private directionService: DirectionService,
    ) {
      this.servicesForm = this.fb.group({
        nom: ['', Validators.required],
        idDirection: ['', Validators.required],
        idChefService: [null],
      });

    }

    ngOnInit(): void {
      this.breadCrumbItems = [
        { label: 'Pages' },
        { label: 'Services', active: true }
      ];
        this.employeService.getEmployes().subscribe(employes => {
            this.employes = employes;
        });
        this.directionService.getDirections().subscribe(directions => {
            this.directions = directions;
        });
      this.loadServices()
    }

    loadServices(): void {
        this.servicesService.getAllServices().subscribe({
            next: (data) => {
                console.log('Services recuperer:', data);
                this.services = data;
            },
            error: (err) => {
                console.error('Erreur chargement services', err);
            }
        });
    }

    openAddModal(content: any) {
        this.submitted = false;
        this.selectedServices = null;
        this.servicesForm.reset();
        this.modalRef = this.modalService.open(content, { size: 'md', centered: true });
    }

    openEditModal(content: any, services: Services) {
      this.submitted = false;
      this.selectedServices = services;
      this.servicesForm.patchValue(services);
      this.modalRef = this.modalService.open(content, { size: 'md', centered: true });
    }

    saveServices() {
      this.submitted = true;
      if (this.servicesForm.valid) {
        if (this.selectedServices) {
          this.servicesService
              .updateService(this.selectedServices.id!, this.servicesForm.value)
              .subscribe(() => {
                this.loadServices();
                this.modalRef.close();
                Swal.fire({
                  icon: 'success',
                  title: 'Modification réussie',
                  text: 'Services modifiée avec succès !',
                  confirmButtonColor: '#239eba',
                });
                this.selectedServices = null;
                this.servicesForm.reset();
              });
        } else {
          this.servicesService
              .createService(this.servicesForm.value)
              .subscribe(() => {
                this.loadServices();
                this.modalRef.close();
                Swal.fire({
                  icon: 'success',
                  title: 'Ajout réussi',
                  text: 'Services ajoutée avec succès !',
                  confirmButtonColor: '#239eba',
                });
                this.servicesForm.reset();
              });
        }
      }
    }

    confirmDelete(content: any, id: number | undefined) {
        if (id !== undefined) {
            this.deleteId = id;
            this.modalRef = this.modalService.open(content, { centered: true });
        }
    }

    deleteServices() {
      if(this.deleteId){
        this.servicesService.deleteService(this.deleteId).subscribe({
          next: () => {
            this.loadServices();
            this.modalService.dismissAll();
            Swal.fire({
              icon: 'success',
              title: 'Suppression réussie',
              text: 'Services supprimée avec succès !',
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
              confirmButtonColor: '#d33',
            });
            console.error(err);
          }
        });
      }
    }


}
