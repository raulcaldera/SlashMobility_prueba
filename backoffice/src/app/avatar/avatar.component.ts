import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImgDialogComponent } from '../img-dialog/img-dialog.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
  @Input() avatar: string;

  file: string;

  constructor(
    public imgDialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  sanitizeImageUrl(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl("http://localhost:3000/images/" + this.avatar);
  } 

  openImgDialog(): void {
    const dialogRef = this.imgDialog.open(ImgDialogComponent, {
      data: {file: this.file}
    });

    dialogRef.componentInstance.params = {
      getResponse:(filename)=>{
          this.avatar = filename;
      }
    }
  }

  ngOnInit(): void {
  }

}
