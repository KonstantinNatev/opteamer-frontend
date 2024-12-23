import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OperationTypeService {
    private readonly serverUrl: string = 'http://localhost:8080';
    private dataSubject = new BehaviorSubject<any[]>([]);
    data: Observable<any[]> = this.dataSubject.asObservable();
    
    constructor(private httpClient: HttpClient){}

    loadAllOperationTypes(): Observable<any> {
        return this.httpClient.get<any>(`${this.serverUrl}/api/operation-types`)
            .pipe(
                map((res) => {
                    const sortedData = res.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
                    this.dataSubject.next(sortedData)
                    return sortedData
                })
            )
    }

    refreshData() {
        this.loadAllOperationTypes().subscribe();
    }

    postOperationType(body:any): Observable<any> {
        return this.httpClient.post<any>(`${this.serverUrl}/api/operation-types`, body);
    }

    putOperationType(id:string, body:any): Observable<any> {
        return this.httpClient.put<any>(`${this.serverUrl}/api/operation-types/${id}`, body);
    }

    deleteOperationType(id:string): Observable<any> {
        return this.httpClient.delete<any>(`${this.serverUrl}/api/operation-types/${id}`);
    }

}