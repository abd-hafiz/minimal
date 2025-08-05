import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Direction } from "./direction.models";
import {Observable} from "rxjs";
import {ApiResponse} from "../../core/models/api-response.models";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class DirectionService {
    private apiUrl = 'http://localhost:3000/api/Direction';
    constructor(private http: HttpClient) { }

    getDirections(): Observable<Direction[]> {
        return this.http.get<ApiResponse<Direction[]> >(this.apiUrl)
            .pipe(
                map(response => response.data) // Extraire les données de la réponse
            );

    }
    getDirectionById(id: number): Observable<Direction> {
        return this.http.get<ApiResponse<Direction>>(`${this.apiUrl}/${id}`)
            .pipe(
                map(response => response.data)
            );
    }

    updateDirection(id: number, direction: Direction): Observable<Direction> {
        return this.http.put<Direction>(`${this.apiUrl}/${id}`, direction)
            .pipe(
                map(response => response) // Retourner la direction mise à jour
            );
    }

    deleteDirection(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    createDirection(direction: Direction): Observable<Direction> {
        return this.http.post<Direction>(`${this.apiUrl}/create`, direction)
            .pipe(
                map(response => response) // Retourner la direction crée
            );
    }

}