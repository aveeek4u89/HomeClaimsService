import { Component,OnInit,ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm, FormGroupDirective } from '@angular/forms' 
import { HomeClaimServiceService } from './service/home-claim-service.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import {MatSnackBar} from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import {ClaimdetailcomponentComponent} from 'src/app/claimdetailcomponent/claimdetailcomponent.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  submitMessage : string="";
  @ViewChild(FormGroupDirective) myForm;
  files: FileList; 
  filestring: string; 
  constructor(public formBuilder: FormBuilder,public homeclaimservice:HomeClaimServiceService, public dialog: MatDialog) {  } 
  ngOnInit() { 

    this.claimForm = this.formBuilder.group({
      claimTitle: ['',Validators.required],
      insured:['',Validators.required],
      claimType: ['',Validators.required],
      claimAmount: ['',Validators.required],
      claimReasons: ['',Validators.required],
      locationAddress: ['',Validators.required],
      lossDatePicker: ['',Validators.required],
      claimDatePicker: ['',Validators.required],
      producer:['',Validators.required],
      id:['',Validators.nullValidator],
      policyNumber:['',Validators.required],
      file:['',Validators.nullValidator]
    }); 
    
  }


 
  PostClaim(claimForm:NgForm){
    //console.log(claimForm);
    claimForm.value.file = this.filestring;
    this.homeclaimservice.addHomeClaim(claimForm.value).subscribe(data=>{
        console.log(data);
        // this.submitMessage="Claim has been registered with Claim ID "+data.id;
        this.displayClaimNumber("Claim ID ",data.id)
        this.myForm.resetForm();
        this.openDialog();
      });
    }

  
  title = 'HomeClaimSystem';
  claimForm: FormGroup; 


    claimReasons: ClaimReasons[] = [
          {value: 'Fire/ Lightenting', viewValue: 'Fire/ Lightenting'},
          {value: 'Extended coverage/ related', viewValue: 'Extended coverage/ related'},
          {value: 'Crime related loss', viewValue: 'Crime related loss'},
          {value: 'Water damage', viewValue: 'Water damage'},
          {value: 'Glass breakage', viewValue: 'Glass breakage'},
          {value: 'In transit', viewValue: 'In transit'}
        ];
      
     
     get  claimType(){return this.claimForm.get('claimType')}
     get  claimAmount(){return this.claimForm.get('claimAmount')}
     get  claimReason(){return this.claimForm.get('claimReasons')}
     get  locationAddress(){return this.claimForm.get('locationAddress')}
     get  lossDatePicker(){return this.claimForm.get('lossDatePicker')}
     get  claimDatePicker(){return this.claimForm.get('claimDatePicker')}
     get  claimTitle(){return this.claimForm.get('claimTitle')}
     get  insured(){return this.claimForm.get('insured')}
     get  producer(){return this.claimForm.get('producer')}
     get  policyNumber(){return this.claimForm.get('policyNumber')}
     get  id(){return this.claimForm.get('id')}  
     get  file(){return this.claimForm.get('file')}
     displayClaimNumber(message: string, action: string) {     
    }  
    
    fileEvent(event){
        this.files = event.target.files; 
        var reader = new FileReader(); 
        reader.onload = this._handleReaderLoaded.bind(this); 
        reader.readAsBinaryString(this.files[0]); 
      }
      
      _handleReaderLoaded(readerEvt) { 
        var binaryString = readerEvt.target.result; 
        this.filestring = btoa(binaryString);  // Converting binary string data. 
    }
    
    openDialog() {
      const dialogConfig = new MatDialogConfig();
      const dialogRef = this.dialog.open(ClaimdetailcomponentComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {       
      });
    }
}

export interface ClaimTypes {
    value: string;
    viewValue: string;
  } 


  export interface ClaimReasons {
      value: string;
      viewValue: string;
    }
    


