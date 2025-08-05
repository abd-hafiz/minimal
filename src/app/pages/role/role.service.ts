import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Role} from "./role.models";
import {ApiResponse} from "../../core/models/api-response.models";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    private apiUrl = 'http://localhost:3000/api/Role';
    constructor(private http: HttpClient) { }

    getRoles(): Observable<Role[]> {
        return this.http.get<ApiResponse<Role[]>>(`${this.apiUrl}`)
            .pipe(
                map(response => response.data) // Extraire les données de la réponse
            );
    }

    getRoleById(id: number): Observable<Role> {
        return this.http.get<ApiResponse<Role>>(`${this.apiUrl}/${id}`)
            .pipe(
                map(response => response.data)
            );
    }

    createRole(role: Role): Observable<Role> {
        return this.http.post<Role>(`${this.apiUrl}/create`, role)
            .pipe(
                map(response => response) // Retourner le rôle créé
            );
    }

    updateRole(id: number, role: Role): Observable<Role> {
        return this.http.put<Role>(`${this.apiUrl}/${id}`, role)
            .pipe(
                map(response => response) // Retourner le rôle mis à jour
            );
    }

    deleteRole(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

}