import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from "../role.models";
import { RoleService } from "../role.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  roles: Role[] = [];
  roleForm: FormGroup;
  submitted = false;
  selectedRole: Role | null = null;
  modalRef: any;
  deleteId: number | null = null;

    constructor(
        private modalService: NgbModal,
        private fb: FormBuilder,
        private roleService: RoleService
    ) {
        this.roleForm = this.fb.group({
        role: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.breadCrumbItems = [
            { label: 'Pages' },
            { label: 'Roles', active: true }
        ];
        this.loadRoles();
    }

    loadRoles(): void {
        this.roleService.getRoles().subscribe({
            next: (data) => {
                console.log('Roles recuperer:', data);
                this.roles = data;
            },
            error: (err) => {
                console.error('Erreur recuperation roles', err);
            }
        });
    }

    openAddModal(content: any ): void {
      this.submitted = false;
      this.selectedRole = null;
      this.roleForm.reset();
      this.modalRef = this.modalService.open(content, { size: 'md', centered: true });
    }

  openEditModal(content: any, role: Role) {
    this.submitted = false;
    this.selectedRole = role;
    this.roleForm.patchValue(role);
    this.modalRef = this.modalService.open(content, { size: 'md', centered: true });
  }

  saveRole() {
    this.submitted = true;
    if (this.roleForm.valid) {
      if (this.selectedRole) {
        this.roleService
            .updateRole(this.selectedRole.id!, this.roleForm.value)
            .subscribe(() => {
              this.loadRoles();
              this.modalRef.close();
              Swal.fire({
                icon: 'success',
                title: 'Modification réussie',
                text: 'Role modifiée avec succès !',
                confirmButtonColor: '#239eba',
              });
              this.selectedRole = null;
              this.roleForm.reset();
            });
      } else {
        this.roleService
            .createRole(this.roleForm.value)
            .subscribe(() => {
              this.loadRoles();
              this.modalRef.close();
              Swal.fire({
                icon: 'success',
                title: 'Ajout réussi',
                text: 'Role ajoutée avec succès !',
                confirmButtonColor: '#239eba',
              });
              this.roleForm.reset();
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

  deleteRole() {
    if (this.deleteId) {
      this.roleService.deleteRole(this.deleteId).subscribe({
        next: () => {
          this.loadRoles();
          this.modalService.dismissAll();
          Swal.fire({
            icon: 'success',
            title: 'Suppression réussie',
            text: 'Role supprimée avec succès !',
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
