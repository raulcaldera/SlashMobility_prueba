import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export interface DialogData {
  file: string;
}

@Component({
  selector: 'app-img-dialog',
  templateUrl: './img-dialog.component.html',
  styleUrls: ['./img-dialog.component.scss']
})
export class ImgDialogComponent implements OnInit {

  validFile: Boolean;
  errorMsg: String;
  fileName: String;
  params;

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: String;

  constructor(
    public dialogRef: MatDialogRef<ImgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private http: HttpClient,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.validFile=false;
    this.errorMsg="";
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  } 

  readFile(fileEvent: any) {
    const file = fileEvent.target.files[0];
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage').setValue(file);
    if (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png") {
      this.validFile=true;
      this.errorMsg="";
    } else {
      this.validFile=false;
      this.errorMsg="Image must be a jpg or a png file";
    }
  }

  submit() {
    if (!this.fileUploadForm.get('uploadedImage').value) {
      this.errorMsg="Please select a file";
      return false;
    }
    const formData = new FormData();
    formData.append('uploadedImage', this.fileUploadForm.get('uploadedImage').value);
    formData.append('agentId', '007');

    this.http.post<any>('http://localhost:3000/uploadfile', formData).subscribe(response => {
      this.fileName = response.uploadedFile.filename;
      if (response.statusCode === 200) {
        this.params.getResponse(this.fileName);
        // Reset the file input
        this.uploadFileInput.nativeElement.value = "";
        this.fileInputLabel = undefined;
      }
    }, er => {
      this.errorMsg=er.error.error;
    });
  }
}
