import { Component, OnInit, Inject, Input, TemplateRef, OnDestroy, AfterViewInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'poke-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.less']
})
export class CustomDialogComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() modalBody: TemplateRef<any>;
  @Input() closeLink: string;


  dialogRef: any;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit() { }

  ngAfterViewInit() {
    // timeOut wrapepr
    setTimeout(() => {
      this.dialogRef = this.dialog.open(this.modalBody);
      this.dialogRef.afterClosed().subscribe( result => {
        this.router.navigate([this.closeLink ? this.closeLink : '/' ]);
      });
    });
  }

  ngOnDestroy() { }


}
