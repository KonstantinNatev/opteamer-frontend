import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TeamMemberService } from '../services/teamMember.service';
import { Observable } from 'rxjs';
import { OperationProviderService } from '../services/operationprovider.service';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrl: '../app.component.css'
})
export class TeamMemberComponent implements OnInit {
  teamMemberForm: FormGroup;
  editedTeamMember:any;
  modalTitle: string;
  teamMembers: Observable<any>;
  operationProviders: Observable<any>;
  
  constructor(private teamMemberService: TeamMemberService, private operationProviderService: OperationProviderService) {
  }

  ngOnInit() {
    this.teamMembers = this.teamMemberService.data;
    this.operationProviders = this.operationProviderService.data
    this.reloadTeamMember();
    this.reloadOperationProviders();
    this.teamMemberForm = new FormGroup<any>({
      'name': new FormControl(null, [Validators.required]),
      'operationProvider': new FormControl(null, [Validators.required]),
    });
  }

  reloadTeamMember() {
    this.teamMemberService.refreshData();
  }

  reloadOperationProviders() {
    this.operationProviderService.refreshData();
  }

  openModal(teamMember: any) {
    this.editedTeamMember = teamMember;

    let name = '';
    let operationProviderType;

    this.modalTitle = 'create';

    if (teamMember) {
      name = teamMember.name;
      operationProviderType = teamMember.operationProvider.type;

      this.modalTitle = 'edit';
    }
    this.teamMemberForm.patchValue({
      'name': name,
      'operationProvider': operationProviderType,
    })
  }

  onSubmit() {
    if (this.editedTeamMember) {
      this.teamMemberService.putTeamMember(this.editedTeamMember.id,
        {name: this.teamMemberForm.value.name, operationProvider: {type: this.teamMemberForm.value.operationProvider}}).subscribe({
        next: this.handlePutResponse.bind(this),
        error: this.handleError.bind(this)
      })
    } else {
      this.teamMemberService.postTeamMember({name: this.teamMemberForm.value.name, operationProvider: {type: this.teamMemberForm.value.operationProvider}}).subscribe({
        next: this.handlePostResponse.bind(this),
        error: this.handleError.bind(this)
      })
    }

    setTimeout(() => {
      this.reloadTeamMember();
    }, 500);
  }

  onDeleteTeamMember(id:string) {
    this.teamMemberService.deleteTeamMember(id).subscribe({
      next: this.handleDeleteResponse.bind(this),
      error: this.handleError.bind(this)
    })
    setTimeout(() => {
      this.reloadTeamMember();
    }, 500);
  }

  handlePostResponse(){}
  handlePutResponse(){}
  handleDeleteResponse(){}
  handleError(){}
}
