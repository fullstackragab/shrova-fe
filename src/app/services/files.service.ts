import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {}

  upload(file: any) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.API_URL + '/storage/upload', formData);
  }

  deleteFile(id: number) {
    return this.http.delete(environment.API_URL + '/storage/delete/' + id, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  uploadFiles(files: any) {
    console.log(files);
    const formData = new FormData();
    Array.from(files).forEach((file: any) => {
      formData.append('files[]', file);
    });
    return this.http.post(
      environment.API_URL + '/storage/upload-files',
      formData
    );
  }
}
