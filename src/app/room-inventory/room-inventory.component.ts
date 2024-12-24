import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { AssetService } from '../services/asset.sevice';
import { RoomInventoryService } from '../services/room-inventory.sevice';
import { OperationRoomService } from '../services/operationroom.service';

@Component({
  selector: 'app-room-inventory',
  templateUrl: './room-inventory.component.html',
  styleUrl: '../app.component.css'
})
export class RoomInventoryComponent implements OnInit {
  roomInventoryForm: FormGroup;
  editedRoomInventory:any;
  modalTitle: string;
  roomInventory: Observable<any>;
  assets: Observable<any>;
  operationRoom: Observable<any>;

  constructor(private roomInventoryService: RoomInventoryService,
              private assetService: AssetService,
              private operationRoomService: OperationRoomService) {
  }

  
  combined: Observable<[any[], any[]]>;
  
  ngOnInit() {
    this.roomInventory = this.roomInventoryService.data;
    this.assets = this.assetService.data;
    this.operationRoom = this.operationRoomService.data;

    this.reloadRoomInventories();
    this.reloadAssetService();
    this.reloadOperationRoom();
    

    this.roomInventoryForm = new FormGroup<any>({
      'operationRoom': new FormControl(null, [Validators.required]),
      'asset': new FormControl(null, [Validators.required]),
      'count': new FormControl(null, [Validators.required])
    });

    this.combined = combineLatest([this.assets, this.operationRoom]);
  }

  reloadRoomInventories() {
    this.roomInventoryService.refreshData();
  }

  reloadAssetService() {
    this.assetService.refreshData();
  }

  reloadOperationRoom() {
    this.operationRoomService.refreshData();
  }

  openModal(roomInventory: any) {
    this.editedRoomInventory = roomInventory;

    this.roomInventoryForm.controls['operationRoom'].enable();
    this.roomInventoryForm.controls['asset'].enable();

    let count = '';
    let assetId = '';
    let operationRoomId = '';


    this.modalTitle = 'create';

    if (roomInventory) {
      count = roomInventory.count;

      assetId = roomInventory.asset.id;
      operationRoomId = roomInventory.operationRoom.id;

      this.modalTitle = 'edit';

      //by edit existing object set the selects disabled
      this.roomInventoryForm.controls['operationRoom'].disable();
      this.roomInventoryForm.controls['asset'].disable();

    }

    this.roomInventoryForm.patchValue({
      'operationRoom': operationRoomId,
      'asset': assetId,
      'count': count
    })

  }

  onSubmit() {

    this.roomInventoryForm.controls['operationRoom'].enable();
    this.roomInventoryForm.controls['asset'].enable();

    let bodyObj = {
      assetId: this.roomInventoryForm.value.asset,
      operationRoomId: this.roomInventoryForm.value.operationRoom,
      count: this.roomInventoryForm.value.count};

    if (this.editedRoomInventory) {
      this.roomInventoryService.putRoomInventory(
        this.roomInventoryForm.value.asset,
        this.roomInventoryForm.value.operationRoom,
        bodyObj)
          .subscribe({
            next: this.handlePutResponse.bind(this),
            error: this.handleError.bind(this)
          })
    } else {
      this.roomInventoryService.postRoomInventory(bodyObj)
          .subscribe({
            next: this.handlePostResponse.bind(this),
            error: this.handleError.bind(this)
          })
    }

    setTimeout(() => {
      this.reloadRoomInventories();
    }, 500);
  }

  onDeleteRoomInventory(assetId:string, roomId:string) {
    this.roomInventoryService.deleteRoomInventory(assetId, roomId).subscribe({
      next: this.handleDeleteResponse.bind(this),
      error: this.handleError.bind(this)
    })
    setTimeout(() => {
      this.reloadRoomInventories();
    }, 500);
  }


  handlePostResponse(){}
  handlePutResponse(){}
  handleDeleteResponse(){}
  handleError(){}
}
