import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  constructor(
    public dialogRef: MatDialogRef<ImgDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.validFile=false;
    this.errorMsg="";
  }

  onNoClick(): void {
    this.dialogRef.close();
  } 

  readFile(fileEvent: any) {
    const file = fileEvent.target.files[0];
    if (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png") {
      this.validFile=true;
    } else {
      this.validFile=false;
      this.errorMsg="Image must be a jpg or a png file";
    }
  }
}
