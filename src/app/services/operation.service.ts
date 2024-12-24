import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OperationService {
    private readonly serverUrl: string = 'http://localhost:8080';
    private dataSubject = new BehaviorSubject<any[]>([]);
    data: Observable<any[]> = this.dataSubject.asObservable();
  
    constructor(private httpClient:HttpClient) {}
    loadAllOperations(): Observable<any> {
      return this.httpClient.get<any[]>('http://localhost:8080/api/operations')
        .pipe(
          map(response => {
            console.log("response", response);
            
            const sortedData = response.sort((a, b) => a.id - b.id);
            console.log("sortedData", sortedData);
            
            this.dataSubject.next(sortedData)
            return sortedData
          })
        )
    }
  
    refreshData() {
      const ss =  this.loadAllOperations().subscribe();
      console.log("ss", ss);
      
    }
  
    postOperation(body:any): Observable<any> {
      return this.httpClient.post<any>(`${this.serverUrl}/api/operations`, body);
    }
  
    putOperation(operationId:string, body:any): Observable<any> {
      return this.httpClient.put<any>(`${this.serverUrl}/api/operations/${operationId}`, body);
    }
  
    deleteOperation(operationId:string): Observable<any> {
      return this.httpClient.delete<any>(`${this.serverUrl}/api/operations/${operationId}`);
    }
}