import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedMaterialModule } from 'src/app/shared-material/shared-material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule, SharedMaterialModule],
})
export class AdminModule {}
