import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Services} from "./services.models";
import {ApiResponse} from "../../core/models/api-response.models";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class ServicesService {
    private apiUrl = 'http://localhost:3000/api/Services';

    constructor(private http: HttpClient) {}

    getAllServices(): Observable<Services[]> {
        return this.http.get<ApiResponse<Services[]>>(`${this.apiUrl}/get`)
            .pipe(
                map(response => response.data) // Extraire les données de la réponse
            );
    }

    getServiceById(id: number): Observable<Services> {
        return this.http.get<ApiResponse<Services>>(`${this.apiUrl}/${id}`)
            .pipe(
                map(response => response.data)
            );
    }

    updateService(id: number, service: Services): Observable<Services> {
        return this.http.put<Services>(`${this.apiUrl}/${id}`, service)
            .pipe(
                map(response => response) // Retourner le service mis à jour
            );
    }

    deleteService(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    createService(service: Services): Observable<Services> {
        return this.http.post<Services>(`${this.apiUrl}/create`, service)
            .pipe(
                map(response => response) // Retourner le service créé
            );
    }

}